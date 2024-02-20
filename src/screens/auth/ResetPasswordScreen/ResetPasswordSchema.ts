import {z} from 'zod';

export const resetPasswordSchema = z
  .object({
    email: z.string().email('E-mail inválido.'),
    tempPassword: z
      .string()
      .min(8, 'Senha muito curta.')
      .max(8, 'Senha muito longa.'),
    newPassword: z.string().min(8, 'Senha muito curta.'),
    confirmPassword: z.string().min(8, 'Senha muito curta.'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Senhas não coincidem.',
    path: ['confirmPassword'],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
