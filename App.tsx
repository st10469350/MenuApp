import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import { RootStackParamList, MenuItems } from "./type";

const predefinedItems: MenuItems[] = [
  {
    itemName: "Chilled Melon and Prosciutto",
    description: "A simple, elegant balance of sweet and salty.",
    category: "Starter",
    price: 80,
    intensity: "Average.R5",
    image:
      "https://images.pexels.com/photos/8922194/pexels-photo-8922194.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Cantaloupe", "prosciutto", "fresh mint", "black pepper", "balsamic glaze"],
  },
  {
    itemName: "Heirloom Tomato and Burrata Caprese",
    description: "A creamy, fresh salad bursting with summer flavors.",
    category: "Starter",
    price: 67,
    intensity: "Average.R6",
    image:
      "https://images.pexels.com/photos/27964906/pexels-photo-27964906.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Heirloom tomatoes", "burrata cheese", "fresh basil", "extra virgin olive oil", "flaky sea salt"],
  },
  {
    itemName: "Baked Camembert with Garlic and Rosemary",
    description: "Decadent, molten baked cheese, perfect for sharing.",
    category: "Starter",
    price: 78,
    intensity: "Average.R5",
    image:
      "https://images.pexels.com/photos/19863259/pexels-photo-19863259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Camembert wheel", "garlic cloves", "fresh rosemary", "baguette", "apple slices"],
  },
  {
    itemName: "Crispy Fried Calamari",
    description: "Tender, golden-fried squid with a zesty dip.",
    category: "Starter",
    price: 145,
    intensity: "Average.R3",
    image: "https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg",
    ingredients: ["Squid rings", "flour", "paprika", "lemon", "aioli", "vegetable oil"],
  },
  {
    itemName: "Prawn Cocktail",
    description: "A refreshing, retro classic with a creamy pink sauce.",
    category: "Starter",
    price: 65,
    intensity: "Average.R7",
    image:
      "https://images.pexels.com/photos/16741148/pexels-photo-16741148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Prawns", "lettuce", "mayonnaise", "ketchup", "lemon juice"],
  },
  {
    itemName: "Herb-Crusted Roast Chicken",
    description: "Juicy, whole roasted chicken with a crispy, flavorful herb skin.",
    category: "MainCourse",
    price: 165,
    intensity: "Average.R4",
    image:
      "https://images.pexels.com/photos/4083585/pexels-photo-4083585.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Whole chicken", "rosemary", "thyme", "garlic", "lemon", "olive oil", "salt", "pepper"],
  },
  {
    itemName: "Classic Beef Burger",
    description: "A juicy, hand-formed patty served on a soft, toasted bun.",
    category: "MainCourse",
    price: 140,
    intensity: "Average.R5",
    image:
      "https://images.pexels.com/photos/30500756/pexels-photo-30500756.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Ground beef", "burger buns", "lettuce", "tomato", "onion", "cheese", "pickles", "condiments"],
  },
  {
    itemName: "Spaghetti Bolognese",
    description: "A hearty, classic Italian meat sauce served over long pasta.",
    category: "MainCourse",
    price: 85,
    intensity: "Average.R4",
    image:
      "https://images.pexels.com/photos/32632540/pexels-photo-32632540.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Spaghetti", "ground beef", "tomatoes", "onion", "carrots", "celery", "red wine", "Parmesan"],
  },
  {
    itemName: "Vegetable Stir-Fry",
    description: "A quick, healthy, and colorful mix of crisp-tender vegetables.",
    category: "MainCourse",
    price: 145,
    intensity: "Average.R4",
    image:
      "https://images.pexels.com/photos/4569049/pexels-photo-4569049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Bell peppers", "broccoli", "carrots", "snap peas", "soy sauce", "garlic", "ginger", "tofu or chicken"],
  },
  {
    itemName: "Classic Chocolate Brownie",
    description: "Dense, fudgy, and rich chocolate squares.",
    category: "Dessert",
    price: 55,
    intensity: "Average.R4",
    image:
      "https://images.pexels.com/photos/5386677/pexels-photo-5386677.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Chocolate", "butter", "sugar", "eggs", "flour", "cocoa powder", "walnuts"],
  },
  {
    itemName: "Tiramisu",
    description: "An iconic Italian no-bake dessert of coffee-soaked layers and mascarpone.",
    category: "Dessert",
    price: 79,
    intensity: "Average.R4",
    image:
      "https://images.pexels.com/photos/27305272/pexels-photo-27305272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Ladyfingers", "mascarpone", "coffee", "eggs", "sugar", "cocoa powder"],
  },
  {
    itemName: "Fresh Fruit Tart",
    description: "A buttery pastry crust filled with custard and topped with glossy fruit",
    category: "Dessert",
    price: 64,
    intensity: "Average.R4",
    image:
      "https://images.pexels.com/photos/12702316/pexels-photo-12702316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Pastry crust", "pastry cream", "strawberries", "kiwi", "blueberries", "apricot glaze"],
  },
  {
    itemName: "Cucumber Cooler",
    description: "An incredibly fresh, light, and hydrating spa-style drink",
    category: "Beverage",
    price: 74,
    intensity: "Average.R3",
    image:
      "https://images.pexels.com/photos/5335918/pexels-photo-5335918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Cucumber", "lime", "mint", "soda water", "ice", "simple syrup"],
  },
  {
    itemName: "Hot Chocolate",
    description: "A rich, creamy, and comforting warm drink",
    category: "Beverage",
    price: 45,
    intensity: "Average.R3",
    image:
      "https://images.pexels.com/photos/19271883/pexels-photo-19271883.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Milk", "dark chocolate", "sugar", "whipped cream", "cocoa powder"],
  },
  {
    itemName: "Iced Matcha Latte",
    description: "A vibrant, earthy, and creamy Japanese-inspired drink.",
    category: "Beverage",
    price: 58,
    intensity: "Average.R3",
    image:
      "https://images.pexels.com/photos/34334424/pexels-photo-34334424.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Matcha powder", "milk", "honey or sugar", "ice"],
  },
];



