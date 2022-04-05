import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Image,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useContext } from "react";
// import { useHeaderHeight } from "@react-navigation/stack";
import useFood from "../hooks/useFood";
import { Feather } from "@expo/vector-icons";
import UserContext from "../contexts/UserContext";

const FoodDetailScreen = (props) => {
  // booksJs dotor baigaa book nii data ni params gedegeer propsoor ni orj irj bna
  // console.log("<--------------->", props.route.params.book);

  const id = props.route.params.food;
  // console.log(id);
  const [food, error, deleteFood] = useFood(id);

  const state = useContext(UserContext);

  // headeriin unduriig uzdeg code
  // const height = useHeaderHeight();
  // console.log(height);

  const deleteOneFood = () => {
    Alert.alert("Анхаар", "Та энэ хоолыг устгахад итгэлтэй байна уу", [
      { text: "Татгалзах", onPress: () => {} },
      {
        text: "Устгах",
        onPress: () => {
          // console.log("1222222222222222222222222222", food._id);
          deleteFood(food._id)
            .then((result) => {
              console.log("*****************", result.data.data.name);
              // navigation-oor data damjuulah
              props.navigation.navigate("Home", {
                deletedFood: result.data.data,
              });
            })
            .catch((err) => {
              Alert.alert("Устгаж чадсангүй", err.response.data.error.message);
            });
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Feather
          name="menu"
          size={24}
          color="white"
          style={{ marginRight: 20 }}
          onPress={() => props.navigation.toggleDrawer()}
        />
      ),
    });
  }, [props.navigation]);

  if (error) {
    return (
      <Text style={{ color: "red", margin: 30 }}>Алдаа гарлаа ! {error}</Text>
    );
  }

  if (!food) {
    return null;
  }

  return (
    <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
      <Image
        style={{ width: 300, height: 400, alignSelf: "center" }}
        source={{ uri: "https://data.internom.mn/media/images" + food.photo }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>
        {food.name}
      </Text>
      <Text>{state.isLoggedin}</Text>
      <Text>{food.content}</Text>
      <View>
        <Button
          style={{ marginBottom: 100 }}
          onPress={() => props.navigation.goBack()}
          title="Буцах"
        />
      </View>

      {state.userRole === "admin" && (
        <View style={{ marginBottom: 100 }}>
          <Button onPress={deleteOneFood} title="Энэ хоолыг устгах" />
        </View>
      )}
    </ScrollView>
  );
};

export default FoodDetailScreen;

const styles = StyleSheet.create({});
