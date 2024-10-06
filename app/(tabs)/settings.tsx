import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, StyleSheet, TextInput, View } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";

export default function TabTwoScreen() {
  const [latitude, setLatitude] = useState(global.currentLat);
  const [longitude, setLongitude] = useState(global.currentLong);
  const handleUpdateLocation = () => {
    global.currentLat = latitude;
    global.currentLong = longitude;
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="cog-outline" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
      <Collapsible title="Debug">
        <ThemedText>Current latitude: {currentLat}</ThemedText>
        <ThemedText>Current longitude: {currentLong}</ThemedText>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={String(latitude)}
            onChangeText={(text) => setLatitude(Number(text))}
            placeholder="Enter latitude"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={String(longitude)}
            onChangeText={(text) => setLongitude(Number(text))}
            placeholder="Enter longitude"
            keyboardType="numeric"
          />
          <Button title="Update Location" onPress={handleUpdateLocation} />
        </View>
      </Collapsible>
      <Collapsible title="Guide">
        <ThemedText>
          Welcome to locus, a mobile application that helps you keep track of
          your memories geospatially!
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
