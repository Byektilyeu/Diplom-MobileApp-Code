import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";

const MyHeaderButton = (props) => {
  return (
    <HeaderButton
      IconComponent={Ionicons}
      color="white"
      iconSize={30}
      {...props}
    />
  );
};

export default MyHeaderButton;

const styles = StyleSheet.create({});
