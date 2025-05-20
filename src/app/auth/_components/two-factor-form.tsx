import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { TotpSchema, totpSchema } from "../_lib/schema/totp.schema";
import { useRouter } from "next/navigation";

export function TwoFactorForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const form = useForm<TotpSchema>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(totpSchema),
  });

  const onSubmit = async (data: TotpSchema) => {
    startTransition(async () => {
      const res = await authClient.twoFactor.verifyTotp({
        code: data.code,
      });

      if (res.data?.token) {
        setSuccess(true);
        router.refresh();
      } else {
        form.setError("code", { message: "Invalid TOTP code" });
      }
    });
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
        <p className="text-lg font-semibold">Verification Successful</p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TOTP Code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  placeholder="Enter 6-digit code"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 'Verify'}
        </Button>
      </form>
    </Form>
  )
}