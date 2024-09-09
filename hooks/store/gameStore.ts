import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTime } from "luxon";
import { create } from "zustand";
import { GAME_KEY } from "~/constants/storage-keys";
import { Game } from "~/types/models/game";
import { Player } from "~/types/models/player";

type GameStore = {
  game: Game;
  startGame(players: Player[]): Promise<void>;
  loadPrevGame(): Promise<void>;
};

export const useGameStore = create<GameStore>((set) => ({
  game: undefined!,
  async startGame(players) {
    const game = {
      start_date: DateTime.now().toJSDate(),
      end_date: undefined,
      players,
      battle_history: [],
    };
    await AsyncStorage.setItem(GAME_KEY, JSON.stringify(game));
    set({ game });
  },
  async loadPrevGame() {
    const gameString = await AsyncStorage.getItem(GAME_KEY);

    if (gameString) {
      const game = JSON.parse(gameString);
      set({ game });
    }
  },
}));
