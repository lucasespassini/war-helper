import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTime } from "luxon";
import { create } from "zustand";
import { GAME_KEY } from "~/constants/storage-keys";
import { Game } from "~/types/models/game";
import { Player } from "~/types/models/player";

type GameStore = {
  game: Game;
  loadPrevGame(): Promise<void>;
  startGame(players: Player[]): Promise<void>;
  nextRound(): Promise<void>;
  reset(): Promise<void>;
};

export const useGameStore = create<GameStore>((set) => ({
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
  async nextRound() {
    set((state) => {
      if (state.game.round === 1) {
        return {
          game: {
            ...state.game,
            round: state.game.round + 1,
          },
        };
      }

      const updatedPlayers = [...state.game.players];
      const firstPlayer = updatedPlayers.shift();
      const currentPlayer = updatedPlayers[0];

      const isNewRound = currentPlayer.order === 1;

      if (firstPlayer) {
        state.game.round = isNewRound ? state.game.round + 1 : state.game.round;
        updatedPlayers.push(firstPlayer);
      }

      const data = {
        game: {
          ...state.game,
          players: updatedPlayers,
        },
      };

      return data;
    });
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
