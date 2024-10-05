import { Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    <View>
      <MapView className="h-full w-full" />
    </View>
  );
}
