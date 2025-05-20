"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OtpForm } from "../../_components/otp-form";

export default function OtpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Two-Factor Authentication</CardTitle>
        <CardDescription>
          Verify your identity with a one-time password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OtpForm />
      </CardContent>
    </Card>
  );
}