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

// Predefined menu items data - acts as initial database for the app
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
/**
 * ManageMenuScreen Component
 * Screen for adding new menu items with form validation
 * Allows chef to input item details and save to the menu
 */

