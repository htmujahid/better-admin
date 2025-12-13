'use client';

import * as React from 'react';

import { SelectTrigger } from '@radix-ui/react-select';
import type { Table } from '@tanstack/react-table';
import { onError, onSuccess } from '@orpc/client';
import { useServerAction } from '@orpc/react/hooks';
import { ArrowUp, CheckCircle2, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from '@/components/data-table/data-table-action-bar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { type Task, tasks } from '@/db/schema';
import { exportTableToCSV } from '@/lib/data-table/export';
import { deleteManyTasks } from '@/orpc/actions/tasks/delete-many-task';
import { updateManyTasks } from '@/orpc/actions/tasks/update-many-task';

export const actions = [
  'update-status',
  'update-priority',
  'export',
  'delete',
] as const;

type Action = (typeof actions)[number];

interface TasksTableActionBarProps {
  table: Table<Task>;
}

export function TasksTableActionBar({ table }: TasksTableActionBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows;
  const [isExporting, startExportTransition] = React.useTransition();
  const [currentAction, setCurrentAction] = React.useState<Action | null>(null);

  const { execute: executeUpdateMany, status: updateManyStatus } = useServerAction(updateManyTasks, {
    interceptors: [
      onSuccess(() => {
        toast.success('Tasks updated');
      }),
      onError((error) => {
        toast.error(error.message || 'Failed to update tasks');
      }),
    ],
  });

  const { execute: executeDeleteMany, status: deleteManyStatus } = useServerAction(deleteManyTasks, {
    interceptors: [
      onSuccess(() => {
        toast.success('Tasks deleted');
        table.toggleAllRowsSelected(false);
      }),
      onError((error) => {
        toast.error(error.message || 'Failed to delete tasks');
      }),
    ],
  });

  const getIsActionPending = React.useCallback(
    (action: Action) => {
      if (action === 'update-status' || action === 'update-priority') {
        return updateManyStatus === 'pending' && currentAction === action;
      }
      if (action === 'delete') {
        return deleteManyStatus === 'pending';
      }
      if (action === 'export') {
        return isExporting && currentAction === action;
      }
      return false;
    },
    [updateManyStatus, deleteManyStatus, isExporting, currentAction],
  );

  const onTaskUpdate = React.useCallback(
    ({
      field,
      value,
    }: {
      field: 'status' | 'priority';
      value: Task['status'] | Task['priority'];
    }) => {
      setCurrentAction(
        field === 'status' ? 'update-status' : 'update-priority',
      );
      executeUpdateMany({
        ids: rows.map((row) => row.original.id),
        [field]: value,
      });
    },
    [rows, executeUpdateMany],
  );

  const onTaskExport = React.useCallback(() => {
    setCurrentAction('export');
    startExportTransition(() => {
      exportTableToCSV(table, {
        excludeColumns: ['select', 'actions'],
        onlySelected: true,
      });
    });
  }, [table]);

  const onTaskDelete = React.useCallback(() => {
    setCurrentAction('delete');
    executeDeleteMany({
      ids: rows.map((row) => row.original.id),
    });
  }, [rows, executeDeleteMany]);

  return (
    <DataTableActionBar table={table} visible={rows.length > 0}>
      <DataTableActionBarSelection table={table} />
      <Separator
        orientation="vertical"
        className="hidden data-[orientation=vertical]:h-5 sm:block"
      />
      <div className="flex items-center gap-1.5">
        <Select
          onValueChange={(value: Task['status']) =>
            onTaskUpdate({ field: 'status', value })
          }
        >
          <SelectTrigger asChild>
            <DataTableActionBarAction
              size="icon"
              tooltip="Update status"
              isPending={getIsActionPending('update-status')}
            >
              <CheckCircle2 />
            </DataTableActionBarAction>
          </SelectTrigger>
          <SelectContent align="center">
            <SelectGroup>
              {tasks.status.enumValues.map((status) => (
                <SelectItem key={status} value={status} className="capitalize">
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: Task['priority']) =>
            onTaskUpdate({ field: 'priority', value })
          }
        >
          <SelectTrigger asChild>
            <DataTableActionBarAction
              size="icon"
              tooltip="Update priority"
              isPending={getIsActionPending('update-priority')}
            >
              <ArrowUp />
            </DataTableActionBarAction>
          </SelectTrigger>
          <SelectContent align="center">
            <SelectGroup>
              {tasks.priority.enumValues.map((priority) => (
                <SelectItem
                  key={priority}
                  value={priority}
                  className="capitalize"
                >
                  {priority}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DataTableActionBarAction
          size="icon"
          tooltip="Export tasks"
          isPending={getIsActionPending('export')}
          onClick={onTaskExport}
        >
          <Download />
        </DataTableActionBarAction>
        <DataTableActionBarAction
          size="icon"
          tooltip="Delete tasks"
          isPending={getIsActionPending('delete')}
          onClick={onTaskDelete}
        >
          <Trash2 />
        </DataTableActionBarAction>
      </div>
    </DataTableActionBar>
  );
}
