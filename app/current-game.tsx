import { Divider } from "@rneui/themed";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import { CardPlayer } from "~/components/card-player";
import { useGameStore } from "~/hooks/store/gameStore";
import { Player } from "~/types/models/player";

const KeyExtractor = (item: Player) => item.id;

const RenderItem = ({ item }: ListRenderItemInfo<Player>) => (
  <CardPlayer {...item} />
);

const ItemSeparatorComponent = () => <Divider style={{ marginVertical: 10 }} />;

export default function CurrentGameScreen() {
  const [game] = useGameStore((s) => [s.game]);

  return (
    <View style={{}}>
      <FlatList
        data={game.players}
        keyExtractor={KeyExtractor}
        renderItem={RenderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
}
