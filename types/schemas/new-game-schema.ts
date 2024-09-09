import { z } from "zod";
import { Colors } from "~/constants/colors";

const playerSchema = z.object({
  name: z.string().trim().min(2, "nome inválido"),
  color: z.string().refine((color) => Colors.includes(color), "cor inválida"),
});

export const newGameSchema = z.object({
  players: z
    .array(playerSchema)
    .min(2, "mínimo de 2 jogadores")
    .max(6, "máximo de 6 jogadores"),
});

export type NewGameForm = z.infer<typeof newGameSchema>;
