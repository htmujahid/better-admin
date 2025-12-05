'use client';

import * as React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableSortList } from '@/components/data-table/data-table-sort-list';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import type { Task } from '@/db/schema';
import { useDataTable } from '@/hooks/use-data-table';
import { orpc } from '@/orpc';
import type { DataTableRowAction } from '@/types/data-table';
import type { GetTasksSchema } from '@/validators/tasks';

import { DeleteTasksDialog } from './delete-tasks-dialog';
import { TasksTableActionBar } from './tasks-table-action-bar';
import { getTasksTableColumns } from './tasks-table-columns';
import { TasksTableToolbarActions } from './tasks-table-toolbar-actions';

interface TasksTableProps {
  search: GetTasksSchema & { filters: GetTasksSchema['filters'] };
}

export function TasksTable({ search }: TasksTableProps) {
  const { data: listData } = useSuspenseQuery(
    orpc.todo.list.queryOptions({ input: search }),
  );
  const { data: statusCounts } = useSuspenseQuery(
    orpc.todo.statusCounts.queryOptions({}),
  );
  const { data: priorityCounts } = useSuspenseQuery(
    orpc.todo.priorityCounts.queryOptions({}),
  );
  const { data: estimatedHoursRange } = useSuspenseQuery(
    orpc.todo.estimatedHoursRange.queryOptions({}),
  );

  const { data, pageCount } = listData;

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<Task> | null>(null);

  const columns = React.useMemo(
    () =>
      getTasksTableColumns({
        statusCounts,
        priorityCounts,
        estimatedHoursRange,
        setRowAction,
      }),
    [statusCounts, priorityCounts, estimatedHoursRange],
  );

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    enableAdvancedFilter: false,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTable
        table={table}
        actionBar={<TasksTableActionBar table={table} />}
      >
        <DataTableToolbar table={table}>
          <TasksTableToolbarActions table={table} />
          <DataTableSortList table={table} align="end" />
        </DataTableToolbar>
      </DataTable>
      <DeleteTasksDialog
        open={rowAction?.variant === 'delete'}
        onOpenChange={() => setRowAction(null)}
        tasks={rowAction?.row.original ? [rowAction?.row.original] : []}
        showTrigger={false}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </>
  );
}
