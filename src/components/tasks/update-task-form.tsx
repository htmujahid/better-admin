'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { onError, onSuccess } from '@orpc/client';
import { useServerAction } from '@orpc/react/hooks';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import type { Task } from '@/db/schema';
import { updateTask } from '@/orpc/actions/tasks/update-task';
import { type UpdateTaskInput, updateTaskSchema } from '@/validators/tasks';

import { TaskForm } from './task-form';

interface UpdateTaskFormProps {
  task: Task | null;
}

export function UpdateTaskForm({ task }: UpdateTaskFormProps) {
  const form = useForm<Omit<UpdateTaskInput, 'id'>>({
    resolver: zodResolver(updateTaskSchema.omit({ id: true })),
    defaultValues: {
      title: task?.title ?? '',
      label: task?.label,
      status: task?.status,
      priority: task?.priority,
      estimatedHours: task?.estimatedHours ?? 0,
    },
  });

  const { execute, status } = useServerAction(updateTask, {
    interceptors: [
      onSuccess(() => {
        toast.success('Task updated');
      }),
      onError((error) => {
        toast.error(error.message || 'Failed to update task');
      }),
    ],
  });

  const isPending = status === 'pending';

  function onSubmit(input: Omit<UpdateTaskInput, 'id'>) {
    if (!task) return;
    execute({ id: task.id, ...input });
  }

  return (
    <TaskForm<Omit<UpdateTaskInput, 'id'>> form={form} onSubmit={onSubmit}>
      <Button disabled={isPending} className="w-fit">
        {isPending && (
          <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
        )}
        Save
      </Button>
    </TaskForm>
  );
}
