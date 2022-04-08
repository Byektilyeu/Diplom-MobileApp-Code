import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Image,
  Button,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";

import { lightColor, mainColor, restApiUrl } from "../../Constants";
import FormText from "../components/FormText";
import FormSwitch from "../components/FormSwitch";
import FormPicker from "../components/FormPicker";
import useCategory from "../hooks/useCategory";
import Spinner from "../components/Spinner";
import FormRadioButtons from "../components/FormRadioButtons";
import MyButton from "../components/MyButton";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
// import * as Linking from "expo-linking";

const FoodAdd = (props) => {
  const [categories, errorMessage, loading] = useCategory();
  const [food, setFood] = useState({
    name: "Nomiin ner",
    photo: "photo.jpg",
    rating: 4.0,
    balace: 6,
    author: "author",
    price: "20000",
    content: "nomiiin tailbar hhha",
    bestseller: true,
    category: null,
    available: ["old"],
  });

  const [serverError, setServerError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadComplete = (event, foodId) => {
    console.log("Upload completed");
    setUploadProgress(0);
    setUploadTotal(0);
    props.navigation.navigate("Detail", { food: foodId });
  };

  const handleUploadProgress = (event) => {
    if (total === 0) setUploadTotal(event.total);

    setUploadProgress((uploadProgress) => {
      console.log("Upload total", uploadTotal);
      console.log("Upload progress", uploadProgress);
      return Math.round((event.loaded * 100) / event.total);
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setFood({ ...food, photo: result.uri });
    }
  };

  const sendFoodToServer = () => {
    if (food.category !== null) {
      setSaving(true);
      const fileUri = food.photo;
      const fileExt = fileUri.substring(fileUri.lastIndexOf(".") + 1);
      food.photo = `photo__${new Date().getTime()}.${fileExt}`;

      axios
        .post(`${restApiUrl}/api/v1/foods`, food)
        .then((result) => {
          const newFood = result.data.data;

          //xhr zurag upload hiih
          const xhr = new XMLHttpRequest();
          xhr.addEventListener("load", (event) =>
            handleUploadComplete(event, newFood._id)
          );
          xhr.upload.addEventListener("progress", handleUploadProgress);

          const data = new FormData();

          data.append("file", {
            uri: fileUri,
            type: `image/${fileExt}`,
            name: food.photo,
          });
          xhr.open("PUT", `${restApiUrl}/api/v1/foods/${newFood._id}/photo`);
          xhr.send(data);

          props.navigation.navigate("Detail", { food: newFood._id });
        })
        .catch((err) => {
          if (err.response) {
            setServerError(err.response.data.error.message);
          } else {
            setServerError(err.message);
          }
        })
        .finally(() => {
          setSaving(false);
        });
    } else {
      Alert.alert("Та хоолын категорыг сонгоно уу");
    }
  };

  const [error, setError] = useState({
    name: false,
    author: false,
    price: false,
    content: false,
    bestseller: true,
  });

  const checkName = (text) => {
    setError({
      ...error,
      name: text.length < 5 || text.length > 20,
    });
    setFood({ ...food, name: text });
  };

  const checkAuthor = (text) => {
    setError({
      ...error,
      author: text.length < 5 || text.length > 15,
    });
    setFood({ ...food, author: text });
  };

  const checkPrice = (text) => {
    setError({
      ...error,
      price: text < 1000,
    });
    setFood({ ...food, price: text });
  };

  const checkContent = (text) => {
    setError({
      ...error,
      content: text.length < 5 || text.length > 1000,
    });
    setFood({ ...food, content: text });
  };

  const toggleBestseller = () => {
    setFood({
      ...food,
      bestseller: !food.bestseller,
    });
  };

  if (uploadTotal > 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 20, fontWeight: "bold", fontSize: 20 }}>
          Түр хүлээнэ үү, Upload хийж байна
        </Text>

        <View style={{ height: 50, backgroundColor: "red", width: 200 }}>
          <View
            style={{
              height: 50,
              backgroundColor: "green",
              width: uploadProgress * 2,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", flex: 1, marginTop: 15 }}>
              {uploadProgress}%
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <StatusBar backgroundColor={mainColor} barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: mainColor,
        }}
      >
        <Text style={{ fontSize: 30, color: lightColor }}>
          шинээр хоол нэмэх
        </Text>
        <Text style={{ fontSize: 16, color: lightColor, marginTop: 10 }}>
          Та хоолын мэдээллээ оруулна уу
        </Text>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        duration={800}
        style={{
          flex: 5,
          paddingHorizontal: 20,
          paddingVertical: 30,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: lightColor,
        }}
      >
        {loading || saving ? (
          <Spinner />
        ) : (
          <ScrollView>
            {serverError &&
              Alert.alert("Анхаар", serverError, [
                {
                  text: "Ойлглоо",
                  onPress: () => setServerError(null),
                },
              ])}

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button title="Хоолын зургийг сонгоно уу" onPress={pickImage} />
              {food.photo && (
                <Image
                  source={{ uri: food.photo }}
                  style={{ width: 100, height: 100 }}
                />
              )}
            </View>

            <FormText
              label="Хоолын нэрийг оруулна уу"
              placholder="Хоолын нэр"
              icon="food-open"
              value={food.name}
              onChangeText={checkName}
              errorText="Хоолын нэрийн урт дор хаяж 4-өөс 20 үсгээс тогтоно"
              errorShow={error.name}
            />

            <FormText
              label="Хоолын зохиогчийг оруулна уу"
              placholder="Зохиогчийн нэр"
              icon="user"
              value={food.author}
              onChangeText={checkAuthor}
              errorText="зохиогчийн нэрийн урт 5-15 үсгээс тогтоно"
              errorShow={error.author}
            />

            <FormText
              label="Хоолын үнийг оруулна уу"
              keyboardType="numeric"
              placholder="Хоолын үнэ"
              icon="dollar-sign"
              value={food.price}
              onChangeText={checkPrice}
              errorText="Хоолын үнэ 1000 төгрөгөөс дээш байна"
              errorShow={error.price}
            />

            <FormText
              label="Хоолын тайлбарыг оруулна уу"
              placholder="Тайлбар 1000 үсгээс хэтрэхгүй"
              icon="edit"
              multiline
              numberOfLines={10}
              value={food.content}
              onChangeText={checkContent}
              errorText="Хоолын тайлбар 10 - 1000 тэмдэгтээс тогтоно"
              errorShow={error.content}
            />

            <FormSwitch
              label="Бестселлер мөн эсэх"
              icon="trending-up"
              data={["Бестселлер мөн", "Бестселлер биш"]}
              value={food.bestseller}
              onValueChange={toggleBestseller}
            />

            <FormRadioButtons
              label="Хоолын категори :"
              value={food.category}
              icon="layers"
              data={categories.map((el) => el.name)}
              values={categories.map((el) => el.id)}
              onValueChange={(value, index) => {
                console.log(value);
                setFood({ ...food, category: value });
              }}
            />
            {/*
                <FormPicker
                label="Хоолын категори :"
                value={food.category}
                icon="layers"
                data={categories.map((el) => el.name)}
                values={categories.map((el) => el.id)}
                onValueChange={(value, index) => {
                  console.log(value);
                  setFood({ ...food, category: value });
                }}
              />
              */}

            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <MyButton
                title="Буцах"
                onPress={() => props.navigation.goBack()}
              />
              <MyButton title="Бүртгэх" onPress={sendFoodToServer} />
            </View>
          </ScrollView>
        )}
      </Animatable.View>
    </SafeAreaView>
  );
};

export default FoodAdd;

const styles = StyleSheet.create({});
