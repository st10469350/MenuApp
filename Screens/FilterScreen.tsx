import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MenuItem, RootStackParamList, Course } from "../type";
// Props type for this screen (navigation + route)
type Props = NativeStackScreenProps<RootStackParamList, "Filter">;


 

export default function FilterScreen({ route }: Props) {
  const items = route.params?.items ?? [];
  const [selected, setSelected] = useState<Course | "All">("All");
  // Filter items based on the selected category
  const filtered =
    selected === "All" ? items : items.filter((i) => i.category === selected);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Filter Menu</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selected}
          onValueChange={(value) => setSelected(value)}
          dropdownIconColor={"#232322ff"}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Starters" value="Starters" />
          <Picker.Item label="Main Course" value="MainCourse" />
          <Picker.Item label="Dessert" value="Dessert" />
          <Picker.Item label="Beverage" value="Beverage" />
        </Picker>
      </View>
      
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.body}>
              <Text style={styles.title}>{item.itemName}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.meta}>
                {item.category} · R{item.price} · {item.intensity}
              </Text>
            </View>
          </View>
        )}
        // Message when there are no items in selected category
        ListEmptyComponent={
          <Text style={styles.empty}>No items in this category</Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
}
// Styles for the screen
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#deded6ff", padding: 16 },
  heading: {
    color: "#232322ff",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  pickerContainer: {
    backgroundColor: "#cecfaaff",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
  },
  picker: {
    color: "#232322ff",
    backgroundColor: "#cecfaaff",
  },
  card: {
    backgroundColor: "#cecfaaff",
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 8,
  },
  image: { width: "100%", height: 200 },
  body: { padding: 12 },
  title: { color: "#232322ff", fontSize: 18, fontWeight: "800" },
  desc: { color: "#363432ff", marginVertical: 6 },
  meta: { color: "#232322ff", fontSize: 12, opacity: 0.7 },
  empty: {
    color: "#363432ff",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
