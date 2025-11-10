import React from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MenuItem, RootStackParamList } from "../type";
// Props type for this screen (navigation, items, remove function, averages)
type Props = NativeStackScreenProps<RootStackParamList, "Home"> & {
  items: MenuItem[];
  removeItem: (id: string) => void;
  averages: {
    Starters: string;
    "Main Course": string;
    Dessert: string;
    Beverage: string;
  };
};

export default function HomeScreen({
  navigation,
  items,
  removeItem,
  averages,
}: Props) {
  const confirmRemove = (id: string) => {
    Alert.alert("Remove Item", "Do you want to remove this menu item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => removeItem(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Our Menu ({items.length})</Text>

      /* Average prices by category */
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Starters</Text>
          <Text style={styles.statValue}>R {averages.Starters}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Main Course</Text>
          <Text style={styles.statValue}>R {averages["Main Course"]}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Dessert</Text>
          <Text style={styles.statValue}>R {averages.Dessert}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Beverage</Text>
          <Text style={styles.statValue}>R {averages.Beverage}</Text>
        </View>
      </View>

      /* Menu items list */
      <FlatList
        data={items}
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
              <TouchableOpacity
                style={styles.remove}
                onPress={() => confirmRemove(item.id)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      /* Floating action buttons */
      <View style={styles.fabs}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("AddItem")}
        >
          <Text style={styles.fabText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.fab, styles.fabAlt]}
          onPress={() => navigation.navigate("Filter", { items })}
        >
          <Text style={styles.fabText}>Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


// Styles for the HomeScreen
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffff4ff", padding: 16 },
  heading: {
    color: "#31302eff",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  stat: {
    backgroundColor: "#f2f6ceff",
    width: "48%",
    borderRadius: 14,
    paddingVertical: 10,
    marginVertical: 4,
    alignItems: "center",
    elevation: 3,
  },
  statLabel: { color: "#5a5e31ff", fontSize: 12 },
  statValue: { color: "#31302eff", fontSize: 16, fontWeight: "800" },
  card: {
    backgroundColor: "#f2f6ceff",
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 8,
    elevation: 4,
  },
  image: { width: "100%", height: 200 },
  body: { padding: 12 },
  title: { color: "#31302eff", fontSize: 18, fontWeight: "800" },
  desc: { color: "#5a5e31ff", marginVertical: 6 },
  meta: { color: "#31302eff", fontSize: 12, opacity: 0.7 },
  remove: {
    backgroundColor: "#d3cd96ff",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  removeText: { color: "#31302eff", fontWeight: "800" },
  fabs: {
    position: "absolute",
    right: 20,
    bottom: 20,
    flexDirection: "row",
    gap: 12,
  },
  fab: {
    backgroundColor: "#48462cff",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 30,
    elevation: 6,
  },
  fabAlt: { backgroundColor: "#857f34ff" },
  fabText: { color: "#fdfdf7ff", fontWeight: "900" },
});

//CODE ATTRIBUTION//
//PRIMARY SOURCE: IIE Module Manual 2025
//TITLE: IIE Module Manual 2025
//AUTHOR: The Independent Institute of Education (Pty) Ltd
//DATE: 18/10/2025
//VERSION: First Edition
//AVAILABLE: https://advtechonline.sharepoint.com/:w:/r/sites/TertiaryStudents/IIE%20Student%20Materials/New%20Student%20Materials%20CAT/WEDE5020/2025/Term%202/WEDE5020MM.docx?d=w2d7589e9374b43de9596ef35d83ebd02&csf=1&web=1&e=Fg8mH2


//PRIMARY SOURCE: W3Schools TypeScript Tutorials
//TITLE: W3Schools - TypeScript Tutorial
//AUTHOR: W3Schools
//DATE: 10/11/2025
//VERSION: Current Online Version
//AVAILABLE: https://www.w3schools.com/typescript/

//PRIMARY SOURCE: GeeksforGeeks TypeScript Resources
//TITLE: GeeksforGeeks - TypeScript Programming Resources
//AUTHOR: GeeksforGeeks
//DATE: 10/11/2025
//VERSION: Current Online Version
//AVAILABLE: https://www.geeksforgeeks.org/typescript-tutorials/

