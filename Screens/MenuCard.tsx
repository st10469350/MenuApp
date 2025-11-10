import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MenuItems } from "../type";

export default function MenuCard({
  item,
  onPress,
  onRemove,
}: {
  item: MenuItems;
  onPress: () => void;
  onRemove?: () => void;
}) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
        <Image source={{ uri: item.image || "https://via.placeholder.com/150" }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.itemName}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.meta}>{item.category} · R{item.price}</Text>
        </View>
      </TouchableOpacity>

      {onRemove && (
        <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", borderRadius: 12, marginVertical: 8, overflow: "hidden", elevation: 3 },
  image: { width: "100%", height: 180 },
  content: { padding: 10 },
  title: { fontSize: 18, fontWeight: "bold", color: "#4b2e05" },
  desc: { color: "#6e5d47", fontSize: 14 },
  meta: { color: "#8a6f52", fontSize: 13, marginTop: 4 },
  removeBtn: { backgroundColor: "#b85c38", padding: 6, borderRadius: 8, alignItems: "center", margin: 10 },
  removeText: { color: "#fff", fontWeight: "bold" },
});

