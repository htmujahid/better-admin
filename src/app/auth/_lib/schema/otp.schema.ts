import { z } from 'zod';

export const otpSchema = z.object({
  code: z
    .string()
    .length(6, 'OTP code must be 6 digits')
    .regex(/^\d+$/, 'OTP code must contain only digits'),
});

export type OtpSchema = z.infer<typeof otpSchema>;
