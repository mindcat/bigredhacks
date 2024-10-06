import {
  StyleSheet,
  Text,
  Button,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabTwoScreen() {
  interface Note {
    id: any;
    timestamp: number;
    latitude: number;
    longitude: number;
    tags: string[];
    title: string;
    content: string;
  }

  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [latitude, setLatitude] = useState<string>(""); // Storing latitude as string for TextInput
  const [longitude, setLongitude] = useState<string>(""); // Storing longitude as string for TextInput
  const [tags, setTags] = useState<string>(""); // Comma-separated string to capture tags
  const [modalVisible, setModalVisible] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('timestamp');

  // const sortNotes = (notes) => {
  //   switch (sortCriteria) {
  //     case 'timestamp':
  //       return notes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  //     case 'tags':
  //       return notes.sort((a, b) => a.tags.join(', ').localeCompare(b.tags.join(', ')));
  //     case 'proximity':
  //       return notes.sort((a, b) => {
  //         const distanceA = Math.sqrt(Math.pow(a.latitude - currentLat, 2) + Math.pow(a.longitude - currentLong, 2));
  //         const distanceB = Math.sqrt(Math.pow(b.latitude - currentLat, 2) + Math.pow(b.longitude - currentLong, 2));
  //         return distanceA - distanceB;
  //       });
  //     default:
  //       return notes;
  //   }
  // };

  // const sortedNotes = sortNotes([...notes]);

  const handleSaveNote = () => {
    if (selectedNote) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id
          ? {
              ...note,
              title,
              content,
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              tags: tags.split(","),
            }
          : note
      );
      setNotes(updatedNotes);
      setSelectedNote(null);
    } else {
      const newNote = {
        id: Date.now(),
        timestamp: Date.now(), // Add timestamp property
        title,
        content,
        latitude: parseFloat(latitude), // Parse latitude and longitude to numbers
        longitude: parseFloat(longitude),
        tags: tags.split(","), // Split comma-separated tags into an array
      };
      setNotes([...notes, newNote]);
    }
    setTitle("");
    setContent("");
    setLatitude("");
    setLongitude("");
    setTags("");
    setModalVisible(false);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setModalVisible(true);
  };

  const handleDeleteNote = (note: Note) => {
    const updatedNotes = notes.filter((item) => item.id !== note.id);
    setNotes(updatedNotes);
    setSelectedNote(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Journey</Text>
      <Picker
          selectedValue={sortCriteria}
          style={{ height: 50, width: '100%' }}
          onValueChange={(itemValue) => setSortCriteria(itemValue)}
        >
          <Picker.Item label="Sort by Timestamp" value="timestamp" />
          <Picker.Item label="Sort by Tags" value="tags" />
          <Picker.Item label="Sort by Proximity" value="proximity" />
        </Picker>
      <ScrollView style={styles.noteList}>
        {notes.map((note) => (
          <TouchableOpacity key={note.id} onPress={() => handleEditNote(note)}>
            <View>
              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text>
                Location: {note.latitude}, {note.longitude}
              </Text>
              <Text>Tags: {note.tags.join(", ")}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setTitle("");
          setContent("");
          setModalVisible(true);
        }}
      >
        {/* <Text style={styles.addButtonText}>New Pin</Text>  */}
        <Ionicons name="pin-outline" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          {/* Title Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter note title"
            value={title}
            onChangeText={setTitle}
          />

          {/* Content Input */}
          <TextInput
            style={styles.contentInput}
            multiline
            placeholder="Enter note content"
            value={content}
            onChangeText={setContent}
          />

          {/* Latitude Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter latitude"
            value={latitude}
            onChangeText={setLatitude}
            keyboardType="numeric" // Ensures numeric keyboard for latitude input
          />

          {/* Longitude Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter longitude"
            value={longitude}
            onChangeText={setLongitude}
            keyboardType="numeric" // Ensures numeric keyboard for longitude input
          />

          {/* Tags Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter tags (comma-separated)"
            value={tags}
            onChangeText={setTags}
          />

          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSaveNote} color="#007BFF" />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              color="#FF3B30"
            />
            {selectedNote && (
              <Button
                title="Delete"
                onPress={() => handleDeleteNote(selectedNote)}
                color="#FF9500"
              />
            )}
          </View>
        </View>
      </Modal>
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