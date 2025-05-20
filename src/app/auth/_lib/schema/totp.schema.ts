import { z } from 'zod';

export const totpSchema = z.object({
  code: z
    .string()
    .length(6, 'TOTP code must be 6 digits')
    .regex(/^\d+$/, 'TOTP code must contain only digits'),
});

export type TotpSchema = z.infer<typeof totpSchema>;
