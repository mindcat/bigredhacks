import { Tabs } from "expo-router";

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
          title: "recollections",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"telescope-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "pins",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"globe-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "start",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"golf-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
