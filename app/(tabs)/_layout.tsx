// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" />
//     </Stack>
//   );
// }
import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: "recall",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={"telescope-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "note",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={"pin-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "settings",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={"cog-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
