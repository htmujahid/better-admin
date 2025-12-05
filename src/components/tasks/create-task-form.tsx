'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { client } from '@/orpc';
import { type CreateTaskInput, createTaskSchema } from '@/validators/tasks';

import { TaskForm } from './task-form';

export function CreateTaskForm() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
  });

  function onSubmit(input: CreateTaskInput) {
    startTransition(async () => {
      try {
        await client.todo.create(input);
        form.reset();
        toast.success('Task created');
        router.push(`/home/tasks`);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to create task',
        );
      }
    });
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
