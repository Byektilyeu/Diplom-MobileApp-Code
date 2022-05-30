import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  // Button,
  Image,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import { WebView } from "react-native-webview";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import React, { useLayoutEffect, useContext, useState, useEffect } from "react";
import useFood from "../hooks/useFood";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import UserContext from "../contexts/UserContext";
import { restApiUrl } from "../../Constants";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const FoodDetailScreen = (props) => {
  const [isVisible, setVisible] = useState(false);
  const [foodId, setFoodId] = useState(null);
  const [food1, setFood1] = useState(null);
  const [show, setShow] = useState(false);
  // const [link, setLink] = useState(null);
  // foodsJs dotor baigaa food nii data ni params gedegeer propsoor ni orj irj bna
  // console.log("<--------------->", props.route.params.food);

  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const id = props.route.params.food;

  const handleUploadComplete = (event, id) => {
    console.log("Upload completed");
    setUploadProgress(0);
    setUploadTotal(0);
    // props.navigation.navigate("Detail", { food: id });
  };

  // const handleUploadProgress = (event) => {
  //   if (event.total === 0) setUploadTotal(event.total);

  //   setUploadProgress((uploadProgress) => {
  //     console.log("Upload total", uploadTotal);
  //     console.log("Upload progress", uploadProgress);
  //     return Math.round((event.loaded * 100) / event.total);
  //   });
  // };

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
      setFood1({ ...food1, photo: result.uri });
    }
  };

  const UploadPhoto = (id) => {
    console.log(
      "food1.createUser____________________________________",
      food1.createUser
    );
    console.log("state.id____________________________________", state.id);
    if (food1.createUser === state.id) {
      const fileUri = food1.photo;
      const fileExt = fileUri.substring(fileUri.lastIndexOf(".") + 1);
      food1.photo = `photo__${new Date().getTime()}.${fileExt}`;
      //xhr zurag upload hiih
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("load", (event) => handleUploadComplete(event, id));
      // xhr.upload.addEventListener("progress", handleUploadProgress);
      const data = new FormData();
      data.append("file", {
        uri: fileUri,
        type: `image/${fileExt}`,
        name: food1.photo,
      });
      xhr.open("PUT", `${restApiUrl}/api/v1/foods/${id}/photo`);
      xhr.send(data);
      Alert.alert("Зургийг амжилттай хадгаллаа");
    } else {
      Alert.alert(
        "Уучлаарай, Зургийг хадгалж чадсангүй. Та өөрийнхөө оруулсан хоолны жорын мэдээллийг л өөрчлөх боломжтой байна."
      );
    }
  };

  // console.log(id);
  const [food, error, deleteFood] = useFood(id);

  const checkName = (text) => {
    setFood1({ ...food1, name: text });
  };
  const checkAuthor = (text) => {
    setFood1({ ...food1, author: text });
  };
  const checkVideo = (text) => {
    setFood1({ ...food1, video: text });
  };
  const checkRating = (text) => {
    setFood1({ ...food1, rating: text });
  };
  const checkTime = (text) => {
    setFood1({ ...food1, time: text });
  };
  const checkContent = (text) => {
    setFood1({ ...food1, content: text });
  };
  const checkIngredients = (text) => {
    setFood1({ ...food1, ingredients: text });
  };
  const checkSteps = (text) => {
    setFood1({ ...food1, steps: text });
  };
  const checkCalorie = (text) => {
    setFood1({ ...food1, calorie: text });
  };

  const getFood = async () => {
    try {
      const result = await axios.get(`${restApiUrl}/api/v1/foods/${id}`);
      setFood1(result.data.data);
      // setError(null);
    } catch (err) {
      // setError(err.message);
      console.log(err.message);
    }
  };

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
          deleteFood(food1._id)
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

  const updateFood = (id) => {
    axios
      .put(`${restApiUrl}/api/v1/foods/${id}`, {
        name: food1.name,
        // photo: food1.photo,
        author: food1.author,
        rating: food1.rating,
        time: food1.time,
        content: food1.content,
        steps: food1.steps,
        calorie: food1.calorie,
        ingredients: food1.ingredients,
        video: food1.video,
      })
      .then((result) => {
        // setFood(result.data.data);

        props.navigation.navigate("Home", {
          updateFood: result.data.data,
        });

        setShow(false);
        // Alert.alert("Amjilttai");
      })
      .catch((err) => {
        Alert.alert("Aldaa garlaa" + err.message);
      });
    // setRefresh(true);
  };

  useEffect(() => {
    getFood();
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Feather
          name="menu"
          size={24}
          color="#33324D"
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

  if (!food1) {
    return null;
  }

  const linkVideo = food1.video;

  console.log("food1._id", id);

  const addToCart = () => {
    // setFoodId(food._id);
    axios
      .post(`${restApiUrl}/api/v1/users/add-to-cart`, {
        _id: id,
      })
      .then((result) => {
        console.log(
          "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
          result.data.data
        );
        Alert.alert("Таны картад амжилттай нэмэгдлээ");
        // props.navigation.navigate("Cart", {
        //   cart: result.data.data,
        // });
      })
      .catch((err) => console.log(err.message));
  };

  const deleteCartItem = () => {
    // setFoodId(food._id);
    axios
      .post(`${restApiUrl}/api/v1/users/delete-cart-item`, {
        _id: id,
      })
      .then((result) => {
        console.log(
          "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
          result.data.data
        );
        props.navigation.navigate("Home", {
          deleteCartItem: result.data.data,
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <ScrollView style={{ padding: 10 }} showsVerticalScrollIndicator={false}>
      {food1.photo.startsWith("/") ? (
        <Image
          style={{ width: 340, height: 400, alignSelf: "center" }}
          source={{
            uri: "https://data.internom.mn/media/images" + food1.photo,
          }}
        />
      ) : (
        <Image
          style={{ width: 340, height: 400, alignSelf: "center" }}
          source={{ uri: restApiUrl + "/upload/" + food1.photo }}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: 5,
          }}
        >
          <Feather name="heart" size={25} color="black" onPress={addToCart} />
          <Text style={{ fontSize: 20, fontWeight: "bold", paddingRight: 10 }}>
            +
          </Text>

          <MaterialCommunityIcons
            name="heart"
            size={27}
            color="black"
            onPress={deleteCartItem}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginRight: 5 }}>
            -
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Feather
            onPress={() =>
              food1.createUser === state.id
                ? setShow(true)
                : Alert.alert("Уучлаарай, Та өөрчлөх боломжгүй байна!!")
            }
            name="edit"
            size={22}
            color="black"
          />
          <MaterialCommunityIcons
            onPress={deleteOneFood}
            name="delete"
            size={25}
            color="black"
            style={{ paddingLeft: 10 }}
          />
        </View>

        {/* <Button
          title="Картанд хадгалах"
          color={lightColor}
          onPress={addToCart}
        /> */}
        {/* <Button title="Картаас хасах" onPress={deleteCartItem} /> */}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 2,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>{food1.name}</Text>

        <TouchableOpacity
          onPress={() => {
            if (linkVideo && linkVideo.startsWith("https://www.youtube.com/")) {
              setVisible(true);
            } else {
              Alert.alert("Уучлаарай бичлэг оруулаагүй хоолны жор байна");
            }
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                padding: 5,
                marginTop: -4,
              }}
            >
              Бичлэг үзэх
            </Text>
            <Feather name="play-circle" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <View>
          <Text
            style={{
              width: 50,
              textAlign: "center",
              fontSize: 11,
            }}
          >
            Жор
          </Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 2,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
          Зохиогч: {food1.author}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              padding: 5,
              marginTop: -4,
            }}
          >
            Рэйтинг: {food1.rating}
          </Text>
          <Feather name="star" size={10} color="black" />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 2,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
          Калори: {food1.calorie}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              padding: 5,
              marginTop: -4,
            }}
          >
            Бестселлер: {food1.bestseller ? "тийм" : "үгүй"}
          </Text>
        </View>
      </View>
      <Modal
        style={{}}
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={() => setVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            // borderWidth: 1,
            // borderColor: "#33324D",
            marginVertical: 20,
            // marginBottom: 300,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // marginHorizontal: 20,
              paddingHorizontal: 20,
              marginBottom: 20,
              // alignItems: "center",
            }}
          >
            {/* <Button
              // style={{ backgroundColor: "white" }}
              backgroundColor="black"
              color="black"
              title="< Буцах"
              onPress={() => {
                setVisible(false);
              }}
            /> */}
            <Text style={{ textAlign: "center", fontSize: 15 }}>
              {food1.name}
            </Text>
          </View>

          <WebView
            javaScriptEnabled={true}
            style={{
              flex: 1,
              borderColor: "black",
              borderWidth: 1,
              height: 400,
              width: 360,
            }}
            source={{
              uri: linkVideo,
            }}
          />

          <View style={{ marginHorizontal: 15 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
              <View>
                <Text style={{ width: 120, textAlign: "center", fontSize: 11 }}>
                  Хоолны орцууд
                </Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
            </View>
            <Text style={{ fontSize: 12, padding: 2 }}>
              {food1.ingredients}
            </Text>

            {/* {food.ingredients.map((el, index) => (
              <View style={{ marginTop: 4 }}>
                <Text
                  style={{
                    fontSize: 14,
                  }}
                >
                  {index + 1}. Орцны нэр: {el.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 16,
                  }}
                >
                  <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                    ширхэг/жин/: {el.quantity}
                  </Text>
                  <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                    төрөл: {el.type}
                  </Text>
                </View>
              </View>
            ))} */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
              <View>
                <Text style={{ width: 120, textAlign: "center", fontSize: 11 }}>
                  Хоол хийх дараалал
                </Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
            </View>

            <Text style={{ fontSize: 12, padding: 2 }}>{food1.steps}</Text>
          </View>

          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              paddingHorizontal: 30,
              marginTop: 30,
              // alignItems: "center",
            }}
          > */}
          {/* <RectButton
              title="close modal"
              onPress={() => {
                setVisible(false);
              }}
            />
            <Button
              title="Буцах"
              onPress={() => {
                setVisible(false);
              }}
            /> */}
          {/* </View> */}
        </View>
      </Modal>
      <Text
        style={{
          fontSize: 14,
          paddingHorizontal: 2,
          paddingVertical: 5,
        }}
      >
        Хоолны тайлбар: {food1.content}
      </Text>
      <Text
        style={{
          fontSize: 14,
          paddingHorizontal: 2,
          paddingVertical: 5,
        }}
      >
        Хоол хийхэд нийт зарцуулагдах хугацаа: {food1.time} мин
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <View>
          <Text style={{ width: 110, textAlign: "center", fontSize: 11 }}>
            Хоолны орцууд
          </Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>
      <Text style={{ fontSize: 12, padding: 2 }}>{food1.ingredients}</Text>
      {/* {food.ingredients.map((el, index) => (
        <View style={{ marginTop: 4 }}>
          <Text
            style={{
              fontSize: 14,
            }}
          >
            {index + 1}. Орцны нэр: {el.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 16,
            }}
          >
            <Text style={{ fontSize: 12, fontStyle: "italic" }}>
              ширхэг/жин/: {el.quantity}
            </Text>
            <Text style={{ fontSize: 12, fontStyle: "italic" }}>
              төрөл: {el.type}
            </Text>
          </View>
        </View>
      ))} */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <View>
          <Text style={{ width: 120, textAlign: "center", fontSize: 11 }}>
            Хоол хийх дараалал
          </Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>
      <View style={{ marginBottom: 40 }}>
        <Text style={{ fontSize: 12, padding: 2 }}>{food1.steps}</Text>
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginVertical: 20,
          paddingHorizontal: 30,
          marginBottom: 30,
        }}
      > */}
      {/* <View>
          <Button onPress={() => props.navigation.goBack()} title="Буцах" />
        </View> */}
      {/* 
        <View>
          <Button
            // onPress={() => updateFood(food1.id) && setShow(true)}
            onPress={() =>
              food1.createUser === state.id
                ? setShow(true)
                : Alert.alert("Уучлаарай, Та өөрчлөх боломжгүй байна!!")
            }
            title="Өөрчлөх"
            color="#E6E61B"
          />
        </View> */}
      {/* {state.userRole === "admin" && ( */}
      {/* <View>
          <Button onPress={deleteOneFood} title="Устгах" color="#FF3A3A" />
        </View>
        {/* )} */}
      {/* </View> */}
      <Modal
        style={{}}
        animationType="slide"
        transparent={false}
        visible={show}
        onRequestClose={() => {
          setShow(false);
        }}
      >
        <ScrollView>
          <View
            style={{
              backgroundColor: "#fff",
              marginVertical: 20,
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              Хоолны мэдээлэл
            </Text>
          </View>
          <View>
            <TextInput
              label="Хоолны нэр"
              value={food1.name}
              onChangeText={checkName}
            />
            {/* <Text>{food1.name}</Text> */}

            <TextInput
              label="Хоолны зохиогч"
              value={food1.author}
              onChangeText={checkAuthor}
            />
            <TextInput
              label="Хоолны бичлэгийн линк "
              value={food1.video}
              onChangeText={checkVideo}
            />
            <TextInput
              label="Хоолны рэйтинг"
              value={food1.rating}
              onChangeText={checkRating}
            />
            <TextInput
              label="Хугацаа(минутаар)"
              value={food1.time}
              onChangeText={checkTime}
            />
            <TextInput
              label="Хоолны тайлбар"
              value={food1.content}
              onChangeText={checkContent}
            />

            <TextInput
              label="Хоолны орц"
              value={food1.ingredients}
              onChangeText={checkIngredients}
            />
            <TextInput
              label="Хоол хийх дараалал"
              value={food1.steps}
              onChangeText={checkSteps}
            />
            <TextInput
              label="Хоол калорийн хэмжээ"
              value={food1.calorie}
              onChangeText={checkCalorie}
            />
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginVertical: 20,
              // justifyContent: "center",
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
            {food1.photo && (
              <Image
                source={{ uri: food1.photo }}
                style={{ width: 120, height: 120 }}
              />
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 20,
              marginHorizontal: 30,
            }}
          >
            {/* <Button
              onPress={() => {
                setShow(false);
              }}
              mode="outlined"
              color="#05375a"
              style={{ height: 40 }}
            >
              Буцах
            </Button> */}
            <Button
              onPress={() => UploadPhoto(food1.id)}
              mode="outlined"
              color="#05375a"
              style={{ height: 40 }}
            >
              Зургийг өөрчлөх
            </Button>
            <Button
              onPress={() => {
                updateFood(food1.id);
              }}
              mode="outlined"
              color="#05375a"
              style={{ height: 40 }}
            >
              Өөрчлөх
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

export default FoodDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
