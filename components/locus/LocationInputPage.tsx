import Location from "@/types/Location";
import { callApiUpsertLocation } from "@/utils/api";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface LocationInputPageProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  location?: Location;
}

export default function LocationInputPage({
  modalVisible,
  setModalVisible,
  location,
}: LocationInputPageProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Location>({
    defaultValues:
      location !== undefined
        ? location
        : {
            title: "",
            content: "",
            latitude: parseFloat(global.currentLat.toFixed(6)),
            longitude: parseFloat(global.currentLong.toFixed(6)),
            tags: "",
          },
  });

  const onSubmit: SubmitHandler<Location> = (data) => {
    console.log(data);
    const { title, content, latitude, longitude, tags } = data;
    const newLocation = {
      timestamp: Date.now(), // last used
      title,
      content,
      latitude,
      longitude,
      tags,
    };
    callApiUpsertLocation(newLocation, location?.timestamp);
    setModalVisible(false);
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
      <KeyboardAvoidingView behavior={"height"} style={styles.modalContainer}>
        <Text style={styles.title}>New Memory</Text>
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
          rules={{ required: false }}
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

        <View style={styles.row}>
          <Controller
            control={control}
            rules={{
              required: false,
              validate: (value) =>
                (value >= -90 && value <= 90) ||
                "Latitude must be between -90 and 90",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={global.currentLat.toFixed(6)}
                onBlur={onBlur}
                onChangeText={(val) => {
                  // Ensure only valid characters are input
                  if (/^-?\d*\.?\d*$/.test(val)) {
                    onChange(val); // Update the field value only if the regex passes
                  }
                }}
                value={
                  value !== undefined
                    ? String(value)
                    : global.currentLat.toFixed(6)
                }
                style={styles.inputNum}
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
              required: false,
              validate: (value) =>
                (value >= -180 && value <= 180) ||
                "Longitude must be between -180 and 180",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={global.currentLong.toFixed(6)}
                onBlur={onBlur}
                onChangeText={(val) => {
                  // Ensure only valid characters are input
                  if (/^-?\d*\.?\d*$/.test(val)) {
                    onChange(val); // Update the field value only if the regex passes
                  }
                }}
                value={
                  value !== undefined
                    ? String(value)
                    : global.currentLong.toFixed(6)
                }
                style={styles.inputNum}
                placeholderTextColor="#B0B0B0"
              />
            )}
            name="longitude"
          />
          {errors.longitude && (
            <Text style={styles.errorText}>{errors.longitude.message}</Text>
          )}
        </View>

        <Controller
          control={control}
          rules={{ required: false }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter tag"
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
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
    borderRadius: 24,
    backgroundColor: "rgba(25, 25, 25, 1)", // Dark, semi-transparent background
  },
  input: {
    borderWidth: 0, // No borders for minimalist look
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: "#FFFFFF", // White text
    backgroundColor: "#1E1E1E", // Dark background for input fields
    fontFamily: "PN", // Regular font
    fontSize: 16,
  },
  inputNum: {
    borderWidth: 0, // No borders for minimalist look
    padding: 10,
    marginBottom: 10,
    color: "#FFFFFF", // White text
    fontFamily: "PN", // Regular font
    fontSize: 16,
    overflow: "hidden", // Hide any overflow text
  },
  inputBold: {
    borderRadius: 8,
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
    borderRadius: 8,
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
    padding: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
  title: {
    fontSize: 36,
    marginBottom: 10,
    color: "#FFFFFF", // White text for titles
    fontFamily: "PN", // Use Poltawski Nowy font for the title
  },
});
