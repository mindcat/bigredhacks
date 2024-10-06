import Note from "@/types/Note";
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface LocationEntryProps {
  note: Note;
  onPress: () => void;
}

export default function LocationEntry({ note, onPress }: LocationEntryProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text style={styles.noteTitle}>{note.title}</Text>
        <Text>
          Location: {note.latitude}, {note.longitude}
        </Text>
        <Text>Tags: {note.tags}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  noteTitle: {
    fontSize: 15,
    marginBottom: 10,
    color: "#FFFFFF", // White text for the note titles
    backgroundColor: "#1E1E1E", // Dark background for note titles
    height: 40,
    width: "100%",
    padding: 10,
    borderRadius: 8,
    fontFamily: "PoltawskiNowy", // Apply Poltawski Nowy font
  },
});
