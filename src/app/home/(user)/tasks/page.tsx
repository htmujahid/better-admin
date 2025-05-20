import * as React from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

import type { SearchParams } from "@/types";

import { Button } from "@/components/ui/button";
import { Page, PageTitleBar } from "@/components/page";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { getValidFilters } from "@/lib/data-table";

import { TasksTable } from "./_components/tasks-table";
import {
  getEstimatedHoursRange,
  getTaskPriorityCounts,
  getTaskStatusCounts,
  getTasks,
} from "./_lib/queries";
import { searchParamsCache } from "./_lib/validations";

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function IndexPage(props: IndexPageProps) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  const validFilters = getValidFilters(search.filters);

  const promises = Promise.all([
    getTasks({
      ...search,
      filters: validFilters,
    }),
    getTaskStatusCounts(),
    getTaskPriorityCounts(),
    getEstimatedHoursRange(),
  ]);

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
              "10rem",
              "30rem",
              "10rem",
              "10rem",
              "6rem",
              "6rem",
              "6rem",
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
