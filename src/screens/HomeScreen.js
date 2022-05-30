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
import { Feather } from "@expo/vector-icons";
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
  // const [userName, setUserName] = useState("");

  const state = useContext(UserContext);
  console.log("++++++++++++++++++", route);
  // setUserName(state.userName);

  if (route.params && route.params.deletedFood) {
    Alert.alert(route.params.deletedFood.name + " нэртэй хоолыг устгалаа");
    delete route.params.deletedFood;
    setRefresh(true);
  }

  if (route.params && route.params.addCateg) {
    Alert.alert(
      route.params.addCateg.name + " нэртэй категорийг амжилттай нэмлээ"
    );
    delete route.params.addCateg;
    setRefresh(true);
  }
  if (route.params && route.params.food) {
    delete route.params.food;
    setRefresh(true);
  }
  if (route.params && route.params.cart) {
    delete route.params.cart;
    setRefresh(true);
  }
  if (route.params && route.params.updateFood) {
    Alert.alert(route.params.updateFood.name + " нэртэй хоолыг өөрчиллөө");
    delete route.params.updateFood;
    setRefresh(true);
  }
  // if (route.params && route.params.userName) {
  //   // setUserName(route.params.userName);
  //   // console.log(
  //   //   route.params.userName +
  //   //     "%%%%%%%%%%%%%%%%%%%%%%%%%%%%5555555555555555555555555555555555555555555555555555555555"
  //   // );
  //   delete route.params.userName;
  //   // setRefresh(true);
  // }
  if (route.params && route.params.deleteCartItem) {
    Alert.alert("Картаас амжилттай хаслаа");
    delete route.params.deleteCartItem;
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
            color="#33324D"
          />
        </HeaderButtons>
      ),
      title: state.userName ? state.userName : "Хоолны жор",
    });
  }, [navigation, localSearchText, state.userName, refresh]);

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
