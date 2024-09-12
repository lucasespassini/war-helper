import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTime } from "luxon";
import { nanoid } from "nanoid/non-secure";
import { create } from "zustand";
import { GAME_KEY } from "~/constants/storage-keys";
import { Battle, PlayerBattle } from "~/types/models/battle";
import { Game } from "~/types/models/game";
import { Player } from "~/types/models/player";

type GameStore = {
  game: Game;
  loadPrevGame(): Promise<void>;
  startGame(players: Player[]): Promise<void>;
  startBattle(
    attacker: Omit<PlayerBattle, "casualties">,
    defender: Omit<PlayerBattle, "casualties">
  ): Promise<void>;
  nextTurn(): Promise<void>;
  reset(): Promise<void>;
};

export const useGameStore = create<GameStore>((set, get) => ({
  game: undefined!,
  async loadPrevGame() {
    const gameString = await AsyncStorage.getItem(GAME_KEY);

    if (gameString) {
      const game = JSON.parse(gameString);
      set({ game });
    }
  },
  async startGame(players) {
    const game: Game = {
      start_date: DateTime.now().toJSDate(),
      end_date: undefined,
      players,
      round: 1,
      battle_history: [],
    };
    await AsyncStorage.setItem(GAME_KEY, JSON.stringify(game));
    set({ game });
  },
  async startBattle(attacker, defender) {
    const { game } = get();

    const battle: Battle = {
      id: nanoid(5),
      attacker: { ...attacker, casualties: 0 },
      defender: { ...defender, casualties: 0 },
      results: [],
    };

    game.battle_history.push(battle);

    await AsyncStorage.setItem(GAME_KEY, JSON.stringify(game));

    set({ game });
  },
  async nextTurn() {
    const { game } = get();

    if (game.round === 1) {
      return set({ game: { ...game, round: game.round + 1 } });
    }

    const updatedPlayers = [...game.players];
    const firstPlayer = updatedPlayers.shift();
    const currentPlayer = updatedPlayers[0];

    const isNewRound = currentPlayer.order === 1;

    if (firstPlayer) {
      game.round = isNewRound ? game.round + 1 : game.round;
      updatedPlayers.push(firstPlayer);
    }

    game.players = updatedPlayers;

    await AsyncStorage.setItem(GAME_KEY, JSON.stringify(game));

    set({ game });
  },
  async reset() {
    set((state) => {
      const updatedPlayers = [...state.game.players];
      updatedPlayers.sort((a, b) => {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      });
      return { game: { ...state.game, round: 1, players: updatedPlayers } };
    });
  },
}));
