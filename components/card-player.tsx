import { Badge, Icon, Text } from "@rneui/themed";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useGameStore } from "~/hooks/store/gameStore";
import { Player } from "~/types/models/player";

type CardPlayerProps = {
  current_turn: boolean;
  player: Player;
};

export const CardPlayer = ({ current_turn, player }: CardPlayerProps) => {
  const game = useGameStore((s) => s.game);

  return (
    <View
      style={{
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <View style={{ gap: 5 }}>
        <View style={{ alignItems: "center", flexDirection: "row", gap: 10 }}>
          <Icon name="circle" color={player.color} />
          <Text style={{ fontSize: 17, fontWeight: 700 }}>{player.name}</Text>
          {current_turn && game.round !== 1 && (
            <Badge
              value="Seu turno"
              status="primary"
              textStyle={{ color: "#000" }}
            />
          )}
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text>Territórios: {player.territories}</Text>
          <Text>Cartas: {player.cards}</Text>
        </View>
      </View>

      {!current_turn && game.round !== 1 && (
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={() =>
            router.push({
              pathname: "select-troops",
              params: {
                attacker: JSON.stringify(game.players[0]),
                defender: JSON.stringify(player),
              },
            })
          }
        >
          <MaterialIcons
            name="location-searching"
            color="#fff"
            style={{ fontSize: 30 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
