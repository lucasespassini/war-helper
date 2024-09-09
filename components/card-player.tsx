import { Icon, Text } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Player } from "~/types/models/player";

type CardPlayerProps = Player;

export const CardPlayer = (player: CardPlayerProps) => {
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
          <Text key={player.id} style={{ fontSize: 17, fontWeight: 700 }}>
            {player.name}
          </Text>
        </View>

        <Text key={player.id}>Territorios: {player.territories}</Text>
      </View>

      <TouchableOpacity style={{ padding: 5 }}>
        <MaterialIcons
          name="location-searching"
          color="#fff"
          style={{ fontSize: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
};
