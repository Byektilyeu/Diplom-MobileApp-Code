import React from "react";
import HomeScreen from "../screens/HomeScreen.js";
import FoodDetailScreen from "../screens/FoodDetailScreen.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { mainColor } from "../../Constants.js";

const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator
    // screenOptions={{
    //   headerStyle: { backgroundColor: "black" },
    //   headerTintColor: "yellow",
    //   headerTitleStyle: { fontSize: 22 },
    // }}
    initialRouteName="Home"
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => ({
        title: "Хоолны жор",
        headerStyle: { backgroundColor: mainColor },
        headerTintColor: "white",
        headerTitleStyle: { fontSize: 22 },
      })}
    />

    <Stack.Screen
      name="Detail"
      component={FoodDetailScreen}
      options={{
        title: "Хоолны жор",
        headerBackTitleVisible: true,
        headerBackTitle: "Буцах",
        headerTruncatedBackTitle: "",
        headerStyle: { backgroundColor: mainColor },
        headerTintColor: "white",
        headerTitleStyle: { fontSize: 22 },
      }}
    />
  </Stack.Navigator>
);
