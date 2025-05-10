import z from '@/lib/zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(255, 'Password must be less than 255 characters')
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    'Password must contain at least one number, one uppercase, and one lowercase letter'
  );

export const emailSchema = z
  .string()
  .email()
  .min(1)
  .transform((email) => email.toLowerCase());

export const signUpSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .max(255, 'Username must be less than 255 characters'),
  email: emailSchema,
  password: passwordSchema
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255)
});
