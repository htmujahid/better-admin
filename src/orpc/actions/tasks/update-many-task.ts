"use server";

import { revalidatePath } from "next/cache";
import { onSuccess } from "@orpc/server";
import { actionContext } from "@/orpc/middlewares";
import { tasksRouter } from "@/orpc/routers/tasks";

export const updateManyTasks = tasksRouter.updateMany.actionable({
  context: actionContext,
  interceptors: [
    onSuccess(async () => {
      revalidatePath("/home/tasks");
    })
  ]
})