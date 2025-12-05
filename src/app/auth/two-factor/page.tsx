'use client';

import Link from 'next/link';

import { TwoFactorForm } from '@/components/auth/two-factor-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
      <CardFooter className="text-muted-foreground gap-2 text-sm">
        <Link href="/auth/two-factor/otp">
          <Button variant="link" size="sm">
            Switch to Email Verification
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
