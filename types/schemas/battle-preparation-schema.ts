import { z } from "zod";

export const battlePreparationSchema = z.object({
  attacker_troops: z.coerce.number().min(1, "quantidade de tropas inválida"),
  defender_troops: z.coerce.number().min(1, "quantidade de tropas inválida"),
});

export type BattlePreparationForm = z.infer<typeof battlePreparationSchema>;
