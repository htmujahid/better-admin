import { useRouter } from 'next/navigation';

import type { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth/auth-client';
import { rolesData } from '@/lib/auth/roles';

type User = (typeof authClient.$Infer.Session)['user'];

export function UserListActions({ row }: { row: Row<User> }) {
  const router = useRouter();
  const isBanned = row.original.banned;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={async () => {
            const { error } = await authClient.admin.impersonateUser({
              userId: row.original.id,
            });

            if (error) {
              toast.error(error.message);
            } else {
              router.refresh();
              toast.success('Impersonated successfully');
            }
          }}
        >
          Impersonate
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            if (isBanned) {
              const { error } = await authClient.admin.unbanUser({
                userId: row.original.id,
              });

              if (error) {
                toast.error(error.message);
              } else {
                toast.success('User unbanned successfully');
                router.refresh();
              }
            } else {
              const { error } = await authClient.admin.banUser({
                userId: row.original.id,
              });

              if (error) {
                toast.error(error.message);
              } else {
                toast.success('User banned successfully');
                router.refresh();
              }
            }
          }}
        >
          {isBanned ? 'Unban' : 'Ban'}
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={row.original.role ?? ''}
              onValueChange={(value) => {
                console.log(value);
              }}
            >
              {rolesData.map((label) => (
                <DropdownMenuRadioItem
                  key={label}
                  value={label}
                  className="capitalize"
                  onClick={async () => {
                    const { error } = await authClient.admin.setRole({
                      userId: row.original.id,
                      role: label,
                    });

                    if (error) {
                      toast.error(error.message);
                    } else {
                      toast.success('User role updated successfully');
                      router.refresh();
                    }
                  }}
                >
                  {label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={async () => {
            const { error } = await authClient.admin.removeUser({
              userId: row.original.id,
            });

            if (error) {
              toast.error(error.message);
            } else {
              router.refresh();
              toast.success('User removed successfully');
            }
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
