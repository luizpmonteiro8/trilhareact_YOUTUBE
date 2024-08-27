import { z } from "zod";

const refererSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Nome do referente é obrigatório"),
  telephone: z.string().min(1, "Telefone do referente é obrigatório"),
});

export const schema = z.object({
  id: z.number().nullable(),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  telephone: z.string().min(1, "Telefone é obrigatório"),
  knowReact: z.boolean(),
  referer: z
    .array(refererSchema)
    .min(1, "Pelo menos um referente é obrigatório"),
});

export type FormValues = z.infer<typeof schema>;
