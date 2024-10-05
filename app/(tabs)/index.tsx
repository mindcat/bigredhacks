<<<<<<< HEAD
import { Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
=======
import { useState } from "react";
import { Text, Pressable, View } from "react-native";
import MapView, { MapMarkerProps, Marker } from "react-native-maps";
>>>>>>> refs/remotes/origin/main

export default function Index() {
  const [markers, setMarkers] = useState([
    {
      coordinate: { latitude: 37.78825, longitude: -122.4324 },
      title: "Hello",
      description: "World",
    },
  ]);

  return (
    <View>
      <MapView className="h-full" tintColor="red">
        {markers.map((marker: MapMarkerProps, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      <Pressable className="h-8 ">
        <Text className="text-white text-center">Add Marker</Text>
      </Pressable>
    </View>
  );
}
