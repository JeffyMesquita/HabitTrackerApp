import {z} from 'zod';

export const confirmEmailSchema = z.object({
  code1: z.string().min(1, 'Código inválido.').max(1, 'Código inválido.'),
  code2: z.string().min(1, 'Código inválido.').max(1, 'Código inválido.'),
  code3: z.string().min(1, 'Código inválido.').max(1, 'Código inválido.'),
  code4: z.string().min(1, 'Código inválido.').max(1, 'Código inválido.'),
  code5: z.string().min(1, 'Código inválido.').max(1, 'Código inválido.'),
  code6: z.string().min(1, 'Código inválido.').max(1, 'Código inválido.'),
});

export type ConfirmEmailSchema = z.infer<typeof confirmEmailSchema>;
