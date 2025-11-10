import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuItem, Course, RootStackParamList } from "./type";
import WelcomeScreen from "./Screens/WelcomeScreen";
import HomeScreen from "./Screens/HomeScreen";
import AddItemScreen from "./Screens/AddItemScreen";
import FilterScreen from "./Screens/FilterScreen";
// Create a stack navigator with typed params
const Stack = createNativeStackNavigator<RootStackParamList>();
// Predefined sample menu items for the app
const predefined: MenuItem[] = [
  {
    id: "1",
    itemName: "Chilled Melon and Prosciutto",
    description: "A simple, elegant balance of sweet and salty.",
    category: "Starters",
    price: 80,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/8922194/pexels-photo-8922194.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: [
      "Cantaloupe",
      "prosciutto",
      "fresh mint",
      "black pepper",
      "balsamic glaze",
    ],
  },
  {
    id: "2",
    itemName: "Heirloom Tomato and Burrata Caprese",
    description: "A creamy, fresh salad bursting with summer flavors.",
    category: "Starters",
    price: 67,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/27964906/pexels-photo-27964906.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: [
      "Heirloom tomatoes",
      "burrata cheese",
      "fresh basil",
      "extra virgin olive oil",
      "flaky sea salt",
    ],
  },
  {
    id: "3",
    itemName: "Baked Camembert with Garlic and Rosemary",
    description: "Decadent, molten baked cheese, perfect for sharing.",
    category: "Starters",
    price: 78,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/19863259/pexels-photo-19863259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: [
      "Camembert wheel",
      "garlic cloves",
      "fresh rosemary",
      "baguette",
      "apple slices",
    ],
  },
  {
    id: "4",
    itemName: "Prawn Cocktail",
    description: "A refreshing, retro classic with a creamy pink sauce.",
    category: "Starters",
    price: 65,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/16741148/pexels-photo-16741148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Prawns", "lettuce", "mayonnaise", "ketchup", "lemon juice"],
  },
  {
    id: "5",
    itemName: "Herb-Crusted Roast Chicken",
    description:"Juicy, whole roasted chicken with a crispy, flavorful herb skin.",
    category: "MainCourse",
    price: 165,
    intensity: "Balanced",
    image:
      "https://images.pexels.com/photos/4083585/pexels-photo-4083585.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: [
      "Whole chicken",
      "rosemary",
      "thyme",
      "garlic",
      "lemon",
      "olive oil",
      "salt",
      "pepper",
    ],
  },
  {
    id: "6",
    itemName: "Classic Beef Burger",
    description: "A juicy, hand-formed patty served on a soft, toasted bun.",
    category: "MainCourse",
    price: 140,
    intensity: "Balanced",
    image:
      "https://images.pexels.com/photos/30500756/pexels-photo-30500756.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: [
      "Ground beef",
      "burger buns",
      "lettuce",
      "tomato",
      "onion",
      "cheese",
      "pickles",
      "condiments",
    ],
  },
  {
    id: "7",
    itemName: "Spaghetti Bolognese",
    description: "A hearty, classic Italian meat sauce served over long pasta.",
    category: "MainCourse",
    price: 85,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/32632540/pexels-photo-32632540.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: [
      "Spaghetti",
      "ground beef",
      "tomatoes",
      "onion",
      "carrots",
      "celery",
      "red wine",
      "Parmesan",
    ],
  },
  {
    id: "8",
    itemName: "Vegetable Stir-Fry",
    description:
      "A quick, healthy, and colorful mix of crisp-tender vegetables.",
    category: "MainCourse",
    price: 145,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/4569049/pexels-photo-4569049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: [
      "Bell peppers",
      "broccoli",
      "carrots",
      "snap peas",
      "soy sauce",
      "garlic",
      "ginger",
      "tofu or chicken",
    ],
  },
  {
    id: "9",
    itemName: "Classic Chocolate Brownie",
    description: "Dense, fudgy, and rich chocolate squares.",
    category: "Dessert",
    price: 55,
    intensity: "Strong",
    image:
      "https://images.pexels.com/photos/5386677/pexels-photo-5386677.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: [
      "Chocolate",
      "butter",
      "sugar",
      "eggs",
      "flour",
      "cocoa powder",
      "walnuts",
    ],
  },
  {
    id: "10",
    itemName: "Tiramisu",
    description:
      "An iconic Italian no-bake dessert of coffee-soaked layers and mascarpone.",
    category: "Dessert",
    price: 79,
    intensity: "Balanced",
    image:
      "https://images.pexels.com/photos/27305272/pexels-photo-27305272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: [
      "Ladyfingers",
      "mascarpone",
      "coffee",
      "eggs",
      "sugar",
      "cocoa powder",
    ],
  },
  {
    id: "11",
    itemName: "Fresh Fruit Tart",
    description:
      "A buttery pastry crust filled with custard and topped with glossy fruit.",
    category: "Dessert",
    price: 64,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/12702316/pexels-photo-12702316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: [
      "Pastry crust",
      "pastry cream",
      "strawberries",
      "kiwi",
      "blueberries",
      "apricot glaze",
    ],
  },
  {
    id: "12",
    itemName: "Cucumber Cooler",
    description: "An incredibly fresh, light, and hydrating spa-style drink.",
    category: "Beverage",
    price: 74,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/5335918/pexels-photo-5335918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Cucumber", "lime", "mint", "soda water", "ice", "syrup"],
  },
  {
    id: "13",
    itemName: "Hot Chocolate",
    description: "A rich, creamy, and comforting warm drink.",
    category: "Beverage",
    price: 45,
    intensity: "Balanced",
    image:
      "https://images.pexels.com/photos/19271883/pexels-photo-19271883.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: [
      "Milk",
      "dark chocolate",
      "sugar",
      "whipped cream",
      "cocoa powder",
    ],
  },
  {
    id: "14",
    itemName: "Iced Matcha Latte",
    description: "A vibrant, earthy, and creamy Japanese-inspired drink.",
    category: "Beverage",
    price: 58,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/34334424/pexels-photo-34334424.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ingredients: ["Matcha powder", "milk", "honey", "ice"],
  },
  
];
// Main App component
export default function App() {
  const [items, setItems] = useState<MenuItem[]>(predefined);

  const addItem = (item: MenuItem) => setItems((prev) => [...prev, item]);
  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const avg = (course: Course) => {
    const list = items.filter((i) => i.category === course);
    if (!list.length) return "0.00";
    const total = list.reduce((sum, i) => sum + i.price, 0);
    return (total / list.length).toFixed(2);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#83835eff" },
          headerTintColor: "#363532ff",
          headerTitleStyle: { fontWeight: "800" },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" options={{ title: "Menu Bliss" }}>
          {(props) => (
            <HomeScreen
              {...props}
              items={items}
              removeItem={removeItem}
              averages={{
                Starters: avg("Starters"),
                "Main Course": avg("MainCourse"),
                Dessert: avg("Dessert"),
                Beverage: avg("Beverage"),
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddItem" options={{ title: "Add Menu Item" }}>
          {(props) => <AddItemScreen {...props} addItem={addItem} />}
        </Stack.Screen>
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={{ title: "Filter Menu" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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


