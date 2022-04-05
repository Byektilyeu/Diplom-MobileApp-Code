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
              А. Бектилеу
            </Title>
            <Caption style={{ lineHeight: 14 }}>Admin</Caption>
          </View>
        </View>

        <Drawer.Section style={{ marginTop: 15 }}>
          <Drawer.Item
            label="Нүүр"
            icon={({ color, size }) => (
              <Icon name="book-open-page-variant" color={color} size={size} />
            )}
          />

          {state.isLoggedIn ? (
            <View>
              {state.userRole === "admin" && (
                <Drawer.Item
                  label="Шинэ ном нэмэх"
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
                label="Гарах"
                icon={({ color, size }) => (
                  <Icon name="settings-outline" color={color} size={size} />
                )}
              />

              <Drawer.Item
                label="Гарах"
                icon={({ color, size }) => (
                  <Icon name="logout-variant" color={color} size={size} />
                )}
              />
            </View>
          ) : (
            <View>
              <Drawer.Item
                label="Бүртгүүлэх"
                icon={({ color, size }) => (
                  <Icon name="account-plus" color={color} size={size} />
                )}
              />
              <Drawer.Item
                label="Логин"
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
