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
      <View style={styles.noteTitle}>
        <Text style={styles.note}>{note.title}</Text>
        <Text style={styles.noteLoc}>Location: {note.latitude}, {note.longitude}</Text>
        <Text style={styles.errorText}>Tags: {note.tags}</Text>
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
    height: 50,
    width: "100%",
    padding: 10,
    borderRadius: 8,
    fontFamily: "PNB", // Apply Poltawski Nowy font
  },
  note: {
    fontSize: 15,
    // marginBottom: ,
    color: "#FFFFFF", // White text for the note titles
    fontFamily: "PNB", // Apply Poltawski Nowy font
  },
  noteLoc: {
    fontSize: 12,
    // marginBottom: ,
    color: "#FFFFFF", // White text for the note titles
    fontFamily: "PN", // Apply Poltawski Nowy font
  },
  errorText: {
    color: "#FF3B30", // Red error text
    fontFamily: "SpaceMono", // Monospace font
    marginBottom: 10,
  },
});
