import { z } from "zod";

export const registerSchema = z.object({
  nome: z.string(),
  cognome: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});