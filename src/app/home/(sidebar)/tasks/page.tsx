import * as React from 'react';

import Link from 'next/link';

import { PlusIcon } from 'lucide-react';

import { withAuthenticate } from '@/components/acccess/with-authenticate';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { Page, PageTitleBar } from '@/components/page';
import { TasksTable } from '@/components/tasks/tasks-table';
import { Button } from '@/components/ui/button';
import { getValidFilters } from '@/lib/data-table/data-table';
import { client } from '@/orpc';
import type { SearchParams } from '@/types';
import { searchParamsCache } from '@/validators/tasks';

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

async function IndexPage(props: IndexPageProps) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  const validFilters = getValidFilters(search.filters);

  const promises = Promise.all([
    client.tasks.list({
      ...search,
      filters: validFilters,
    }),
    client.tasks.statusCounts(),
    client.tasks.priorityCounts(),
    client.tasks.estimatedHoursRange()
  ])

  return (
    <Page>
      <PageTitleBar title="Tasks" description="Manage your tasks">
        <Link href="/home/tasks/create">
          <Button>
            <PlusIcon />
            New Task
          </Button>
        </Link>
      </PageTitleBar>
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={7}
            filterCount={2}
            cellWidths={[
              '10rem',
              '30rem',
              '10rem',
              '10rem',
              '6rem',
              '6rem',
              '6rem',
            ]}
            shrinkZero
          />
        }
      >
        <TasksTable promises={promises} />
      </React.Suspense>
    </Page>
  );
}

export default withAuthenticate(IndexPage);
