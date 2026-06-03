import { z } from "zod";

export const createClienteSchema = z.object({
  nominativo: z.string().min(1, "Nominativo obbligatorio"),
  via: z.string().min(1, "Via obbligatoria"),
  comune: z.string().min(1, "Comune obbligatorio"),

  provincia: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email().optional(),
  note: z.string().optional(),
});

export const updateClienteSchema = z.object({
  nominativo: z.string().min(1).optional(),
  via: z.string().min(1).optional(),
  comune: z.string().min(1).optional(),

  provincia: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email().optional(),
  note: z.string().optional(),
});