import { unstable_noStore } from 'next/cache';

import {
  and,
  asc,
  count,
  desc,
  eq,
  gt,
  gte,
  ilike,
  inArray,
  lte,
  not,
  sql,
} from 'drizzle-orm';
import { customAlphabet } from 'nanoid';

import { db } from '@/db';
import { tasks } from '@/db/schema';
import { takeFirstOrThrow } from '@/db/utils';
import { filterColumns } from '@/lib/filter-columns';
import { o } from '@/orpc/context';
import { authMiddleware } from '@/orpc/middlewares';
import {
  createTaskSchema,
  deleteTaskSchema,
  deleteTasksSchema,
  getTaskSchema,
  getTasksSchema,
  updateTaskSchema,
  updateTasksSchema,
} from '@/validators/tasks';

// Helper to generate random task for demo purposes
function generateRandomTask() {
  const statuses = ['todo', 'in-progress', 'done', 'canceled'] as const;
  const labels = ['bug', 'feature', 'enhancement', 'documentation'] as const;
  const priorities = ['low', 'medium', 'high'] as const;

  return {
    code: `TASK-${customAlphabet('0123456789', 4)()}`,
    title: `Task ${customAlphabet('abcdefghijklmnopqrstuvwxyz', 8)()}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    label: labels[Math.floor(Math.random() * labels.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    estimatedHours: Math.floor(Math.random() * 40),
  };
}

export const todoRouter = {
  // Get single task
  get: o
    .route({
      method: 'GET',
      path: '/tasks/{id}',
      summary: 'Get Task',
      description: 'Retrieve a single task by ID',
      tags: ['Tasks'],
    })
    .use(authMiddleware({ permissions: { task: ['read'] } }))
    .input(getTaskSchema)
    .handler(async ({ input }) => {
      const task = await db.select().from(tasks).where(eq(tasks.id, input.id));
      return task[0] ?? null;
    }),

  // List tasks with pagination, filtering, and sorting
  list: o
    .route({
      method: 'GET',
      path: '/tasks',
      summary: 'List Tasks',
      description:
        'Retrieve a paginated list of tasks with optional filtering and sorting',
      tags: ['Tasks'],
    })
    .use(authMiddleware({ permissions: { task: ['read'] } }))
    .input(getTasksSchema)
    .handler(async ({ input }) => {
      const offset = (input.page - 1) * input.perPage;
      const advancedTable =
        input.filterFlag === 'advancedFilters' ||
        input.filterFlag === 'commandFilters';

      const advancedWhere = filterColumns({
        table: tasks,
        filters: input.filters,
        joinOperator: input.joinOperator,
      });

      const where = advancedTable
        ? advancedWhere
        : and(
            input.title ? ilike(tasks.title, `%${input.title}%`) : undefined,
            input.status.length > 0
              ? inArray(tasks.status, input.status)
              : undefined,
            input.priority.length > 0
              ? inArray(tasks.priority, input.priority)
              : undefined,
            input.estimatedHours.length > 0
              ? and(
                  input.estimatedHours[0]
                    ? gte(tasks.estimatedHours, input.estimatedHours[0])
                    : undefined,
                  input.estimatedHours[1]
                    ? lte(tasks.estimatedHours, input.estimatedHours[1])
                    : undefined,
                )
              : undefined,
            input.createdAt.length > 0
              ? and(
                  input.createdAt[0]
                    ? gte(
                        tasks.createdAt,
                        (() => {
                          const date = new Date(input.createdAt[0]);
                          date.setHours(0, 0, 0, 0);
                          return date;
                        })(),
                      )
                    : undefined,
                  input.createdAt[1]
                    ? lte(
                        tasks.createdAt,
                        (() => {
                          const date = new Date(input.createdAt[1]);
                          date.setHours(23, 59, 59, 999);
                          return date;
                        })(),
                      )
                    : undefined,
                )
              : undefined,
          );

      const orderBy =
        input.sort.length > 0
          ? input.sort.map((item) =>
              item.desc ? desc(tasks[item.id]) : asc(tasks[item.id]),
            )
          : [asc(tasks.createdAt)];

      const { data, total } = await db.transaction(async (tx) => {
        const data = await tx
          .select()
          .from(tasks)
          .limit(input.perPage)
          .offset(offset)
          .where(where)
          .orderBy(...orderBy);

        const total = await tx
          .select({
            count: count(),
          })
          .from(tasks)
          .where(where)
          .execute()
          .then((res) => res[0]?.count ?? 0);

        return { data, total };
      });

      const pageCount = Math.ceil(total / input.perPage);
      return { data, pageCount, total };
    }),

  // Get task status counts
  statusCounts: o
    .route({
      method: 'GET',
      path: '/tasks/status-counts',
      summary: 'Get Status Counts',
      description: 'Retrieve the count of tasks grouped by status',
      tags: ['Tasks'],
    })
    .use(authMiddleware({ permissions: { task: ['read'] } }))
    .handler(
      async (): Promise<{
        todo: number;
        'in-progress': number;
        done: number;
        canceled: number;
      }> => {
        return await db
          .select({
            status: tasks.status,
            count: count(),
          })
          .from(tasks)
          .groupBy(tasks.status)
          .having(gt(count(tasks.status), 0))
          .then((res) =>
            res.reduce(
              (acc, { status, count }) => {
                acc[status] = count;
                return acc;
              },
              {
                todo: 0,
                'in-progress': 0,
                done: 0,
                canceled: 0,
              },
            ),
          );
      },
    ),

  // Get task priority counts
  priorityCounts: o
    .route({
      method: 'GET',
      path: '/tasks/priority-counts',
      summary: 'Get Priority Counts',
      description: 'Retrieve the count of tasks grouped by priority',
      tags: ['Tasks'],
    })
    .use(authMiddleware({ permissions: { task: ['read'] } }))
    .handler(
      async (): Promise<{ low: number; medium: number; high: number }> => {
        return await db
          .select({
            priority: tasks.priority,
            count: count(),
          })
          .from(tasks)
          .groupBy(tasks.priority)
          .having(gt(count(), 0))
          .then((res) =>
            res.reduce(
              (acc, { priority, count }) => {
                acc[priority] = count;
                return acc;
              },
              {
                low: 0,
                medium: 0,
                high: 0,
              },
            ),
          );
      },
    ),

  // Get estimated hours range
  estimatedHoursRange: o
    .route({
      method: 'GET',
      path: '/tasks/estimated-hours-range',
      summary: 'Get Estimated Hours Range',
      description: 'Retrieve the min and max estimated hours across all tasks',
      tags: ['Tasks'],
    })
    .use(authMiddleware({ permissions: { task: ['read'] } }))
    .handler(async () => {
      return await db
        .select({
          min: sql<number>`min(${tasks.estimatedHours})`,
          max: sql<number>`max(${tasks.estimatedHours})`,
        })
        .from(tasks)
        .then((res) => res[0] ?? { min: 0, max: 0 });
    }),

  // Create task
  create: o
    .route({
      method: 'POST',
      path: '/tasks',
      summary: 'Create Task',
      description: 'Create a new task',
      tags: ['Tasks'],
    })
    .use(authMiddleware({ permissions: { task: ['create'] } }))
    .input(createTaskSchema)
    .handler(async ({ input }) => {
      unstable_noStore();

      await db.transaction(async (tx) => {
        const newTask = await tx
          .insert(tasks)
          .values({
            code: `TASK-${customAlphabet('0123456789', 4)()}`,
            title: input.title,
            status: input.status,
            label: input.label,
            priority: input.priority,
            estimatedHours: input.estimatedHours ?? 0,
          })
          .returning({
            id: tasks.id,
          })
          .then(takeFirstOrThrow);

        // Delete a task to keep the total number of tasks constant (demo behavior)
        await tx.delete(tasks).where(
          eq(
            tasks.id,
            (
              await tx
                .select({
                  id: tasks.id,
                })
                .from(tasks)
                .limit(1)
                .where(not(eq(tasks.id, newTask.id)))
                .orderBy(asc(tasks.createdAt))
                .then(takeFirstOrThrow)
            ).id,
          ),
        );
      });

      return { success: true };
    }),

  // Update single task
  update: o
    .route({
      method: 'PUT',
      path: '/tasks/{id}',
      summary: 'Update Task',
      description: 'Update an existing task by ID',
      tags: ['Tasks'],
    })
    .use(authMiddleware({ permissions: { task: ['update'] } }))
    .input(updateTaskSchema)
    .handler(async ({ input }) => {
      unstable_noStore();

      await db
        .update(tasks)
        .set({
          title: input.title,
          label: input.label,
          status: input.status,
          priority: input.priority,
          estimatedHours: input.estimatedHours,
        })
        .where(eq(tasks.id, input.id));

      return { success: true };
    }),

  // Update multiple tasks
  updateMany: o
    .route({
      method: 'PATCH',
      path: '/tasks/batch',
      summary: 'Batch Update Tasks',
      description: 'Update multiple tasks at once',
      tags: ['Tasks'],
    })
    .use(authMiddleware({ permissions: { task: ['update'] } }))
    .input(updateTasksSchema)
    .handler(async ({ input }) => {
      unstable_noStore();

      await db
        .update(tasks)
        .set({
          label: input.label,
          status: input.status,
          priority: input.priority,
        })
        .where(inArray(tasks.id, input.ids));

      return { success: true };
    }),

  // Delete single task
  delete: o
    .route({
      method: 'DELETE',
      path: '/tasks/{id}',
      summary: 'Delete Task',
      description: 'Delete a task by ID',
      tags: ['Tasks'],
    })
    .use(authMiddleware({ permissions: { task: ['delete'] } }))
    .input(deleteTaskSchema)
    .handler(async ({ input }) => {
      unstable_noStore();

      await db.transaction(async (tx) => {
        await tx.delete(tasks).where(eq(tasks.id, input.id));
        // Create a new task for the deleted one (demo behavior)
        await tx.insert(tasks).values(generateRandomTask());
      });

      return { success: true };
    }),

  // Delete multiple tasks
  deleteMany: o
    .route({
      method: 'DELETE',
      path: '/tasks/batch',
      summary: 'Batch Delete Tasks',
      description: 'Delete multiple tasks at once',
      tags: ['Tasks'],
    })
    .use(authMiddleware({ permissions: { task: ['delete'] } }))
    .input(deleteTasksSchema)
    .handler(async ({ input }) => {
      unstable_noStore();

      await db.transaction(async (tx) => {
        await tx.delete(tasks).where(inArray(tasks.id, input.ids));
        // Create new tasks for the deleted ones (demo behavior)
        await tx
          .insert(tasks)
          .values(input.ids.map(() => generateRandomTask()));
      });

      return { success: true };
    }),
};
