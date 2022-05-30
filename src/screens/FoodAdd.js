import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Image,
  // Button,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { Button } from "react-native-paper";
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
    name: "Burger",
    photo: "nophoto.jpg",
    author: "Beka",
    rating: 6,
    content: "Бургерийг үхрийн махар хийвэл илүү амттай болдог.",
    ingredients:
      "1кг үхрийн мах, бургерийн булочка 4ш, бяслаг, улаан лооль, хүрэн сонгино, майонез, кетчуп",
    steps:
      "Махыг татна. Котлет шиг бөөрөнхийлнө. Хэт чанга базаж болохгүй. Давс цацна. Амтлахгүй. Котлетийг 8-10 минут шарна. Нэг удаа эргүүлнэ. Бургерийг бэлдэнэ: талхан дээр кетчуп түрхээд бусад орцоо тавина. ",
    calorie: 123,
    bestseller: false,
    balance: null,
    time: 30,
    category: null,
    video: "novideo",
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
    if (event.total === 0) setUploadTotal(event.total);

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

          // props.navigation.navigate("Detail", { food: newFood._id });
          props.navigation.navigate("Home", { food: newFood._id }) &&
            props.navigation.navigate("UserFoods", { userFoods: newFood._id });
        })
        .catch((err) => {
          if (err.response) {
            setServerError(err.response.data.error);
          } else {
            setServerError(err.message);
          }
        })
        .finally(() => {
          setSaving(false);
        });
    } else {
      Alert.alert("Та хоолны категорийг сонгоно уу");
    }
  };

  const [error, setError] = useState({
    name: false,
    video: false,
    author: false,
    rating: false,
    content: false,
    ingredients: false,
    steps: false,
    calorie: false,
    bestseller: true,
    time: false,
    balance: false,
  });

  const checkName = (text) => {
    setError({
      ...error,
      name: text.length < 5 || text.length > 50,
    });
    setFood({ ...food, name: text });
  };

  const checkVideo = (text) => {
    setError({
      ...error,
      video: text.length < 5,
    });
    setFood({ ...food, video: text });
  };

  const checkAuthor = (text) => {
    setError({
      ...error,
      author: text.length < 5 || text.length > 15,
    });
    setFood({ ...food, author: text });
  };

  const checkRating = (text) => {
    setFood({ ...food, rating: text });
  };
  const checkTime = (text) => {
    setFood({ ...food, time: text });
  };

  const checkContent = (text) => {
    setError({
      ...error,
      content: text.length < 5 || text.length > 1000,
    });
    setFood({ ...food, content: text });
  };

  const checkIngredients = (text) => {
    setError({
      ...error,
      ingredients: text.length < 5 || text.length > 1000,
    });
    setFood({ ...food, ingredients: text });
  };

  const checkSteps = (text) => {
    setError({
      ...error,
      steps: text.length < 5 || text.length > 1000,
    });
    setFood({ ...food, steps: text });
  };

  const checkCalorie = (text) => {
    setFood({ ...food, calorie: text });
  };

  const toggleBestseller = () => {
    setFood({
      ...food,
      bestseller: !food.bestseller,
    });
  };

  const checkBalance = (text) => {
    setFood({ ...food, balance: text });
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
        <Text style={{ fontSize: 20, color: "#33324D" }}>
          Шинээр хоол нэмэх
        </Text>
        <Text style={{ fontSize: 16, color: "#33324D", marginTop: 5 }}>
          Та хоолын мэдээллээ оруулна уу
        </Text>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        duration={800}
        style={{
          flex: 9,
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
              <Button
                mode="outlined"
                color="#05375a"
                style={{ height: 40 }}
                onPress={pickImage}
              >
                Хоолны зургийг сонгоно уу
              </Button>
              {food.photo && (
                <Image
                  source={{ uri: food.photo }}
                  style={{ width: 100, height: 100 }}
                />
              )}
            </View>

            <FormText
              label="Хоолын нэрийг оруулна уу"
              placeholder="Хоолын нэр"
              icon="edit"
              value={food.name}
              onChangeText={checkName}
              errorText="Хоолны нэрийн урт дор хаяж 4-өөс 20 үсгээс тогтоно"
              errorShow={error.name}
            />

            <FormText
              label="Хоолны зохиогчийг оруулна уу"
              placeholder="Зохиогчийн нэр"
              icon="user"
              value={food.author}
              onChangeText={checkAuthor}
              errorText="зохиогчийн нэрийн урт 5-15 үсгээс тогтоно"
              errorShow={error.author}
            />

            <FormText
              label="Хоолны бичлэгийн линк-ийг оруулна уу"
              placeholder="https://www.youtube.com/embed/ формат"
              icon="play-circle"
              value={food.video}
              onChangeText={checkVideo}
              errorText="Хоолны нэрийн урт дор хаяж 4-өөс 20 үсгээс тогтоно"
              errorShow={error.video}
            />

            <FormText
              label="Хоолны рэйтингийг оруулна уу"
              keyboardType="numeric"
              placeholder="Хоолны рэйтинг тоон утгатай"
              icon="star"
              value={food.rating}
              onChangeText={checkRating}
              errorText="Хоолны рэйтинг 0-10ийн хооронд байх ёстой "
              errorShow={error.rating}
            />

            <FormText
              label="Хоолны тайлбарыг оруулна уу"
              placeholder="Тайлбар 1000 үсгээс хэтрэхгүй"
              icon="edit"
              multiline
              numberOfLines={10}
              value={food.content}
              onChangeText={checkContent}
              errorText="Хоолны тайлбар 10 - 1000 тэмдэгтээс тогтоно"
              errorShow={error.content}
            />

            <FormText
              label="Хоолны орцыг оруулна уу"
              placeholder="Орц 1000 үсгээс хэтрэхгүй"
              icon="edit"
              multiline
              numberOfLines={10}
              value={food.ingredients}
              onChangeText={checkIngredients}
              errorText="Хоолны орц 10 - 1000 тэмдэгтээс тогтоно"
              errorShow={error.ingredients}
            />

            <FormText
              label="Хоол хийх дарааллыг оруулна уу"
              placeholder="1000 үсгээс хэтрэхгүй"
              icon="edit"
              multiline
              numberOfLines={10}
              value={food.steps}
              onChangeText={checkSteps}
              errorText="Хоол хийх дарааллын тайлбар 10 - 1000 тэмдэгтээс тогтоно"
              errorShow={error.steps}
            />

            <FormText
              label="Хоолны калорийн хэмжээг оруулна уу"
              keyboardType="numeric"
              placeholder="Хоолны калори тоон утгатай"
              icon="edit"
              value={food.calorie}
              onChangeText={checkCalorie}
              errorText="Хоолны калори нь тоо байх ёстой "
              errorShow={error.calorie}
            />

            <FormSwitch
              label="Бестселлер мөн эсэх"
              icon="trending-up"
              data={["Бестселлер мөн", "Бестселлер биш"]}
              value={food.bestseller}
              onValueChange={toggleBestseller}
            />

            <FormText
              label="Хоолны балансын хэмжээг оруулна уу"
              keyboardType="numeric"
              placeholder="Хоолны баланс"
              icon="edit"
              value={food.balance}
              onChangeText={checkBalance}
              errorText="Хоолны баланс нь тоо байх ёстой "
              errorShow={error.balance}
            />
            <FormText
              label="Хоол хийхэд зарцуулагдах хугацааг оруулна уу"
              keyboardType="numeric"
              placeholder="Хоол хийх хугацаа (Минутаар)"
              icon="clock"
              value={food.time}
              onChangeText={checkTime}
              errorShow={error.time}
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
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            >
              <Button
                onPress={() => props.navigation.goBack()}
                mode="outlined"
                color="#05375a"
                style={{ height: 40 }}
              >
                Буцах
              </Button>
              <Button
                onPress={sendFoodToServer}
                mode="outlined"
                color="#05375a"
                style={{ height: 40 }}
              >
                Бүртгэх
              </Button>
            </View>
          </ScrollView>
        )}
      </Animatable.View>
    </SafeAreaView>
  );
};

export default FoodAdd;

const styles = StyleSheet.create({});
