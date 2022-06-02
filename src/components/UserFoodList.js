import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import Food from "./Food";
import Spinner from "./Spinner";
import useUserFoods from "../hooks/useUserFoods";
import CategFood from "../components/CategFood";

const UserFoodList = ({
  data,
  style,
  searchLocalValue,
  searchServerValue,
  refreshCategory,
  setRefresh,
}) => {
  const [foods, errorMessage, searchFood, loading] = useUserFoods(
    data._id,
    searchServerValue,
    refreshCategory,
    setRefresh
  );

  console.log("---------->");
  const filteredFoods = foods.filter(
    (el) =>
      el.name.toLowerCase().includes(searchLocalValue.toLowerCase()) ||
      el.content.toLowerCase().includes(searchLocalValue.toLowerCase()) ||
      el.author.toLowerCase().includes(searchLocalValue.toLowerCase()) ||
      el.ingredients.toLowerCase().includes(searchLocalValue.toLowerCase())
  );

  //   console.log(data);
  return (
    <SafeAreaView style={{ ...style }}>
      <Text
        style={{
          marginLeft: -15,
          fontWeight: "bold",
          fontSize: 15,
          marginBottom: 5,
        }}
      >
        Таны оруулсан нийт хоолны тоо: {filteredFoods.length}
      </Text>
      <Text style={{ marginLeft: 15 }}>{data.description}</Text>
      {errorMessage && (
        <Text style={{ color: "red", marginLeft: 15 }}>{errorMessage}</Text>
      )}

      {loading && <Spinner showText={false} />}
      <ScrollView
        style={{ marginLeft: -70, marginRight: 5 }}
        // contentContainerStyle={{
        //   alignItems: "center",
        //   justifyContent: "center",
        // }}
      >
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={filteredFoods}
          keyExtractor={(food) => food.name}
          renderItem={({ item, index }) => (
            <CategFood key={index} data={item} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserFoodList;

const css = StyleSheet.create({});
