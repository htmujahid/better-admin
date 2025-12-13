'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { onError } from '@orpc/client';
import { useServerAction } from '@orpc/react/hooks';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { createTask } from '@/orpc/actions/tasks/create-task';
import { type CreateTaskInput, createTaskSchema } from '@/validators/tasks';

import { TaskForm } from './task-form';

export function CreateTaskForm() {
  const form = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
  });

  const { execute, status } = useServerAction(createTask, {
    interceptors: [
      onError((error) => {
        toast.error(error.message || 'Failed to create task');
      }),
    ],
  });

  const isPending = status === 'pending';

  function onSubmit(input: CreateTaskInput) {
    execute(input);
  }

  return (
    <TaskForm form={form} onSubmit={onSubmit}>
      <Button disabled={isPending} className="w-fit">
        {isPending && <Loader className="animate-spin" />}
        Create
      </Button>
    </TaskForm>
  );
}
