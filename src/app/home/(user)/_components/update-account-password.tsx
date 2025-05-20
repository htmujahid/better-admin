'use client'

import { toast } from 'sonner'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useTransition } from 'react'
import { authClient } from '@/lib/auth-client'
import { Checkbox } from '@/components/ui/checkbox'

const updatePasswordSchema = z.object({
  current_password: z.string().min(8),
  new_password: z.string().min(8),
  revoke_other_sessions: z.boolean(),
})

export function UpdateAccountPasswordForm() {
  const [pending, startTransition] = useTransition()
  const form = useForm({
    defaultValues: {
      current_password: '',
      new_password: '',
      revoke_other_sessions: true,
    },
    resolver: zodResolver(updatePasswordSchema),
  })

  const onSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    const { current_password, new_password, revoke_other_sessions } = data
    startTransition(async () => {
      await authClient.changePassword(
        {
          currentPassword: current_password,
          newPassword: new_password,
          revokeOtherSessions: revoke_other_sessions,
        },
        {
          onSuccess: () => {
            toast.success('Password updated successfully')
            form.reset()
          },
          onError: ({ error }) => {
            toast.error(error.message)
          },
        },
      )
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Password</CardTitle>
        <CardDescription>Update your account password below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="current_password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="********"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="new_password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="********"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="revoke_other_sessions"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-y-0">
                    <FormControl>
                      <Checkbox
                        {...field}
                      />
                    </FormControl>
                    <div className="space-y-1.5 leading-none">
                      <FormLabel>Revoke other sessions</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Sign out from all other devices when changing password
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              <Button className="w-fit" disabled={pending}>
                Update Password
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}