import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CalendarIcon, ClockIcon, PencilIcon } from 'lucide-react';

import { Page, PageTitleBar } from '@/components/page';
import { DeleteTasksDialog } from '@/components/tasks/delete-tasks-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Card, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { client } from '@/orpc';

export default async function ShowTaskPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;

  const data = await client.todo.get({ id: taskId });

  if (!data) {
    notFound();
  }

  return (
    <Page>
      <PageTitleBar title={data.code} description={'Task Details'}>
        <Link
          href={`/home/tasks/${data.id}/update`}
          className="flex items-center gap-2"
        >
          <Button>
            <PencilIcon className="size-4" />
            Edit
          </Button>
        </Link>
        <DeleteTasksDialog tasks={[data]}>
          <Button variant="destructive">Delete</Button>
        </DeleteTasksDialog>
      </PageTitleBar>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge variant="outline">{data.label}</Badge>
              <Badge variant="secondary">{data.status}</Badge>
              <Badge
                variant={data.priority === 'high' ? 'destructive' : 'default'}
              >
                {data.priority}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p
              className={cn(
                'text-muted-foreground text-sm',
                data.archived && 'line-through',
              )}
            >
              {data.title}
            </p>
            <Separator />
            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <ClockIcon className="size-4" />
                <span>{data.estimatedHours}h</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="size-4" />
                <span>{data.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Page>
  );
}