// ManageMenuScreen: Component for adding new menu items to the system
function ManageMenuScreen(
  props: NativeStackScreenProps<RootStackParamList, "ManageScreen">
) {
  // State variables to hold the form input values
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("Beverage");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");

  // Handle form submission
  const handleSubmit = () => {
    // Check if all fields are filled
    if (itemName.trim() && description.trim() && category && price.trim()) {
      const priceValue = parseFloat(price);
      // Validate price
      if (!isNaN(priceValue) && priceValue > 0) {
        // Determine intensity based on price value
        const intensity =
          priceValue < 45 ? "Mild" : priceValue < 65 ? "Balanced" : "Strong";
        
        // Create a new menu item object
        const newItem: MenuItems = {
          itemName: itemName.trim(),
          description: description.trim(),
          category,
          price: priceValue,
          intensity,
          image: image.trim() || null,
          ingredients:
            ingredients.trim() === ""
              ? [] // Empty ingredients will be set as an empty array
              : ingredients.split(",").map((i) => i.trim()), // Split comma-separated ingredients
        };
        
        // Add the new item to the existing list and navigate back
        props.route.params.setItems([...props.route.params.items, newItem]);
        props.navigation.goBack();
      } else {
        // Show alert if price is invalid
        Alert.alert("Invalid Price", "Price must be a number greater than 0");
      }
    } else {
      // Show alert if any required field is empty
      Alert.alert("Missing Fields", "Please fill out all required details before saving.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          {/* Header */}
          <Text style={styles.formHeader}>Add a New item to the menu</Text>
          
          {/* Input fields */}
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={itemName}
            onChangeText={setItemName}
          />
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Description"
            multiline
            value={description}
            onChangeText={setDescription}
          />
          
          {/* Category Picker */}
          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(value) => {
                  setCategory(String(value)); // Update category state
                }}
                mode="dropdown"
                style={styles.pickerStyle}
              >
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main Course" value="MainCourse" />
                <Picker.Item label="Dessert" value="Dessert" />
                <Picker.Item label="Beverage" value="Beverage" />
              </Picker>
            </View>
          </View>
          
          {/* Other input fields */}
          <TextInput
            style={styles.input}
            placeholder="Price (e.g. 50)"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            style={styles.input}
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChangeText={setIngredients}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={image}
            onChangeText={setImage}
          />
          
          {/* Image preview */}
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.imagePreview}
            />
          ) : null}
          
          {/* Save button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save Item</Text>
          </TouchableOpacity>
          
          {/* Back button */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
// HomeScreen: Displays the list of menu items with an option to remove them
function HomeScreen(
  props: NativeStackScreenProps<RootStackParamList, "HomeScreen">
) {
  const [items, setItems] = useState<MenuItems[]>(predefinedItems);

  // Function to handle item removal
  const removeItem = (index: number) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: () => setItems((prev) => prev.filter((_, i) => i !== index)),
      },
    ]);
  };

  // Calculate total price
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Chef Christoffel Menu</Text>
      <Text style={styles.subtitle}>Starters, Main Courses, Desserts, Beverages</Text>

      {/* 👇 Display total price here */}
      <Text style={styles.totalText}>Total Menu Price: R{totalPrice.toFixed(2)}</Text>

      <FlatList
        data={items}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.cardImage} />
            ) : (
              <View style={[styles.cardImage, { justifyContent: "center", alignItems: "center" }]}>
                <Text>No image</Text>
              </View>
            )}
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.itemName}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <Text style={styles.cardMeta}>
                {item.category} · R{item.price} · {item.intensity}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(index)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => props.navigation.navigate("ManageScreen", { items, setItems })}
      >
        <Text style={styles.addText}>Add New Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
