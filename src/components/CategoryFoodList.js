import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Food from "./Food";
import useFoods from "../hooks/useFoods";
import Spinner from "./Spinner";

const CategoryFoodList = ({
  data,
  style,
  searchLocalValue,
  searchServerValue,
  refreshCategory,
  setRefresh,
}) => {
  const [foods, errorMessage, searchFood, loading] = useFoods(
    data._id,
    searchServerValue,
    refreshCategory,
    setRefresh
  );

  // console.log("---------->", foods);
  const filteredFoods = foods.filter(
    (el) =>
      el.name.toLowerCase().includes(searchLocalValue.toLowerCase()) ||
      el.content.toLowerCase().includes(searchLocalValue.toLowerCase()) ||
      el.author.toLowerCase().includes(searchLocalValue.toLowerCase()) ||
      el.ingredients.toLowerCase().includes(searchLocalValue.toLowerCase())
    // el.ingredients.filter((e) =>
    //   e.name.toLowerCase().includes(searchLocalValue.toLowerCase())
    // )
    // (el !== null &&
    //   el.map((e) => {
    // el.ingredients.filter((e) =>
    //   e.name.toLowerCase().includes(searchLocalValue.toLowerCase())
    // )
    // }))
  );

  // const filteredFoods = foods.map((el) => {
  //   el.ingredients !== null &&
  //     el.ingredients.filter((e) =>
  //       e.name.toLowerCase().includes(searchLocalValue.toLowerCase())
  //     );
  // });
  // const filteredFoods = foods.ingredients.filter(
  //   (el) =>
  //     el.name !== null &&
  //     el.name.toLowerCase().includes(searchLocalValue.toLowerCase())
  // );

  //   console.log(data);
  return (
    <View style={{ ...style }}>
      <Text
        style={{
          marginLeft: 15,
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 5,
        }}
      >
        {data.name} - {filteredFoods.length}
      </Text>
      <Text style={{ marginLeft: 15 }}>{data.description}</Text>
      {errorMessage && (
        <Text style={{ color: "red", marginLeft: 15 }}>{errorMessage}</Text>
      )}

      {loading && <Spinner showText={false} />}
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={filteredFoods}
        keyExtractor={(food) => food.name}
        renderItem={({ item, index }) => <Food data={item} />}
      />
    </View>
  );
};

export default CategoryFoodList;

const css = StyleSheet.create({});
