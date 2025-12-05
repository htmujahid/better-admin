'use client';

import * as React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import type { Task } from '@/db/schema';
import { client } from '@/orpc';
import { type UpdateTaskInput, updateTaskSchema } from '@/validators/tasks';

import { TaskForm } from './task-form';

interface UpdateTaskFormProps {
  task: Task | null;
}

export function UpdateTaskForm({ task }: UpdateTaskFormProps) {
  const [isPending, startTransition] = React.useTransition();

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

  function onSubmit(input: Omit<UpdateTaskInput, 'id'>) {
    startTransition(async () => {
      if (!task) return;

      try {
        await client.todo.update({
          id: task.id,
          ...input,
        });
        form.reset(input);
        toast.success('Task updated');
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to update task',
        );
      }
    });
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
