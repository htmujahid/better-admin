'use client';

import { Fragment, useState } from 'react';

import { ChevronDown, ChevronRight } from 'lucide-react';

import { useAccessControl } from '@/components/providers/auth-provider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { allRoles } from '@/lib/auth/roles';

export function AccountRoles({ roles }: { roles: string[] | undefined }) {
  const { getRolePermissions } = useAccessControl();
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>(
    {},
  );

  const toggleRole = (role: string) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [role]: !prev[role],
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Roles and Permissions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Role</TableHead>
              <TableHead>Entities</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles?.map((role, roleIndex) => {
              const statements = getRolePermissions(
                role as keyof typeof allRoles,
              );
              const entities = Object.keys(statements);
              const isExpanded = expandedRoles[role];

              return (
                <Fragment key={roleIndex}>
                  <TableRow
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => toggleRole(role)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        {role}
                      </div>
                    </TableCell>
                    <TableCell>{entities.length} entities</TableCell>
                  </TableRow>
                  {isExpanded &&
                    entities.map((entity, entityIndex) => {
                      const permissions =
                        statements[entity as keyof typeof statements] || [];
                      return (
                        <TableRow key={entityIndex} className="bg-muted/30">
                          <TableCell className="pl-8">
                            {entityIndex + 1}. {entity}
                          </TableCell>
                          <TableCell colSpan={2}>
                            <div className="flex flex-wrap gap-1">
                              {permissions.map(
                                (permission, permissionIndex) => (
                                  <Badge
                                    key={permissionIndex}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {permission}
                                  </Badge>
                                ),
                              )}
                              {permissions.length === 0 && (
                                <span>No permissions</span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
