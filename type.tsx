// Define the types of courses available in the menu
export type Course = "Starters" | "MainCourse" | "Dessert" | "Beverage";

// Define the structure of a menu item
export interface MenuItem {
  id: string;             
  itemName: string;       
  description: string;    
  category: Course;       
  price: number;          
  intensity: string;      
  image: string;         
  ingredients: string[];  
}

// Define the screens in the app and the parameters they accept
export type RootStackParamList = {
  Welcome: undefined;         
  Home: undefined;            
  AddItem: undefined;         
  Filter: { items: MenuItem[] }; 
};








