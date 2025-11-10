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








