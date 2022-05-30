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
import FoodAdd from "../screens/FoodAdd.js";
import SettingsScreen from "../screens/SettingsScreen.js";
import UserProfileScreen from "../screens/UserProfileScreen.js";
import GetUserFoodsScreen from "../screens/GetUserFoodsScreen.js";
import CategoryScreen from "../screens/CategoryScreen.js";
import UserCartScreen from "../screens/UserCartScreen";
import UserListScreen from "../screens/UserListScreen";
import { mainColor } from "../../Constants.js";

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
        drawerStyle: {
          backgroundColor: "#E6E6E9",
          width: 240,
        },
      }}
      // drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Нүүр" component={MyStackNavigator} />
      {state.isLoggedIn ? (
        <>
          {/* {state.userRole === "admin" && (
            <Drawer.Screen name="Шинэ хоол нэмэх" component={FoodAdd} />
          )} */}
          <Drawer.Screen name="Шинэ хоол нэмэх" component={FoodAdd} />
          {/* <Drawer.Screen name="Тохиргоо" component={SettingsScreen} /> */}
          <Drawer.Screen name="Хувийн мэдээлэл" component={UserProfileScreen} />
          <Drawer.Screen
            name="Таны оруулсан хоолнууд"
            component={GetUserFoodsScreen}
          />
          <Drawer.Screen
            name="Таны хадгалсан хоол"
            component={UserCartScreen}
          />
          {state.userRole === "admin" && (
            <Drawer.Screen name="Категори" component={CategoryScreen} />
          )}
          {state.userRole === "admin" && (
            <Drawer.Screen name="Хэрэглэгчид" component={UserListScreen} />
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
