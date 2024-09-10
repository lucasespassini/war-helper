import { Divider, Text } from "@rneui/themed";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import { Button } from "~/components/button";
import { CardPlayer } from "~/components/card-player";
import { useGameStore } from "~/hooks/store/gameStore";
import { Player } from "~/types/models/player";

const KeyExtractor = (item: Player) => item.id;

const RenderItem = ({ item, index }: ListRenderItemInfo<Player>) => (
  <CardPlayer current_turn={index === 0} player={item} />
);

const ItemSeparatorComponent = () => <Divider style={{ marginVertical: 10 }} />;

const Header = () => {
  const game = useGameStore((s) => s.game);

  return (
    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
      <Text>Round: {game.round}</Text>
    </View>
  );
};

export default function CurrentGameScreen() {
  const [game, nextRound, reset] = useGameStore((s) => [
    s.game,
    s.nextRound,
    s.reset,
  ]);

  return (
    <View
      style={{
        height: "100%",
        paddingBottom: 10,
        justifyContent: "space-between",
        gap: 15,
      }}
    >
      <Header />

      <FlatList
        data={game.players}
        keyExtractor={KeyExtractor}
        renderItem={RenderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />

      <Button onPress={reset}>Resetar</Button>

      {game.players[0].cards > 3 && (
        <Button disabled={game.players[0].cards < 3}>Trocar cartas</Button>
      )}
      <Button onPress={nextRound}>
        {game.round === 1 ? "Iniciar" : "Encerrar turno"}
      </Button>
    </View>
  );
}
