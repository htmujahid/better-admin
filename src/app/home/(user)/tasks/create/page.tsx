import { Page, PageTitleBar } from "@/components/page";
import { CreateTaskForm } from "../_components/create-task-form";

export default function CreateTaskPage() {
  return (
    <Page>
      <PageTitleBar title="Create Task" description="Create a new task" />
      <CreateTaskForm />
    </Page>
  );
}
