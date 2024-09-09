import { ThemeProvider } from "@rneui/themed";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "~/constants/theme";
import { useGameStore } from "~/hooks/store/gameStore";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const loadPrevGame = useGameStore((s) => s.loadPrevGame);

  useEffect(() => {
    async function prepare() {
      try {
        await loadPrevGame();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
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
