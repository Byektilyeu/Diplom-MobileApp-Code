import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
var formatThousands = require("format-thousands");
import { useNavigation } from "@react-navigation/native";
import { restApiUrl } from "../../Constants";

const CategFood = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Detail", { food: data.id })}
      style={{ marginLeft: 10, marginVertical: 5, flex: 1 }}
    >
      {/* <Text
        style={{ marginLeft: 15, fontSize: 10, top: 5, fontWeight: "bold" }}
      >
        {data.author}
      </Text> */}
      <View
        style={{
          flexDirection: "row",
          //   justifyContent: "space-evenly",
          //   marginTop: 10,
          //   alignItems: "center",
        }}
      >
        {data.photo && data.photo.startsWith("/") ? (
          <Image
            style={{
              width: 120,
              height: 120,
              alignSelf: "center",
              //   marginRight: 15,
              borderRadius: 10,
            }}
            source={{
              uri: "https://data.internom.mn/media/images" + data.photo,
            }}
          />
        ) : (
          <Image
            style={{
              width: 120,
              height: 120,
              // alignSelf: "center",
              // marginRight: 15,
              borderRadius: 10,
            }}
            source={{ uri: restApiUrl + "/upload/" + data.photo }}
          />
        )}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: 10,
            marginVertical: 5,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              //   marginTop: 10,
              fontWeight: "bold",
            }}
          >
            {data.name}
          </Text>

          <Text style={{ marginRight: 10, fontSize: 12, color: "gray" }}>
            Хоолыг оруулсан: {data.author}
          </Text>
          <Text style={{ marginRight: 10, fontSize: 12, color: "gray" }}>
            Хэзээ: {data.createdAt.substring(0, 10)}
          </Text>
          <Text style={{ marginRight: 10, fontSize: 12, color: "gray" }}>
            Рэйтинг: {formatThousands(data.rating)}*
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategFood;

const styles = StyleSheet.create({});
