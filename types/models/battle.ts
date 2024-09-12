import { Player } from "./player";

export type PlayerBattle = {
  troops: number;
  casualties: number;
  player: Player;
};

export type Result = {
  attacker_result: 1 | 2 | 3 | 4 | 5 | 6;
  defender_result: 1 | 2 | 3 | 4 | 5 | 6;
};

export type Battle = {
  id: string;
  results: Result[];
  attacker: PlayerBattle;
  defender: PlayerBattle;
};
