import { z } from "zod";
import { cities } from "@/config/content";
export function normalizeMoroccanPhone(raw: string) {
  const digits = raw.replace(/[\s().-]/g, "");
  if (/^0[67]\d{8}$/.test(digits)) return `+212${digits.slice(1)}`;
  if (/^\+212[67]\d{8}$/.test(digits)) return digits;
  throw new Error("Entrez un numéro marocain valide (06, 07, +2126 ou +2127). ");
}
export const applicationSchema = z.object({
  fullName: z.string().trim().min(3, "Le nom doit contenir au moins 3 caractères.").max(120),
  whatsapp: z.string().transform((v, ctx) => { try { return normalizeMoroccanPhone(v); } catch { ctx.addIssue({ code: "custom", message: "Entrez un numéro marocain valide (06, 07, +2126 ou +2127)." }); return z.NEVER; } }),
  city: z.enum(cities, { errorMap: () => ({ message: "Choisissez une ville dans la liste." }) }),
  email: z.string().trim().email("Entrez une adresse e-mail valide.").max(254),
  motivation: z.string().trim().min(50, "Votre motivation doit contenir au moins 50 caractères.").max(800, "Votre motivation ne peut pas dépasser 800 caractères."),
  consent: z.boolean().refine((v) => v, "Votre accord est nécessaire pour traiter votre candidature."),
  website: z.string().max(0, "Envoi invalide.").optional(),
});
export type ApplicationInput = z.infer<typeof applicationSchema>;
