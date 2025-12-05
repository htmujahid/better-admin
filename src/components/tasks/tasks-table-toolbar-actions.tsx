'use client';

import Link from 'next/link';

import type { Table } from '@tanstack/react-table';
import { Download, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Task } from '@/db/schema';
import { exportTableToCSV } from '@/lib/data-table/export';

import { DeleteTasksDialog } from './delete-tasks-dialog';

interface TasksTableToolbarActionsProps {
  table: Table<Task>;
}

export function TasksTableToolbarActions({
  table,
}: TasksTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasksDialog
          tasks={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
        />
      ) : null}
      <Link href={'/home/tasks'}>
        <Button variant="outline" size="sm">
          <Plus />
          New task
        </Button>
      </Link>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: 'tasks',
            excludeColumns: ['select', 'actions'],
          })
        }
      >
        <Download />
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
