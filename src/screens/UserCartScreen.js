import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  StatusBar,
  SafeAreaView,
  Button,
} from "react-native";
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from "react-native-fontawesome";
import FontAwesomeIcon from "@fortawesome/free-solid-svg-icons";
import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import MyHeaderButton from "../components/MyHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import UserContext from "../contexts/UserContext";
import Food from "../components/Food";
import axios from "axios";
import { lightColor, mainColor, restApiUrl, textColor } from "../../Constants";
import { Feather } from "@expo/vector-icons";

const UserCartScreen = ({ navigation, route }) => {
  const [localSearchText, setLocalSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const state = useContext(UserContext);

  const [refresh, setRefresh] = useState(false);

  // if (route.params && route.params.cart) {
  //   delete route.params.cart;
  //   setRefresh(true);
  // }

  // const getCart = async () => {
  //   setRefresh(true);
  //   const result = await axios.get(`${restApiUrl}/api/v1/users/${state.id}`);
  //   setCartItems(result.data.data.cart);
  // };

  const getCart = () => {
    axios
      .get(`${restApiUrl}/api/v1/users/${state.id}`)
      .then((result) => {
        setCartItems(result.data.data.cart);
        setRefresh(true);
      })
      .catch((err) => Alert.alert("aldaa garlaa cart", err.message));
  };

  useEffect(() => {
    // getCart();
    setRefresh(false);

    axios
      .get(`${restApiUrl}/api/v1/users/${state.id}`)
      .then((result) => {
        setCartItems(result.data.data.cart);
        // setRefresh(true);
      })
      .catch((err) => Alert.alert("aldaa garlaa cart", err.message));
  }, [refresh]);

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
      title: "Таны хадгалсан хоолны жагсаалт",
    });
  }, [navigation, localSearchText, state.cart, refresh, cartItems]);

  console.log("---------------", navigation);
  // {
  //   state.cart.map((el) => {
  //     console.log(
  //       "VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV",
  //       el.name
  //     );
  //   });
  // }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={mainColor} barStyle="dark-content" />
      <View
        style={{
          paddingVertical: 16,
          paddingHorizontal: 20,
          backgroundColor: mainColor,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, color: textColor }}>
          Хэрэглэгчийн хадгалсан хоолнууд
        </Text>
        <Feather
          name="refresh-cw"
          size={20}
          color={textColor}
          style={{ marginRight: 20 }}
          onPress={() => getCart()}
        />
      </View>
      <View style={{ marginHorizontal: 50, marginVertical: 10 }}>
        <Text>Таны картанд байгаа хоолны жагсаалт</Text>
      </View>

      <ScrollView style={{ marginBottom: 60 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Button title="refResh" onPress={() => getCart()}></Button> */}
          {cartItems &&
            cartItems.map((el, index) => <Food key={index} data={el} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserCartScreen;

const css = StyleSheet.create({});
