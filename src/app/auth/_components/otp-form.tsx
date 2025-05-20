'use client';

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { OtpSchema, otpSchema } from "../_lib/schema/otp.schema";

export function OtpForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  // In a real app, this email would come from your authentication context
  const userEmail = "user@example.com";

  const form = useForm<OtpSchema>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(otpSchema),
  });

  const requestOTP = async () => {
    startTransition(async () => {
      await authClient.twoFactor.sendOtp();
      setMessage("OTP sent to your email");
      setIsError(false);
      setIsOtpSent(true);
    });
  };

  const onSubmit = async (data: OtpSchema) => {
    startTransition(async () => {
      const res = await authClient.twoFactor.verifyOtp({
        code: data.code,
      });

      if (res.data) {
        setMessage("OTP validated successfully");
        setIsError(false);
        setIsValidated(true);
        router.refresh();
      } else {
        setIsError(true);
        setMessage("Invalid OTP");
        form.setError("code", { message: "Invalid OTP" });
      }
    });
  };

  return (
    <div className="grid w-full items-center gap-4">
      {!isOtpSent ? (
        <Button onClick={requestOTP} className="w-full" disabled={pending}>
          {pending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Mail className="mr-2 h-4 w-4" />
          )}
          Send OTP to Email
        </Button>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <FormField
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-sm text-muted-foreground">
                Check your email at {userEmail} for the OTP
              </p>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={pending || isValidated}
            >
              {pending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Validate OTP
            </Button>
          </form>
        </Form>
      )}
      {message && (
        <div
          className={`flex items-center gap-2 mt-4 ${
            isError ? "text-red-500" : "text-primary"
          }`}
        >
          {isError ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          <p className="text-sm">{message}</p>
        </div>
      )}
    </div>
  );
}
