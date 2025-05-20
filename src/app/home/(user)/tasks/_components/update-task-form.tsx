"use client";

import type { Task } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { updateTask } from "../_lib/actions";
import { type UpdateTaskSchema, updateTaskSchema } from "../_lib/validations";
import { TaskForm } from "./task-form";

interface UpdateTaskFormProps {
  task: Task | null;
}

export function UpdateTaskForm({ task }: UpdateTaskFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task?.title ?? "",
      label: task?.label,
      status: task?.status,
      priority: task?.priority,
    },
  });

  function onSubmit(input: UpdateTaskSchema) {
    startTransition(async () => {
      if (!task) return;

      const { error } = await updateTask({
        id: task.id,
        ...input,
      });

      if (error) {
        toast.error(error);
        return;
      }

      form.reset(input);
      toast.success("Task updated");
    });
  }

  return (
    <TaskForm<UpdateTaskSchema> form={form} onSubmit={onSubmit}>
      <Button disabled={isPending} className="w-fit">
        {isPending && (
          <Loader
            className="mr-2 size-4 animate-spin"
            aria-hidden="true"
          />
        )}
        Save
      </Button>
    </TaskForm>
  );
}
