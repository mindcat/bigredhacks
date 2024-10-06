import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Note from "@/types/Note";
import LocationInputPage from "@/components/locus/LocationInputPage";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabTwoScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleDeleteNote = (note: Note) => {
    const updatedNotes = notes.filter((n) => n.id !== note.id);
    setNotes(updatedNotes);
  };
  const handleSaveNote = () => {
    if (selectedNote) {
      const { title, content, latitude, longitude, tags } = selectedNote;
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id
          ? {
              ...note,
              title,
              content,
              latitude: latitude,
              longitude: longitude,
              tags: tags,
            }
          : note
      );
      setNotes(updatedNotes);
      setSelectedNote(null);
    } else {
      const newNote = {
        id: Date.now(),
        timestamp: Date.now(), // Add timestamp property
        title: "",
        content: "",
        latitude: "",
        longitude: "",
        tags: "", // Split comma-separated tags into an array
      };
      setNotes([...notes, newNote]);
    }
  };

  const handleEditNote = (note: Note) => {};
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Journey</Text>

      <ScrollView className="flex-1">
        {notes.map((note) => (
          <TouchableOpacity
            key={note.id}
            onPress={() => handleEditNote(note)}
            className="mb-4 p-4 bg-gray-100 rounded-lg"
          >
            <View>
              <Text className="text-lg font-semibold">{note.title}</Text>
              <Text className="text-sm text-gray-600">
                Location: {note.latitude}, {note.longitude}
              </Text>
              <Text className="text-sm text-gray-600">Tags: {note.tags}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        className="mt-4 p-4 bg-blue-500 rounded-lg"
      >
        <Text style={styles.addButtonText}>New Pin</Text>
        <Ionicons name="pin-outline" />
      </TouchableOpacity>

      {modalVisible && (
        <LocationInputPage
          visible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080", // Keeping this unchanged since it's an image color
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#121212", // Dark background for the entire container
  },
  title: {
    fontSize: 36,
    marginBottom: 10,
    color: "#FFFFFF", // White text for titles
    fontFamily: "PN", // Use Poltawski Nowy font for the title
  },
  noteList: {
    flex: 1,
  },
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
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3B30", // Red highlight for the add button (NothingOS inspired)
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "#FFFFFF", // White text for the button
    fontSize: 16,
    fontFamily: "PN", // Apply Poltawski Nowy font to the button text
  },
  modalContainer: {
    flex: 1,
    padding: 50,
    backgroundColor: "#1E1E1E", // Dark background for modal
  },
  input: {
    borderWidth: 1,
    borderColor: "#FF3B30", // Red border highlight for inputs
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: "#FFFFFF", // White text for input fields
    backgroundColor: "#333333", // Dark background for input fields
    fontFamily: "PN", // Apply Poltawski Nowy font to the input fields
  },
  noteDetails: {
    fontSize: 12,
    color: "#FFFFFF", // White text for note details
    fontFamily: "PN", // Apply Poltawski Nowy font
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#FF3B30", // Red border for content input
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    height: 150,
    textAlignVertical: "top",
    backgroundColor: "#333333", // Dark background for content input
    color: "#FFFFFF", // White text for content input
    fontFamily: "PN", // Apply Poltawski Nowy font
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
