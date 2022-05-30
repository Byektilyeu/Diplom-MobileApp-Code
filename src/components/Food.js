import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
var formatThousands = require("format-thousands");
import { useNavigation } from "@react-navigation/native";
import { restApiUrl } from "../../Constants";

const Food = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Detail", { food: data.id })}
      style={{ marginLeft: 15, marginVertical: 15, width: 200 }}
    >
      {data.photo && data.photo.startsWith("/") ? (
        <Image
          style={{
            width: 200,
            height: 250,
            alignSelf: "center",
            marginRight: 15,
            borderRadius: 10,
          }}
          source={{ uri: "https://data.internom.mn/media/images" + data.photo }}
        />
      ) : (
        <Image
          style={{
            width: 200,
            height: 250,
            alignSelf: "center",
            marginRight: 15,
            borderRadius: 10,
          }}
          source={{ uri: restApiUrl + "/upload/" + data.photo }}
        />
      )}
      <Text
        style={{
          fontSize: 12,
          marginTop: 10,
        }}
      >
        {data.name}
      </Text>
      {/* <Text
        style={{ marginLeft: 15, fontSize: 10, top: 5, fontWeight: "bold" }}
      >
        {data.author}
      </Text> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ marginRight: 10, fontSize: 12, fontWeight: "bold" }}>
          Rate: {formatThousands(data.rating)}*
        </Text>
        <Text style={{ marginRight: 10, fontSize: 12, color: "gray" }}>
          Author: {data.author}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Food;

const styles = StyleSheet.create({});
