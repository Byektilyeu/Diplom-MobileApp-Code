import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const Search = ({ value, onValueChange, onFinishEnter }) => {
  return (
    <View style={css.searchPanel}>
      <Feather style={css.searchIcon} name="search" color="#535C68" />
      <TextInput
        value={value}
        onChangeText={onValueChange}
        style={css.searchText}
        placeholder="Хоол хайх /нэр, орц, зохиогч... /"
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={onFinishEnter}
      />
    </View>
  );
};

export default Search;

const css = StyleSheet.create({
  searchPanel: {
    top: 15,
    height: 36,
    backgroundColor: "white",
    marginHorizontal: 15,
    borderRadius: 7,
    flexDirection: "row",
  },
  searchText: {
    color: "black",
    fontSize: 16,
    flex: 1,
  },
  searchIcon: {
    fontSize: 20,
    color: "black",
    alignSelf: "center",
    marginHorizontal: 15,
  },
});
