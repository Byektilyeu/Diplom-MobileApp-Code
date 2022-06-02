import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
import MyHeaderButton from "../components/MyHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import UserContext from "../contexts/UserContext";
import UserFoodList from "../components/UserFoodList";
import { lightColor, mainColor, restApiUrl, textColor } from "../../Constants";
import axios from "axios";
import Food from "../components/Food";
import CategFood from "../components/CategFood";

const CategoryFoodsScreen = ({ navigation, route }) => {
  const [localSearchText, setLocalSearchText] = useState("");
  const [serverSearchText, setServerSearchText] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [categFoods, setCategFoods] = useState([]);

  const state = useContext(UserContext);
  console.log("++++++++++++++++++", route);

  const catID = route.params.categoryID;
  //   const catName = route.params.categName;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
          <Item
            title="Цэс"
            iconName="ios-menu"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      title: "Категорт хамаарах",
    });
  }, [navigation, localSearchText, state.userName]);

  console.log("---------------", navigation);

  const searchFoodFromServer = () => {
    console.log(`Serverees ${localSearchText} utgaar haij ehellee`);
    setServerSearchText(localSearchText);
  };

  console.log(
    "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
    state
  );

  useEffect(() => {
    getCatFoods();
  }, []);

  const getCatFoods = async () => {
    try {
      const result = await axios.get(
        `${restApiUrl}/api/v1/categories/${catID}/foods`
      );
      setCategFoods(result.data.data);
      // setError(null);
    } catch (err) {
      // setError(err.message);
      Alert.alert("aldaa garlaa shuu");
    }
  };

  const filteredFoods = categFoods.filter((el) =>
    el.name.toLowerCase().includes(localSearchText.toLowerCase())
  );

  return (
    <SafeAreaView style={{ marginBottom: 200 }}>
      <StatusBar backgroundColor={mainColor} barStyle="dark-content" />
      {/* <View
        style={{
          paddingVertical: 16,
          paddingHorizontal: 20,
          backgroundColor: mainColor,
        }}
      >
        <Text style={{ fontSize: 18, color: textColor }}>{catID}</Text>
      </View> */}

      <View>
        <View style={{ marginTop: 5, marginLeft: -5 }}>
          <Search
            value={localSearchText}
            onValueChange={setLocalSearchText}
            onFinishEnter={searchFoodFromServer}
          />
        </View>
        <Text
          style={{ marginTop: 20, marginLeft: 10, color: "gray", fontSize: 12 }}
        >
          Олдсон хоолны тоо: {filteredFoods.length}
        </Text>

        {/* {filteredFoods.map((el) => (
          <Text> {el.name} </Text>
        ))} */}
        <ScrollView
          style={{ marginTop: 5 }}
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
      </View>
    </SafeAreaView>
  );
};

export default CategoryFoodsScreen;

const css = StyleSheet.create({});
