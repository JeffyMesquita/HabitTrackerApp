import {z} from 'zod';

export const signUpSchema = z
  .object({
    firstName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres.'),
    email: z.string().email('Email inválido.'),
    password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres.'),
    confirmPassword: z
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Senhas não coincidem.',
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
