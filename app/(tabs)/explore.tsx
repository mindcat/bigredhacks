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
              latitude: parseFloat(latitude.toString()),
              longitude: parseFloat(longitude.toString()),
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
        latitude: 0,
        longitude: 0,
        tags: "", // Split comma-separated tags into an array
      };
      setNotes([...notes, newNote]);
    }
  };

  const handleEditNote = (note: Note) => {};
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4 mt-8">My Notes</Text>

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
        <Text className="text-white text-center">Add Note</Text>
      </TouchableOpacity>

      {modalVisible && <LocationInputPage visible={modalVisible} />}
    </View>
  );
}
