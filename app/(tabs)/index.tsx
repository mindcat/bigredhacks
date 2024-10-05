import React, { useState } from "react";
import { Text, Pressable, View } from "react-native";
import MapView, { MapMarkerProps, Marker } from "react-native-maps";

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
    </View>
  );
}
