import { withAuthenticate } from '@/components/acccess/with-authenticate';
import { Page, PageTitleBar } from '@/components/page';
import { CreateTaskForm } from '@/components/tasks/create-task-form';

function CreateTaskPage() {
  return (
    <Page>
      <PageTitleBar title="Create Task" description="Create a new task" />
      <CreateTaskForm />
    </Page>
  );
}

export default withAuthenticate(CreateTaskPage);
