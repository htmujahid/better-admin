'use client';

import * as React from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableSortList } from '@/components/data-table/data-table-sort-list';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import type { Task } from '@/db/schema';
import { useDataTable } from '@/hooks/use-data-table';
import type { DataTableRowAction } from '@/types/data-table';

import { client } from '@/orpc';

import { DeleteTasksDialog } from './delete-tasks-dialog';
import { TasksTableActionBar } from './tasks-table-action-bar';
import { getTasksTableColumns } from './tasks-table-columns';
import { TasksTableToolbarActions } from './tasks-table-toolbar-actions';

interface TasksTableProps {
  promises: Promise<
    [
      Awaited<ReturnType<typeof client.tasks.list>>,
      Awaited<ReturnType<typeof client.tasks.statusCounts>>,
      Awaited<ReturnType<typeof client.tasks.priorityCounts>>,
      Awaited<ReturnType<typeof client.tasks.estimatedHoursRange>>,
    ]
  >;
}
export function TasksTable({ promises }: TasksTableProps) {
  const [
    { data, pageCount },
    statusCounts,
    priorityCounts,
    estimatedHoursRange,
  ] = React.use(promises);

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
        onDeleteSuccess={() => rowAction?.row.toggleSelected(false)}
        redirectOnSuccess={false}
      />
    </>
  );
}
