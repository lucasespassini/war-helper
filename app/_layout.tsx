import { ThemeProvider } from "@rneui/themed";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "~/constants/theme";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Stack
          screenOptions={{
            statusBarColor: "#000",
            headerShown: false,
            contentStyle: {
              height: "100%",
              padding: 5,
              backgroundColor: "#212121",
            },
          }}
        />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
