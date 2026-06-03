import { z } from "zod";

export const StatoConsegnaEnum = z.enum([
  "DA_RITIRARE",
  "IN_DEPOSITO",
  "IN_CONSEGNA",
  "CONSEGNATA",
  "IN_GIACENZA",
]);

export const createConsegnaSchema = z.object({
  clienteId: z.number().int().positive(),
  trackingKey: z.string().min(1),

  dataRitiro: z.coerce.date(),
});

export const updateConsegnaSchema = z.object({
  clienteId: z.number().int().positive().optional(),
  trackingKey: z.string().min(1).optional(),

  dataRitiro: z.coerce.date().optional(),
  dataConsegna: z.coerce.date().optional(),
  stato: StatoConsegnaEnum.optional(),
});

// solo cambio stato (endpoint dedicato)
export const updateStatoConsegnaSchema = z.object({
  stato: StatoConsegnaEnum,
  dataConsegna: z.coerce.date().optional(),
});