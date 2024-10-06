import LocationInputPage from "@/components/locus/LocationInputPage";
import { callApiGetAllLocations } from "@/utils/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { MapMarkerProps, Marker, Polyline } from "react-native-maps";

export default function Index() {
  const [markers, setMarkers] = useState<MapMarkerProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [polylineCoordinates, setPolylineCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
  const [isPolylineVisible, setIsPolylineVisible] = useState(false);

  useEffect(() => {
    callApiGetAllLocations().then((locations) => {
      // Sort locations by timestamp
      const sortedLocations = locations.sort((a: any, b: any) => new Date(a.timestamp) - new Date(b.timestamp));

      const markersData = sortedLocations.map((location: any) => ({
        title: location.title,
        description: location.content,
        coordinate: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      }));

      const polylineCoords = sortedLocations.map((location: any) => ({
        latitude: location.latitude,
        longitude: location.longitude,
      }));

      setMarkers(markersData);
      setPolylineCoordinates(polylineCoords);
    });
  }, [modalVisible]);

  const togglePolylineVisibility = () => {
    setIsPolylineVisible(!isPolylineVisible);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {markers.map((marker: MapMarkerProps, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
        {isPolylineVisible && polylineCoordinates.length > 1 && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeColor="#FF3B30" // Red color (you can change the color)
            strokeWidth={2}
            lineDashPattern={[1, 2]} // Dotted line pattern
          />
        )}
      </MapView>
      <TouchableOpacity
        style={styles.roundButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="pin-outline" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.journeyButton}
        onPress={togglePolylineVisibility}
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
