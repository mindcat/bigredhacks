import LocationInputPage from "@/components/locus/LocationInputPage";
import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { MapMarkerProps, Marker } from "react-native-maps";

export default function Index() {
  // global currentLat =

  const [markers, setMarkers] = useState([
    {
      coordinate: { latitude: 10.7423, longitude: 106.701 },
      title: "Chung cư Sunrise City Central",
      description: "Anh Nguyễn",
    },
    {
      coordinate: { latitude: 32.212, longitude: -110.968 },
      title: "Cafe Desta",
      description: "best ethiopian in Tucson!",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <MapView style={styles.map}>
        {markers.map((marker: MapMarkerProps, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.roundButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      {modalVisible && (
        <LocationInputPage
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "100%",
    width: "100%",
  },
  roundButton: {
    position: "absolute", // Ensure the button is positioned over the map
    bottom: 20, // Distance from the bottom
    right: 20, // Distance from the right
    backgroundColor: "#FF3B30", // Red background (you can change the color)
    width: 60, // Button width
    height: 60, // Button height
    borderRadius: 30, // Half of width/height to make it round
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Shadow on Android
    shadowColor: "#000", // Shadow on iOS
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
  },
  buttonText: {
    color: "white", // Button text color
    fontSize: 24, // Font size
    fontWeight: "bold",
  },
});
