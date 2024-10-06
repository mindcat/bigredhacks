import { Modal, TextInput, Text, Pressable } from "react-native";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Note from "@/types/Note";

export default function LocationInputPage(props: any) {
  const { modalVisible } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Note>({
    defaultValues: {
      title: "",
      content: "",
      latitude: 0,
      longitude: 0,
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

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={false}
      className="h-full flex justify-center items-center bg-white"
    >
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
            value={value.toString()}
            className="border p-2 mb-4 w-3/4"
          />
        )}
        name="title"
      />
      {errors.title && (
        <Text className="text-red-500 mb-4">This is required.</Text>
      )}

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
            className="border p-2 mb-4 w-3/4"
          />
        )}
        name="content"
      />
      {errors.content && (
        <Text className="text-red-500 mb-4">This is required.</Text>
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
            value={value.toString()}
            className="border p-2 mb-4 w-3/4"
          />
        )}
        name="latitude"
      />
      {errors.latitude && (
        <Text className="text-red-500 mb-4">This is required.</Text>
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
            value={value.toString()}
            className="border p-2 mb-4 w-3/4"
          />
        )}
        name="longitude"
      />
      {errors.longitude && (
        <Text className="text-red-500 mb-4">This is required.</Text>
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
            className="border p-2 mb-4 w-3/4"
          />
        )}
        name="tags"
      />
      {errors.tags && (
        <Text className="text-red-500 mb-4">This is required.</Text>
      )}
      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="bg-blue-500 p-2 rounded"
      >
        <Text className="text-white">Submit</Text>
      </Pressable>
    </Modal>
  );
}
