import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import React, { useState, useLayoutEffect, useContext } from "react";
import Search from "../components/Search";
import useCategory from "../hooks/useCategory";
import CategoryFoodList from "../components/CategoryFoodList";
import Spinner from "../components/Spinner";
import MyHeaderButton from "../components/MyHeaderButton";
import {
  HeaderButtons,
  Item,
  HiddenItem,
  OverflowMenu,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import UserContext from "../contexts/UserContext";

const HomeScreen = ({ navigation, route }) => {
  const [localSearchText, setLocalSearchText] = useState("");
  const [serverSearchText, setServerSearchText] = useState("");
  const [categories, errorMessage, loading] = useCategory();
  const [refresh, setRefresh] = useState(false);

  const state = useContext(UserContext);
  console.log("++++++++++++++++++", route);

  if (route.params && route.params.deletedFood) {
    Alert.alert(route.params.deletedFood.name + " нэртэй хоолыг устгалаа");
    delete route.params.deletedFood;
    setRefresh(true);
  }

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
      title: state.userName ? "welcome: " + state.userName : "Хоолны жор",
    });
  }, [navigation, localSearchText, state.userName]);

  console.log("---------------", navigation);

  const searchFoodFromServer = () => {
    console.log(`Serverees ${localSearchText} utgaar haij ehellee`);
    setServerSearchText(localSearchText);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <Spinner />
      ) : (
        <View>
          <Search
            value={localSearchText}
            onValueChange={setLocalSearchText}
            onFinishEnter={searchFoodFromServer}
          />

          {errorMessage ? (
            <Text style={{ marginHorizontal: 20, color: "red" }}>
              {errorMessage}
            </Text>
          ) : null}

          <ScrollView style={{ marginTop: 20 }}>
            {categories.map((category) => (
              <CategoryFoodList
                refreshCategory={refresh}
                setRefresh={setRefresh}
                searchLocalValue={localSearchText}
                searchServerValue={serverSearchText}
                key={category._id}
                style={{ marginVertical: 10 }}
                data={category}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const css = StyleSheet.create({});
