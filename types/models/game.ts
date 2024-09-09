import { Battle } from "./battle";
import { Player } from "./player";

export type Game = {
  start_date: Date;
  end_date?: Date;
  players: Player[];
  battle_history: Battle[];
};
