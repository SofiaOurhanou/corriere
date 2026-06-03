import { z } from "zod";

export const trackingSchema = z.object({
  trackingKey: z.string().min(1, "Tracking obbligatoria"),
  dataRitiro: z.coerce.date(),
});