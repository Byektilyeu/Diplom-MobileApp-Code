import { StyleSheet, TextInput } from "react-native";
import React from "react";

const MyInput = (props) => {
  return (
    <TextInput
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
      style={css.inputField}
    />
  );
};

export default MyInput;

const css = StyleSheet.create({
  inputField: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
});
