import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState, useLayoutEffect, useContext } from "react";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
import MyHeaderButton from "../components/MyHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import UserContext from "../contexts/UserContext";
import UserFoodList from "../components/UserFoodList";
import { lightColor, mainColor, textColor } from "../../Constants";

const GetUserFoodsScreen = ({ navigation, route }) => {
  const [localSearchText, setLocalSearchText] = useState("");
  const [serverSearchText, setServerSearchText] = useState("");
  const [refresh, setRefresh] = useState(false);

  const state = useContext(UserContext);
  console.log("++++++++++++++++++", route);

  // if (route.params && route.params.deletedFood) {
  //   Alert.alert(route.params.deletedFood.name + " нэртэй хоолыг устгалаа");
  //   delete route.params.deletedFood;
  //   setRefresh(true);
  // } else
  if (route.params && route.params.userFoods) {
    delete route.params.userFoods;
    setRefresh(true);
  }

  useLayoutEffect(() => {
    // setRefresh(false);
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
      title: "Таны хоолны жагсаалт",
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

  return (
    <SafeAreaView style={{ marginBottom: 200 }}>
      <StatusBar backgroundColor={mainColor} barStyle="dark-content" />
      <View
        style={{
          paddingVertical: 16,
          paddingHorizontal: 20,
          backgroundColor: mainColor,
        }}
      >
        <Text style={{ fontSize: 18, color: textColor }}>
          Хэрэглэгчийн оруулсан хоолнууд
        </Text>
      </View>
      <View>
        <View style={{ marginTop: 5 }}>
          <Search
            value={localSearchText}
            onValueChange={setLocalSearchText}
            onFinishEnter={searchFoodFromServer}
          />
        </View>

        <ScrollView
          style={{ marginTop: 20 }}
          // contentContainerStyle={{
          //   alignItems: "center",
          //   justifyContent: "center",
          // }}
        >
          <UserFoodList
            refreshCategory={refresh}
            setRefresh={setRefresh}
            searchLocalValue={localSearchText}
            searchServerValue={serverSearchText}
            style={{ marginVertical: 10, marginLeft: 70 }}
            data={"627d43263392ba181bdbd989"}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default GetUserFoodsScreen;

const css = StyleSheet.create({});
