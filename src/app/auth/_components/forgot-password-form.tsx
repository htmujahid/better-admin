'use client'

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import appConfig from "@/config/app.config";
import pathsConfig from "@/config/paths.config";
import { ForgotPasswordSchema, forgotPasswordSchema } from "../_lib/schema/forgot-password.schema";
import { AuthError } from "./auth-error";
import { AuthSuccess } from "./auth-success";
import { Loader2 } from "lucide-react";

export function ForgotPasswordForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const form = useForm<ForgotPasswordSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordSchema) => {
    startTransition(async () => {
      await authClient.forgetPassword(
        {
          email: data.email,
          redirectTo: appConfig.url + pathsConfig.auth.resetPassword,
        },
        {
          onError: ({ error: err }) => {
            setError(err.message)
            setSuccess(undefined)
          },
          onSuccess: () => {
            setError(undefined)
            setSuccess('Check your inbox for the reset link')
          },
        },
      )
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && <AuthError error={error} />}
        {success && <AuthSuccess message={success} />}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 'Reset Password'}
        </Button>
      </form>
    </Form>
  )
}