// WelcomeScreen: Displays the welcome screen with a navigation option to HomeScreen
function WelcomeScreen(
  props: NativeStackScreenProps<RootStackParamList, "WelcomeScreen">
) {
  const { navigation } = props;
  return (
    <SafeAreaView style={styles.welcomeContainer}>
      {/* Hero image */}
      <Image
        source={{
          uri: "https://i.pinimg.com/1200x/90/7e/ef/907eefc0a9baa44ab6bb78ad5d487c9d.jpg",
        }}
        style={styles.heroImage}
        resizeMode="cover"
      />
      
      {/* Overlay with title and description */}
      <View style={styles.overlay}>
        <Text style={styles.welcomeTitle}>Welcome to Chef Christoffel Menu</Text>
        <Text style={styles.welcomeText}>
          Choose your meals of choice right on your phone 😁
        </Text>
        
        {/* Start button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={styles.startText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Main App component with stack navigation
export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageScreen"
          component={ManageMenuScreen}
          options={{
            title: "Add Menu Item",
            headerStyle: { backgroundColor: "#977a3fff" },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// Styles for the components
const styles = StyleSheet.create({
  welcomeContainer: { flex: 1, backgroundColor: "#75663aff" },
  heroImage: { width: "100%", height: "100%", position: "absolute" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  welcomeTitle: {
    color: "#8c8d46ff",
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  welcomeText: {
    color: "#939052ff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: "#919068ff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  startText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  container: { flex: 1, backgroundColor: "#efebe9", padding: 15 },
  mainTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#75663aff",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#646237ff",
    marginBottom: 15,
    fontSize: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginVertical: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: { width: "100%", height: 220 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 20, fontWeight: "700", color: "#624529ff" },
  cardDesc: { color: "#75663aff", fontSize: 14, marginVertical: 5 },
  cardMeta: { color: "#5a582dff", fontSize: 13 },
  removeButton: {
backgroundColor: "#562f0357",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  removeText: { color: "#fff", fontWeight: "bold" },
  addButton: {
    backgroundColor: "#624529ff",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    elevation: 4,
  },
  addText: { color: "#5d5027ff", fontSize: 18, fontWeight: "bold" },
  formContainer: { backgroundColor: "#f5f5f5", padding: 20 },
  formHeader: {
    fontSize: 24,
    color: "#624529ff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#636033ff",
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 50,
    justifyContent: "center",
    marginVertical: 8,
  },
  pickerWrapper: { marginVertical: 10 },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#847948ff",
    marginBottom: 6,
 marginLeft: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#706e44ff",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: 50,
    justifyContent: "center",
  },
  pickerStyle: {
    height: 50,
    width: "100%",
    color: "#847948ff",
    fontSize: 15,
  },
  imagePreview: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginTop: 15,
  },
  saveButton: {
    backgroundColor: "#847948ff",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
 saveButtonText: { color: "#525028ff", fontWeight: "bold", fontSize: 16 },
  cancelButton: { alignItems: "center", marginTop: 10 },
  cancelButtonText: { color: "#85673bff", fontWeight: "bold" },

    checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  filterButton: {
    backgroundColor: "#847948ff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  totalText: {
  fontSize: 16,
  fontWeight: "600",
  color: "#5b591aff",
  textAlign: "center",
  marginBottom: 10,
},


});


//Code ATTRIBUTION//
//TITEL :IIE Module Manule 2025//
//AUTHOR:The Independent Institute of Education (pty)Ltd//
//Date:18/10/2025//
//VERSION: First Edition//
//AVALIABLE:https://advtechonline.sharepoint.com/:w:/r/sites/TertiaryStudents/_layouts/15/Doc.aspx?sourcedoc=%7BC4AAF478-96AC-4469-8005-F7CDC4A15EBB%7D&file=MAST5112MM.docx&action=default&mobileredirect=true//


