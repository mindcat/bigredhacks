import { StyleSheet, Modal, TextInput, Text, Pressable } from "react-native";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Note from "@/types/Note";

export default function LocationInputPage(props: any) {
  const { modalVisible, setModalVisible } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Note>({
    defaultValues: {
      title: "",
      content: "",
      latitude: "",
      longitude: "",
      tags: "",
    },
  });

  const onSubmit: SubmitHandler<Note> = (data) => {
    console.log(data);
    const { title, content, latitude, longitude, tags } = data;
    const newNote = {
      id: Date.now(),
      timestamp: Date.now(), // Add timestamp property
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
      transparent={false}
      style={styles.modal}
    >
      <Pressable onPress={closeModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </Pressable>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Enter location title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="title"
      />
      {errors.title && <Text style={styles.errorText}>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            multiline
            placeholder="Enter note content"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="content"
      />
      {errors.content && (
        <Text style={styles.errorText}>This is required.</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Enter latitude"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="latitude"
      />
      {errors.latitude && (
        <Text style={styles.errorText}>This is required.</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Enter longitude"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="longitude"
      />
      {errors.longitude && (
        <Text style={styles.errorText}>This is required.</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Enter tags (comma-separated)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="tags"
      />
      {errors.tags && <Text style={styles.errorText}>This is required.</Text>}
      <Pressable onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
