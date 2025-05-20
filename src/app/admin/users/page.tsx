import { z } from "zod";
import { User } from "@/components/auth-provider";
import { UsersList } from "../_components/users-list";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const searchSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  perPage: z.coerce.number().min(1).default(10),
  name: z.string().optional(),
  role: z.string().optional(),
  sort: z.string()
    .transform((val) => {
      try {
        return JSON.parse(val);
      } catch {
        return [{ id: 'createdAt', desc: true }];
      }
    })
    .pipe(z.array(z.object({ id: z.string(), desc: z.boolean() })))
    .default('[]'),
})

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    perPage: string;
    name: string;
    role: string;
    sort: string;
  }>
}) {
  const search = await searchParams;
  const { page, perPage, name, role, sort } = searchSchema.parse(search)

  const data = await auth.api.listUsers({
    query: {
      limit: perPage,
      offset: (page - 1) * perPage,
      sortBy: sort[0]?.id,
      sortDirection: sort[0]?.desc ? 'desc' : 'asc',
      searchField: 'name',
      searchOperator: 'contains',
      searchValue: name,
      filterField: 'role',
      filterOperator: 'eq',
      filterValue: role,
    },
    headers: await headers(),
  })

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6 flex-1">
      <UsersList
        data={data.users as Array<User>}
        pageCount={Math.ceil(data.total / perPage)}
      />
    </div>
  )
}