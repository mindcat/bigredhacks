import Location from "@/types/Location";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LocationEntryProps {
  location: Location;
  handleOnPress: (location: Location) => void;
}

export default function LocationEntry({
  location,
  handleOnPress,
}: LocationEntryProps) {
  return (
    <TouchableOpacity onPress={() => handleOnPress(location)}>
      <View style={styles.locationTitle}>
        <Text style={styles.location}>{location.title}</Text>
        <View style={styles.row}>
          <Text style={styles.locationDetails}>
            Coordinates: {location.latitude.toFixed(6)},{" "}
            {location.longitude.toFixed(6)}
          </Text>
          <Text style={styles.errorText}>#{location.tags}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  locationTitle: {
    fontSize: 15,
    marginBottom: 10,
    color: "#FFFFFF",
    backgroundColor: "#1E1E1E",
    height: 50,
    width: "100%",
    padding: 10,
    borderRadius: 8,
    fontFamily: "PNB", // Apply Poltawski Nowy font
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  location: {
    fontSize: 15,
    // marginBottom: ,
    color: "#FFFFFF",
    fontFamily: "PNB", // Apply Poltawski Nowy font
  },
  locationDetails: {
    fontSize: 12,
    marginBottom: 10,
    color: "#FFFFFF",
    fontFamily: "PN", // Apply Poltawski Nowy font
  },
  errorText: {
    fontSize: 12,
    color: "#FF3B30", // Red error text
    fontFamily: "SpaceMono", // Monospace font
    marginBottom: 10,
  },
});
