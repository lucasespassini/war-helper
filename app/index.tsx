import { Text } from "@rneui/themed";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "~/components/button";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <View>
        <Text>War</Text>
        <Text>Helper</Text>
      </View>

      <Button size="lg" onPress={() => router.push("/current-game")}>
        Continuar
      </Button>

      <Button size="lg" onPress={() => router.push("/new-game")}>
        Novo jogo
      </Button>
    </View>
  );
}
