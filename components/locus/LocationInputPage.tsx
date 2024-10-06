import Note from "@/types/Note";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface LocationInputPageProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export default function LocationInputPage({
  modalVisible,
  setModalVisible,
}: LocationInputPageProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Note>();

  const onSubmit: SubmitHandler<Note> = (data) => {
    console.log(data);
    const { title, content, latitude, longitude, tags } = data;
    const newNote = {
      timestamp: Date.now(), // last used
      title,
      content,
      latitude,
      longitude,
      tags,
    };

    fetch(`https://api.anhnlh.com/uploadLocation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // TODO: show a checkmark then close the modal after a short delay
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true} // Ensures modal is transparent
    >
      <View style={styles.modalContainer}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter location title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.inputBold}
              placeholderTextColor="#B0B0B0"
            />
          )}
          name="title"
        />
        {errors.title && (
          <Text style={styles.errorText}>This is required.</Text>
        )}

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.contentContainer}>
              <TextInput
                multiline
                placeholder="Enter note content"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.contentInput}
                placeholderTextColor="#B0B0B0"
              />
              {/* Display the Markdown content */}
              {/* <Markdown >
                {value}
              </Markdown> */}
            </View>
          )}
          name="content"
        />
        <Controller
          control={control}
          rules={{
            required: true,
            validate: (value) =>
              (value >= -90 && value <= 90) ||
              "Latitude must be between -90 and 90",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter latitude"
              onBlur={onBlur}
              onChangeText={(val) => {
                // Ensure only valid characters are input
                if (/^-?\d*\.?\d*$/.test(val)) {
                  onChange(val); // Update the field value only if the regex passes
                }
              }}
              value={value !== undefined ? String(value) : ""}
              style={styles.input}
              placeholderTextColor="#B0B0B0"
            />
          )}
          name="latitude"
        />
        {errors.latitude && (
          <Text style={styles.errorText}>{errors.latitude.message}</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
            validate: (value) =>
              (value >= -180 && value <= 180) ||
              "Longitude must be between -180 and 180",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter longitude"
              onBlur={onBlur}
              onChangeText={(val) => {
                // Ensure only valid characters are input
                if (/^-?\d*\.?\d*$/.test(val)) {
                  onChange(val); // Update the field value only if the regex passes
                }
              }}
              value={value !== undefined ? String(value) : ""}
              style={styles.input}
              placeholderTextColor="#B0B0B0"
            />
          )}
          name="longitude"
        />
        {errors.longitude && (
          <Text style={styles.errorText}>{errors.longitude.message}</Text>
        )}

        <Controller
          control={control}
          rules={{ required: false }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter tags (comma-separated)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.errorText}
              placeholderTextColor="#B0B0B0"
            />
          )}
          name="tags"
        />
        {errors.tags && <Text style={styles.errorText}>This is required.</Text>}

        {/* Bottom Button Row */}
        <View style={styles.buttonRow}>
          <Pressable onPress={closeModal} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
    backgroundColor: "rgba(18, 18, 18, 0.95)", // Dark, semi-transparent background
  },
  input: {
    borderWidth: 0, // No borders for minimalist look
    padding: 10,
    marginBottom: 10,
    color: "#FFFFFF", // White text
    backgroundColor: "#1E1E1E", // Dark background for input fields
    fontFamily: "PN", // Regular font
    fontSize: 16,
  },
  inputBold: {
    borderWidth: 0, // No borders for minimalist look
    padding: 10,
    marginBottom: 10,
    color: "#FFFFFF", // White text
    backgroundColor: "#1E1E1E", // Dark background for input fields
    fontFamily: "PNB", // Bold font
    fontSize: 16,
  },
  contentInput: {
    borderWidth: 0, // No borders
    padding: 15,
    marginBottom: 20,
    color: "#FFFFFF", // White text
    backgroundColor: "#1E1E1E", // Dark background
    fontFamily: "PN", // Regular font
    fontSize: 16,
    flex: 3, // Make content section take up more space
    textAlignVertical: "top", // Align text to top
    height: 150, // Height of the content field
  },
  latLongContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 3,
  },
  markdown: {
    color: "#FFFFFF",
  },
  latLongInput: {
    borderWidth: 0, // No borders
    padding: 10,
    marginBottom: 10,
    color: "#FFFFFF", // White text
    backgroundColor: "#1E1E1E", // Dark background
    fontFamily: "PN", // Regular font
    fontSize: 16,
    flex: 1, // Evenly distribute latitude and longitude fields
    marginRight: 10, // Space between latitude and longitude
  },
  errorText: {
    color: "#FF3B30", // Red error text
    fontFamily: "SpaceMono", // Monospace font
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    padding: 15,
    backgroundColor: "#666666", // Grey background for cancel button
    borderRadius: 30,
    flex: 1,
    marginRight: 10, // Space between Cancel and Save
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFFFFF", // White text on Cancel button
    fontFamily: "PNB", // Bold font
    fontSize: 16,
  },
  submitButton: {
    padding: 15,
    backgroundColor: "#FF3B30", // Red background for submit button
    borderRadius: 30,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF", // White text on Save button
    fontFamily: "PNB", // Bold font
    fontSize: 16,
  },
});
