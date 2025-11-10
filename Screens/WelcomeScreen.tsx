import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native"
import { RootStackParamList } from "../type";
// Define the props for this screen
type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;



export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/1200x/90/7e/ef/907eefc0a9baa44ab6bb78ad5d487c9d.jpg?auto=compress&cs=tinysrgb&w=1200",
        }}
        style={styles.bg}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Chef Christoffel Menu</Text>
          <Text style={styles.subtitle}>
             Choose your meals of choice right on your phone 👨‍🍳

          </Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.btnText}>View Menu</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
// Styles for the WelcomeScreen 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#faf4f1ff" },
  bg: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: {
    backgroundColor: "rgba(18,16,15,0.7)",
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#f5e9d7",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#f2f1dbff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  btn: {
    backgroundColor: "#96904cff",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  btnText: { color: "#faf4f1ff", fontWeight: "900", fontSize: 16 },

  // If you have other components
  card: { backgroundColor: "#f7f2f0ff", borderRadius: 16, marginVertical: 8 },
  text: { color: "#f5e9d7" },
  meta: { color: "#f2f1dbff", fontSize: 12, opacity: 0.7 },
  accent: { color: "#96904cff" },
});
