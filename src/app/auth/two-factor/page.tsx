"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TwoFactorForm } from "../_components/two-factor-form";

export default function TwoFactorPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>TOTP Verification</CardTitle>
        <CardDescription>
          Enter your 6-digit TOTP code to authenticate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TwoFactorForm />
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground gap-2">
        <Link href="/auth/two-factor/otp">
          <Button variant="link" size="sm">
            Switch to Email Verification
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}