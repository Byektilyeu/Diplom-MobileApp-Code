import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
var formatThousands = require("format-thousands");
import { useNavigation } from "@react-navigation/native";

const Food = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Detail", { food: data.id })}
      style={{ marginLeft: 15, marginVertical: 15, width: 200 }}
    >
      <Image
        style={{ width: 200, height: 300, marginRight: 15 }}
        source={{
          uri: "https://data.internom.mn/media/images" + data.photo,
        }}
      />
      <Text
        style={{
          marginLeft: 10,
          fontSize: 12,
          marginTop: 10,
        }}
      >
        {data.name}
      </Text>
      <Text
        style={{ marginLeft: 15, fontSize: 10, top: 5, fontWeight: "bold" }}
      >
        {data.author}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ marginRight: 10, fontSize: 18, fontWeight: "bold" }}>
          {formatThousands(data.price)}₮
        </Text>
        <Text style={{ marginRight: 10, fontSize: 12, color: "gray" }}>
          {data.balance > 0 ? `${data.balance} ш` : null} ш
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Food;

const styles = StyleSheet.create({});
