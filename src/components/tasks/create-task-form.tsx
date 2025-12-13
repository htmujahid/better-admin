'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { isDefinedError, onError, onSuccess } from '@orpc/client';
import { useServerAction } from '@orpc/react/hooks';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { createTask } from '@/orpc/actions/tasks/create-task';
import { type CreateTaskInput, createTaskSchema } from '@/validators/tasks';

import { TaskForm } from './task-form';
import { useRouter } from 'next/navigation';

export function CreateTaskForm() {
  const router = useRouter();
  const form = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
  });

  const { execute, status } = useServerAction(createTask, {
    interceptors: [
      onSuccess(() => {
        toast.success('Task created successfully');
        router.push("/home/tasks");
      }),
      onError((error) => {
        if (isDefinedError(error)) {
          toast.error(error || 'Failed to create task');
        }
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
