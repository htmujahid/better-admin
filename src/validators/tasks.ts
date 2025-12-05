import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server';
import { z } from 'zod';

import { flagConfig } from '@/config/flag.config';
import { type Task, tasks } from '@/db/schema';
import {
  getFiltersStateParser,
  getSortingStateParser,
} from '@/lib/data-table/parsers';

// Task enum values
export const taskStatusEnum = z.enum([
  'todo',
  'in-progress',
  'done',
  'canceled',
]);
export const taskLabelEnum = z.enum([
  'bug',
  'feature',
  'enhancement',
  'documentation',
]);
export const taskPriorityEnum = z.enum(['low', 'medium', 'high']);
export const taskSortableColumns = z.enum([
  'id',
  'code',
  'title',
  'status',
  'label',
  'priority',
  'estimatedHours',
  'archived',
  'createdAt',
  'updatedAt',
]);

// Get tasks schema (list with pagination, filtering, sorting)
export const getTasksSchema = z.object({
  page: z.number().int().min(1).default(1),
  perPage: z.number().int().min(1).max(100).default(10),
  title: z.string().optional(),
  status: z.array(taskStatusEnum).default([]),
  priority: z.array(taskPriorityEnum).default([]),
  estimatedHours: z.array(z.number()).default([]),
  createdAt: z.array(z.number()).default([]),
  sort: z
    .array(
      z.object({
        id: taskSortableColumns,
        desc: z.boolean(),
      }),
    )
    .default([{ id: 'createdAt', desc: true }]),
  filterFlag: z
    .enum(['advancedFilters', 'commandFilters'])
    .optional()
    .nullable(),
  filters: z.array(z.any()).default([]),
  joinOperator: z.enum(['and', 'or']).default('and'),
});

// Get single task schema
export const getTaskSchema = z.object({
  id: z.string(),
});

// Create task schema
export const createTaskSchema = z.object({
  title: z.string(),
  label: taskLabelEnum,
  status: taskStatusEnum,
  priority: taskPriorityEnum,
  estimatedHours: z.number().optional(),
});

// Update single task schema
export const updateTaskSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  label: taskLabelEnum.optional(),
  status: taskStatusEnum.optional(),
  priority: taskPriorityEnum.optional(),
  estimatedHours: z.number().optional(),
});

// Update multiple tasks schema
export const updateTasksSchema = z.object({
  ids: z.array(z.string()),
  label: taskLabelEnum.optional(),
  status: taskStatusEnum.optional(),
  priority: taskPriorityEnum.optional(),
});

// Delete single task schema
export const deleteTaskSchema = z.object({
  id: z.string(),
});

// Delete multiple tasks schema
export const deleteTasksSchema = z.object({
  ids: z.array(z.string()),
});

// Type exports
export type TaskStatus = z.infer<typeof taskStatusEnum>;
export type TaskLabel = z.infer<typeof taskLabelEnum>;
export type TaskPriority = z.infer<typeof taskPriorityEnum>;
export type GetTasksInput = z.infer<typeof getTasksSchema>;
export type GetTaskInput = z.infer<typeof getTaskSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type UpdateTasksInput = z.infer<typeof updateTasksSchema>;
export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>;
export type DeleteTasksInput = z.infer<typeof deleteTasksSchema>;

export const searchParamsCache = createSearchParamsCache({
  filterFlag: parseAsStringEnum(
    flagConfig.featureFlags.map((flag) => flag.value),
  ),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Task>().withDefault([
    { id: 'createdAt', desc: true },
  ]),
  title: parseAsString.withDefault(''),
  status: parseAsArrayOf(
    parseAsStringEnum(tasks.status.enumValues),
  ).withDefault([]),
  priority: parseAsArrayOf(
    parseAsStringEnum(tasks.priority.enumValues),
  ).withDefault([]),
  estimatedHours: parseAsArrayOf(parseAsFloat).withDefault([]),
  createdAt: parseAsArrayOf(parseAsFloat).withDefault([]),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(['and', 'or']).withDefault('and'),
});

export type GetTasksSchema = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
