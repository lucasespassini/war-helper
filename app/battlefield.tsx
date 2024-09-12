import { Icon, Text } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { BattleDivider } from "~/components/battle-divider";
import { Player } from "~/types/models/player";

const CardPlayer = (player: Player) => {
  return (
    <View style={{ alignItems: "center", flexDirection: "row", gap: 10 }}>
      <Icon name="circle" color={player.color} />
      <Text style={{ fontSize: 17, fontWeight: 700 }}>{player.name}</Text>
    </View>
  );
};

export default function BattlefieldScreen() {
  const localSearchParams = useLocalSearchParams<{
    attacker: string;
    defender: string;
  }>();

  // const startBattle = useGameStore((s) => s.startBattle);

  const attacker: Player = JSON.parse(localSearchParams.attacker);
  const defender: Player = JSON.parse(localSearchParams.defender);

  return (
    <View>
      <CardPlayer {...attacker} />

      <BattleDivider />

      <CardPlayer {...defender} />
    </View>
  );
}
