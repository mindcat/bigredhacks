import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, StyleSheet, TextInput, View, Text, TextProps } from "react-native";
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
        <ThemedText style={styles.textTitle}>Settings</ThemedText>
      </ThemedView>
      <Collapsible title={<Text style={styles.textB}>Debug</Text>}>
        <ThemedText style={styles.text}>Current latitude: {currentLat}</ThemedText>
        <ThemedText style={styles.text}>Current longitude: {currentLong}</ThemedText>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputNum}
            value={String(latitude)}
            onChangeText={(text) => setLatitude(Number(text))}
            placeholder="Enter latitude"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputNum}
            value={String(longitude)}
            onChangeText={(text) => setLongitude(Number(text))}
            placeholder="Enter longitude"
            keyboardType="numeric"
          />
          <Button title="Update Location" onPress={handleUpdateLocation} />
        </View>
      </Collapsible>
      <Collapsible title={<Text style={styles.textB}>Introduction</Text>}>
        <ThemedText style={styles.text}>
          Welcome to locus, a mobile application that helps you keep track of
          your memories geospatially!
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#FF3B30",
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
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: "PN", // Apply Poltawski Nowy font
  },
  inputNum: {
    borderWidth: 0, // No borders for minimalist look
    paddingLeft: 25,
    color: "#FFFFFF", // White text
    fontFamily: "PN", // Regular font
    fontSize: 16,
  },
  text: {
    fontSize: 15,
    color: "#FFFFFF", // White text for the note titles
    fontFamily: "PN", // Apply Poltawski Nowy font
  },
  textB: {
    fontSize: 15,
    color: "#FFFFFF", // White text for the note titles
    fontFamily: "PNB", // Apply Poltawski Nowy font
  },
  textTitle: {
    paddingTop: 10,
    fontSize: 36,
    color: "#FFFFFF", // White text for the note titles
    fontFamily: "PNB", // Apply Poltawski Nowy font
  },
  textI: {
    fontSize: 15,
    color: "#FFFFFF", // White text for the note titles
    fontFamily: "PNI", // Apply Poltawski Nowy font
  },
});
