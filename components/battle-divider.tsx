import { Divider, Text } from "@rneui/themed";
import { View } from "react-native";

export const BattleDivider = () => {
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Divider style={{ width: "100%" }} />
      <Text>VS</Text>
      <Divider style={{ width: "100%" }} />
    </View>
  );
};
