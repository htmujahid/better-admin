import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Page, PageTitleBar } from "@/components/page";

import { UpdateTaskForm } from "../../_components/update-task-form";
import { DeleteTasksDialog } from "../../_components/delete-tasks-dialog";
import { getTask } from "../../_lib/queries";
import { notFound } from "next/navigation";

export default async function UpdateTaskPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;

  const response = await getTask({id: taskId});
  const data = response?.data?.data;
  const error = response?.data?.error ?? response?.serverError;

  if (error || !data) {
    notFound();
  }
  
  return (
    <Page>
      <PageTitleBar title={data.code} description={'Task Details'}>
        <Link href="/home/tasks">
          <Button variant="outline">Back</Button>
        </Link>
        <DeleteTasksDialog
          tasks={[data]}
        >
          <Button variant="destructive">Delete</Button>
        </DeleteTasksDialog>
      </PageTitleBar>
      <UpdateTaskForm task={data} />
    </Page>
  )
}