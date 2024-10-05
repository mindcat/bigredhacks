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
      <Text style={styles.title}>My Notes</Text>

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
        <Text style={styles.addButtonText}>Add Note</Text>
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
    color: "#808080",
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
    backgroundColor: "#e6e6e6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  noteList: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "white",
    height: 40,
    width: "100%",
    padding: 10,
    borderRadius: 8,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 50,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  noteDetails: {
    fontSize: 12,
    color: "#555",
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    height: 150,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
