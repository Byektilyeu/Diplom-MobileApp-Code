import { StyleSheet, View, Button } from "react-native";
import React from "react";

const MyButton = ({ title, onPress, style }) => {
  return (
    <View style={[css.button, style]}>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

export default MyButton;

const css = StyleSheet.create({
  button: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
});
