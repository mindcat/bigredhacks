import React, { useState } from "react";
import { View } from "react-native";
import MapView, { MapMarkerProps, Marker } from "react-native-maps";

export default function Index() {
  const [markers, setMarkers] = useState([
    {
      coordinate: { latitude: 10.74221, longitude: 106.6742125 },
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
