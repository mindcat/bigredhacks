import LocationInputPage from "@/components/locus/LocationInputPage";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { MapMarkerProps, Marker } from "react-native-maps";
import Note from "@/types/Note";

export default function Index() {
  const [markers, setMarkers] = useState<MapMarkerProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch(`https://api.anhnlh.com/getAllLocations`, {
          method: "GET",
        });
        const data = await response.json();
        const markersData = data.map((location: any) => ({
          title: location.title,
          description: location.content,
          coordinate: {
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude),
          },
        }));
        setMarkers(markersData);
      } catch (error) {
        console.error("Error fetching markers:", error);
      }
    };

    fetchMarkers();
  }, [modalVisible]);

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
        <Ionicons name="pin-outline" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.journeyButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="footsteps-outline" size={30} color="white" />
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
    right: "50%", // Distance from the right
    marginRight: -30,
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
  journeyButton: {
    position: "absolute", // Ensure the button is positioned over the map
    bottom: 25, // Distance from the bottom
    right: 25, // Distance from the right
    backgroundColor: "#1E1E1E", // Red background (you can change the color)
    width: 50, // Button width
    height: 50, // Button height
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
