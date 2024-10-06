import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import GetLocation from "react-native-get-location"
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";

declare global {
  var currentLat: number;
  var currentLong: number;
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  global.currentLat = 43;
  global.currentLong  = -77;
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60000,
})
.then(location => {
    console.log(location);
})
.catch(error => {
    const { code, message } = error;
    console.warn(code, message);
})

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PN: require("../assets/fonts/PoltawskiNowy-Regular.otf"),
    PNI: require("../assets/fonts/PoltawskiNowy-Italic.otf"),
    PNB: require("../assets/fonts/PoltawskiNowy-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
