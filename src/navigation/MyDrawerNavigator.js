import React, { useContext } from "react";
import { Text } from "react-native";
import MyStackNavigator from "./MyStackNavigator.js";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SignUpScreen from "../screens/SignUpScreen.js";
import LoginScreen from "../screens/LoginScreen.js";
import SplashScreen from "../screens/SplashScreen.js";
import DrawerContent from "../components/DrawerContent.js";

const Drawer = createDrawerNavigator();

import UserContext from "../contexts/UserContext.js";

export default () => {
  const state = useContext(UserContext);

  if (state.isLoading === true) {
    return <SplashScreen />;
  }

  // state.logout();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      // drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Нүүр" component={MyStackNavigator} />
      {state.isLoggedIn ? (
        <>
          {state.userRole === "admin" && (
            <Drawer.Screen
              name="Шинэ хоол нэмэх"
              component={MyStackNavigator}
            />
          )}
          <Drawer.Screen
            name="Гарах"
            component={Text}
            listeners={() => {
              console.log("Системээс амжилттай гарлаа");
              state.logout();
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen name="Бүртгүүлэх" component={SignUpScreen} />
          <Drawer.Screen name="Логин" component={LoginScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
};
