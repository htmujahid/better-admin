"use server";

import { revalidatePath } from "next/cache";
import { onSuccess } from "@orpc/server";
import { actionContext } from "@/orpc/middlewares";
import { tasksRouter } from "@/orpc/routers/tasks";

export const updateTask = tasksRouter.update.actionable({
  context: actionContext,
  interceptors: [
    onSuccess(async () => {
      revalidatePath("/home/tasks");
    })
  ]
})