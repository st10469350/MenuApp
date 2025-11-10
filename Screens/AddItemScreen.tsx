import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MenuItem, Course, RootStackParamList } from "../type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// Props type for this screen, includes navigation and addItem function
type Props = NativeStackScreenProps<RootStackParamList, "AddItem"> & {
  addItem: (item: MenuItem) => void;
};
// Generate a unique id for each menu item
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
// Main AddItemScreen component
export default function AddItemScreen({ navigation, addItem }: Props) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Course>("Starters");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
// State variables for form fields
  const onSave = () => {
    if (!itemName || !description || !price || !image) {
      Alert.alert("Missing fields", "Please fill in all fields");
      return;
    }

    const p = parseFloat(price);
    if (isNaN(p) || p <= 0) {
      Alert.alert("Invalid price", "Enter a valid number");
      return;
    }
     // Determine intensity based on price
    const intensity: MenuItem["intensity"] =
      p < 60 ? "Mild" : p < 100 ? "Balanced" : "Strong";

    const payload: MenuItem = {
      id: uid(),
      itemName,
      description,
      category,
      price: p,
      intensity,
      image,
      ingredients: ingredients
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
   // Add the item using the prop function
    addItem(payload);
    // Go back to the previous screen
    navigation.goBack();
  };
 // KeyboardAvoidingView adjusts layout when keyboard is open
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.header}>Add Menu Item</Text>

          <TextInput
            style={styles.input}
            placeholder="Item Name"
            placeholderTextColor="#161615ff"
            value={itemName}
            onChangeText={setItemName}
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#161615ff"
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.pickerWrap}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={category}
                onValueChange={(v) => setCategory(v as Course)}
                dropdownIconColor="#878c3bff"
                style={styles.picker}
              >
                <Picker.Item label="Starters" value="Starters" color="#000000" />
                <Picker.Item label="Main Course" value="Main Course" color="#000000" />
                <Picker.Item label="Dessert" value="Dessert" color="#000000" />
                <Picker.Item label="Beverage" value="Beverage" color="#000000" />
              </Picker>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Price"
            placeholderTextColor="#161615ff"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <TextInput
            style={styles.input}
            placeholder="Ingredients (comma separated)"
            placeholderTextColor="#161615ff"
            value={ingredients}
            onChangeText={setIngredients}
          />

          <TextInput
            style={styles.input}
            placeholder="Image "
            placeholderTextColor="#161615ff"
            value={image}
            onChangeText={setImage}
          />

          {image ? <Image source={{ uri: image }} style={styles.preview} /> : null}

          <TouchableOpacity style={styles.save} onPress={onSave}>
            <Text style={styles.saveText}>Save Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancel}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
// Styles for the form and inputs
const styles = StyleSheet.create({
  form: { backgroundColor: "#ffffffff", padding: 20 },
  header: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#f7f8e5ff",
    color: "#000000",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#161615ff",
    height: 50,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  pickerWrap: { marginVertical: 8 },
  label: { color: "#161615ff", marginLeft: 4, marginBottom: 6, fontWeight: "700" },
  pickerBox: {
    backgroundColor: "#e7e7ddff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#161615ff",
    overflow: "hidden",
    height: 50,
    justifyContent: "center",
  },
  picker: { color: "#000000", height: 50, width: "100%" },
  preview: { width: "100%", height: 200, borderRadius: 12, marginTop: 12 },
  save: {
    backgroundColor: "#898949ff",
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
  },
  saveText: { color: "#363631ff", fontWeight: "900" },
  cancel: { color: "#97975aff",alignItems: "center", marginTop: 10 },
  cancelText: { color: "#161615ff", fontWeight: "800" },
});
