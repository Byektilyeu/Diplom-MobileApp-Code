import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Caption, Title, Drawer } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UserContext from "../contexts/UserContext";

const DrawerContent = (props) => {
  const state = useContext(UserContext);
  state.setIsLoggedIn(true);

  return (
    <View flex={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 15 }}>
          <Avatar.Image
            source={require("../../assets/Images/shop.jpg")}
            size={50}
          />
          <View style={{ marginLeft: 15 }}>
            <Title
              style={{
                fontSize: 16,
                marginTop: 3,
                fontWeight: "bold",
                lineHeight: 23,
              }}
            >
              {state.userName ? state.userName : "Хоолны жор"}
            </Title>
            <Caption style={{ lineHeight: 14 }}>
              {state.userRole ? state.userRole : "Тавтай морил"}
            </Caption>
          </View>
        </View>

        <Drawer.Section style={{ marginTop: 15 }}>
          <Drawer.Item
            label="Нүүр"
            onPress={() => props.navigation.navigate("Нүүр")}
            icon={({ color, size }) => (
              <Icon name="book-open-page-variant" color={color} size={size} />
            )}
          />

          {state.isLoggedIn ? (
            <View>
              {state.userRole === "admin" && (
                <Drawer.Item
                  label="Шинэ ном нэмэх"
                  onPress={() => props.navigation.navigate("Шинэ хоол нэмэх")}
                  icon={({ color, size }) => (
                    <Icon
                      name="book-open-page-variant"
                      color={color}
                      size={size}
                    />
                  )}
                />
              )}

              <Drawer.Item
                label="Тохиргоо"
                onPress={() => props.navigation.navigate("settings")}
                icon={({ color, size }) => (
                  <Icon name="settings-outline" color={color} size={size} />
                )}
              />

              <Drawer.Item
                style={{ borderTopColor: "#f4f4f4", borderTopWidth: 1 }}
                label="Гарах"
                onPress={() => props.navigation.navigate("Гарах")}
                // onPress={() => state.logout()}
                icon={({ color, size }) => (
                  <Icon name="logout-variant" color={color} size={size} />
                )}
              />
            </View>
          ) : (
            <View>
              <Drawer.Item
                label="Бүртгүүлэх"
                onPress={() => props.navigation.navigate("Бүртгүүлэх")}
                icon={({ color, size }) => (
                  <Icon name="account-plus" color={color} size={size} />
                )}
              />
              <Drawer.Item
                label="Логин"
                onPress={() => props.navigation.navigate("Логин")}
                icon={({ color, size }) => (
                  <Icon name="login" color={color} size={size} />
                )}
              />
            </View>
          )}
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({});
