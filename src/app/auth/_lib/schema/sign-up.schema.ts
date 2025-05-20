import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
