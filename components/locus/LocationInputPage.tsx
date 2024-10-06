import { StyleSheet, Modal, TextInput, Text, Pressable, View } from "react-native";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Note from "@/types/Note";

export default function LocationInputPage(props: any) {
  const { modalVisible, setModalVisible } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Note>();

  const onSubmit: SubmitHandler<Note> = (data) => {
    console.log(data);
    const { title, content, latitude, longitude, tags } = data;
    const newNote = {
      id: Date.now(),
      timestamp: Date.now(), // last used
      title,
      content,
      latitude: latitude, // Parse latitude and longitude to numbers
      longitude: longitude,
      tags: tags, // Split comma-separated tags into an array
    };
    // TODO: serialize into JSON and save to Pinata
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}  // Ensures modal is transparent
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
              style={styles.input}
              placeholderTextColor="#B0B0B0"
            />
          )}
          name="title"
        />
        {errors.title && <Text style={styles.errorText}>This is required.</Text>}

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              placeholder="Enter note content"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholderTextColor="#B0B0B0"
            />
          )}
          name="content"
        />
        {errors.content && <Text style={styles.errorText}>This is required.</Text>}

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter latitude"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholderTextColor="#B0B0B0"
            />
          )}
          name="latitude"
        />
        {errors.latitude && <Text style={styles.errorText}>This is required.</Text>}

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter longitude"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholderTextColor="#B0B0B0"
            />
          )}
          name="longitude"
        />
        {errors.longitude && <Text style={styles.errorText}>This is required.</Text>}

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter tags (comma-separated)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
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
          <Pressable onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Save Experience</Text>
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