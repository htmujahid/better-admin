"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { createTask } from "../_lib/actions";
import type { CreateTaskSchema } from "../_lib/validations";
import { createTaskSchema } from "../_lib/validations";
import { TaskForm } from "./task-form";
import { useRouter } from "next/navigation";

export function CreateTaskForm() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
  });

  function onSubmit(input: CreateTaskSchema) {
    startTransition(async () => {
      const { error } = await createTask(input);

      if (error) {
        toast.error(error);
        return;
      }

      form.reset();
      toast.success("Task created");
      router.push(`/home/tasks`);
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
