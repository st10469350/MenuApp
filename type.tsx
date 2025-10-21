import React from "react";

export type MenuItems = {
  itemName: string;
  description: string;
  category: string;
  price: number;
  intensity: string;
  image: string | null;
  ingredients: string[];
};

export type RootStackParamList = {
  WelcomeScreen: undefined;
  HomeScreen: undefined;
  ManageScreen: {
    items: MenuItems[];
    setItems: React.Dispatch<React.SetStateAction<MenuItems[]>>;
  };
};
