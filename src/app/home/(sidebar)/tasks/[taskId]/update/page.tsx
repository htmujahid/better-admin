import Link from 'next/link';
import { notFound } from 'next/navigation';

import { withAuthenticate } from '@/components/acccess/with-authenticate';
import { Page, PageTitleBar } from '@/components/page';
import { DeleteTasksDialog } from '@/components/tasks/delete-tasks-dialog';
import { UpdateTaskForm } from '@/components/tasks/update-task-form';
import { Button } from '@/components/ui/button';
import { client } from '@/orpc';

async function UpdateTaskPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;

  const data = await client.tasks.get({ id: taskId });

  if (!data) {
    notFound();
  }

  return (
    <Page>
      <PageTitleBar title={data.code} description={'Task Details'}>
        <Link href="/home/tasks">
          <Button variant="outline">Back</Button>
        </Link>
        <DeleteTasksDialog tasks={[data]}>
          <Button variant="destructive">Delete</Button>
        </DeleteTasksDialog>
      </PageTitleBar>
      <UpdateTaskForm task={data} />
    </Page>
  );
}

export default withAuthenticate(UpdateTaskPage);
