import LocationEntry from "@/components/locus/LocationEntry";
import LocationInputPage from "@/components/locus/LocationInputPage";
import Note from "@/types/Note";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Explore() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("timestamp");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`https://api.anhnlh.com/getAllLocations`, {
          method: "GET",
        });
        const data = await response.json();
        const locations = data.map((location: any) => ({
          timestamp: location.timestamp,
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude),
          tags: location.tags,
          title: location.title,
          content: location.content,
        }));
        setNotes(locations);
      } catch (error) {
        console.error("Error fetching markers:", error);
      }
    };

    fetchLocations();
  }, []);

  const sortNotes = (notes: Note[]) => {
    switch (sortCriteria) {
      case "timestamp":
        return notes.sort((a, b) => b.timestamp - a.timestamp);
      case "tags":
      // return notes.sort((a, b) => a.tags.join(', ').localeCompare(b.tags.join(', ')));
      case "proximity":
        return notes.sort((a, b) => {
          const distanceA = Math.sqrt(
            Math.pow(a.latitude - global.currentLat, 2) +
              Math.pow(a.longitude - global.currentLong, 2)
          );
          const distanceB = Math.sqrt(
            Math.pow(b.latitude - global.currentLat, 2) +
              Math.pow(b.longitude - global.currentLong, 2)
          );
          return distanceA - distanceB;
        });
      default:
        return notes;
    }
  };

  const sortedNotes = sortNotes([...notes]);

  // const handleSaveNote = () => {
  //   if (selectedNote) {
  //     const updatedNotes = notes.map((note) =>
  //       note.id === selectedNote.id
  //         ? {
  //             ...note,
  //             title,
  //             content,
  //             latitude: parseFloat(latitude),
  //             longitude: parseFloat(longitude),
  //             tags: tags.split(","),
  //           }
  //         : note
  //     );
  //     setNotes(updatedNotes);
  //     setSelectedNote(null);
  //   } else {
  //     const newNote = {
  //       id: Date.now(),
  //       timestamp: Date.now(), // Add timestamp property
  //       title,
  //       content,
  //       latitude: parseFloat(latitude), // Parse latitude and longitude to numbers
  //       longitude: parseFloat(longitude),
  //       tags: tags.split(","), // Split comma-separated tags into an array
  //     };
  //     setNotes([...notes, newNote]);
  //   }
  //   setTitle("");
  //   setContent("");
  //   setLatitude("");
  //   setLongitude("");
  //   setTags("");
  //   setModalVisible(false);
  // };

  // const handleEditNote = (note: Note) => {
  //   setSelectedNote(note);
  //   setTitle(note.title);
  //   setContent(note.content);
  //   setModalVisible(true);
  // };

  // const handleDeleteNote = (note: Note) => {
  //   const updatedNotes = notes.filter((item) => item.id !== note.id);
  //   setNotes(updatedNotes);
  //   setSelectedNote(null);
  //   setModalVisible(false);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Journey</Text>
      <Picker
        selectedValue={sortCriteria}
        style={styles.input}
        onValueChange={(itemValue) => setSortCriteria(itemValue)}
      >
        <Picker.Item label="Sort by Timestamp" value="timestamp" />
        <Picker.Item label="Sort by Tags" value="tags" />
        <Picker.Item label="Sort by Proximity" value="proximity" />
      </Picker>
      {/* <Ionicons name="filter-outline" size={20} color="#FFFFFF" style={styles.icon} /> */}

      <ScrollView style={styles.noteList}>
        {notes.map((note) => (
          <LocationEntry key={note.timestamp} note={note} onPress={() => {}} />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        {/* <Text style={styles.addButtonText}>New Pin</Text>  */}
        <Ionicons name="pin-outline" size={24} />
      </TouchableOpacity>

      {modalVisible && (
        <LocationInputPage
          modalVisible={modalVisible}
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
