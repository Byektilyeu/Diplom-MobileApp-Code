import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState, useContext, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { List } from "react-native-paper";
import FormRadioButtons from "../components/FormRadioButtons";

import { lightColor, mainColor, restApiUrl, textColor } from "../../Constants";
import FormText from "../components/FormText";
import MyButton from "../components/MyButton";
import useCategory from "../hooks/useCategory";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
const CategoryScreen = (props) => {
  const [isVisible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  let [categories, errorMessage, loading] = useCategory();
  // const [categories, setCategories] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading1, setLoading1] = useState(true);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [categoryDescription, setCategoryDescription] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState(null);
  const [newCategoryDescription, setNewCategoryDescription] = useState(null);
  // const [categoriesLen, setCategoriesLen] = useState(null);

  useEffect(() => {
    setRefresh(false);
  }, [refresh]);

  // const getCategories =() => {
  //   axios
  //   .get(`${restApiUrl}/api/v1/categories`)
  //   .then((result) => {
  //     console.log("catergoriiig amjillttai huleej avlaa ");
  //     setCategories(result.data.data);
  //   })
  //   .catch((err) => {
  //     let message = err.message;
  //     if (message === "Request failed with status code 404")
  //       message = "Уучлаарай сэрвэр дээр энэ өггөдөл байхгүй байна";
  //     else if (message === "Network Error")
  //       message =
  //         "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу";
  //     setErrorMessage(message);
  //   });
  // }

  const addCategory = () => {
    setSaving(true);
    axios
      .post(`${restApiUrl}/api/v1/categories`, {
        name: newCategoryName,
        description: newCategoryDescription,
        photo: "photo.jpg",
      })
      .then((result) => {
        // setCategoryName(result.data.data);
        // setCategoriesLen(categories.length + 1);
        setNewCategoryName(null);
        setNewCategoryDescription(null);
        props.navigation.navigate("Home", {
          addCateg: result.data.data,
        });
        // Alert.alert("Категори амжилттай хадгалагдлаа");
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
  };

  const getCategory = async (id) => {
    const result = await axios.get(`${restApiUrl}/api/v1/categories/${id}`);
    setCategoryId(result.data.data.id);
    setCategoryName(result.data.data.name);
    setCategoryDescription(result.data.data.description);
  };

  const updateCategory = (id) => {
    axios
      .put(`${restApiUrl}/api/v1/categories/${id}`, {
        name: categoryName,
        description: categoryDescription,
      })
      .then((result) => {
        setCategoryName(result.data.data.name);
        setCategoryDescription(result.data.data.description);
        Alert.alert("Amjilttai");
      })
      .catch((err) => {
        Alert.alert("Aldaa garlaa" + err.message);
      });
    setRefresh(true);
  };

  const deleteCategory = (id) => {
    axios
      .delete(`${restApiUrl}/api/v1/categories/${id}`)
      .then((result) => {
        Alert.alert("Amjilttai ustgagdlaa" + result.data.data.name);
        // setCategoriesLen(categories.length - 1);
        setVisible(false);
      })
      .catch((err) => {
        Alert.alert("aldaa garlaa" + err.message);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <StatusBar backgroundColor={mainColor} barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          marginTop: 10,
          marginBottom: -25,
          paddingHorizontal: 20,
          backgroundColor: mainColor,
        }}
      >
        <Text style={{ fontSize: 20, color: textColor }}>Категори</Text>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        duration={200}
        style={{
          flex: 10,
          paddingHorizontal: 5,
          // paddingVertical: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: lightColor,
        }}
      >
        <ScrollView>
          <ScrollView>
            <Text style={{ textAlign: "center", fontSize: 17, marginTop: 10 }}>
              Одоо байгаа категориуд
            </Text>

            <TableView>
              <Section>
                <Cell
                  cellContentView={
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row",
                        flex: 1,
                      }}
                    >
                      <Text
                        allowFontScaling
                        numberOfLines={1}
                        style={{ flex: 1, fontSize: 13, fontWeight: "bold" }}
                      >
                        Категорийн нэрс
                      </Text>
                      <Feather name="edit-3" size={22} color="black" />
                    </View>
                  }
                />
                {categories.map((category1, index) => (
                  // <View>
                  <Cell
                    cellContentView={
                      <View
                        style={{
                          alignItems: "center",
                          flexDirection: "row",
                          flex: 1,
                        }}
                      >
                        <Text
                          allowFontScaling
                          numberOfLines={1}
                          style={{ flex: 1, fontSize: 13 }}
                        >
                          {index + 1}. {category1.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            getCategory(category1.id) && setVisible(true);
                          }}
                        >
                          <Feather name="edit-3" size={18} color="black" />
                        </TouchableOpacity>
                      </View>
                    }
                  />
                ))}
              </Section>
            </TableView>
          </ScrollView>

          <Modal
            style={{}}
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={() => {
              setVisible(false);
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                marginVertical: 20,
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 18 }}>
                Категорийн мэдээлэл
              </Text>
            </View>
            <TextInput
              label="Категорийн нэр"
              value={categoryName}
              onChangeText={(e) => setCategoryName(e)}
            />
            <TextInput
              label="Категорийн тайлбар"
              value={categoryDescription}
              onChangeText={(e) => setCategoryDescription(e)}
            />
            {/* <Text>{categoryName}</Text> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
                marginHorizontal: 20,
              }}
            >
              <Button
                onPress={() => {
                  setVisible(false);
                }}
                mode="outlined"
                color="#05375a"
                style={{ height: 40 }}
              >
                Буцах
              </Button>
              <Button
                onPress={() => {
                  updateCategory(categoryId);
                }}
                mode="outlined"
                color="#05375a"
                style={{ height: 40 }}
              >
                Өөрчлөх
              </Button>

              <Button
                onPress={() => {
                  deleteCategory(categoryId);
                }}
                mode="outlined"
                color="#05375a"
                style={{ height: 40 }}
              >
                Устгах
              </Button>
            </View>
          </Modal>
          <View style={{ marginLeft: 8 }}>
            <Text style={{ textAlign: "center", fontSize: 17 }}>
              Шинэ категори нэмэх
            </Text>

            <FormText
              label="Категорийн нэр"
              placholder="Категорийн нэр"
              icon="edit"
              onChangeText={(e) => setNewCategoryName(e)}
            />
            <FormText
              label="Категорийн тайлбар"
              placholder="Категорийн тайлбар"
              icon="edit"
              onChangeText={(e) => setNewCategoryDescription(e)}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: 20,
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
                onPress={addCategory}
                mode="outlined"
                color="#05375a"
                style={{ height: 40 }}
              >
                Нэмэх
              </Button>
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
