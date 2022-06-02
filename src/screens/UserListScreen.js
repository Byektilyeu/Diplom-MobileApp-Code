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
import { Feather } from "@expo/vector-icons";

import { lightColor, mainColor, restApiUrl, textColor } from "../../Constants";
import FormText from "../components/FormText";
import MyButton from "../components/MyButton";
import useCategory from "../hooks/useCategory";
import axios from "axios";
const CategoryScreen = (props) => {
  const [isVisible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userCreatedAt, setUserCreatedAt] = useState(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${restApiUrl}/api/v1/users`)
      .then((result) => {
        setUsers(result.data.data);
      })
      .catch((err) => Alert.alert(" aldaa garlaa : ", err.message));
  }, []);

  const getUser = async (id) => {
    const result = await axios.get(`${restApiUrl}/api/v1/users/${id}`);
    setUserId(result.data.data._id);
    setUserName(result.data.data.name);
    setUserEmail(result.data.data.email);
    setUserRole(result.data.data.role);
    setUserCreatedAt(result.data.data.createdAt);
  };

  const updateUser = (id) => {
    axios
      .put(`${restApiUrl}/api/v1/users/${id}`, {
        name: userName,
        email: userEmail,
        role: userRole,
        createdAt: userCreatedAt,
      })
      .then((result) => {
        setUserName(result.data.data.name);
        Alert.alert("Amjilttai");
      })
      .catch((err) => {
        Alert.alert("Aldaa garlaa" + err.message);
      });
    setRefresh(true);
  };

  const deleteUser = (id) => {
    axios
      .delete(`${restApiUrl}/api/v1/users/${id}`)
      .then((result) => {
        Alert.alert("Amjilttai ustgagdlaa" + result.data.data.name);
        setVisible(false);
      })
      .catch((err) => {
        Alert.alert("aldaa garlaa" + err.message);
      });
  };

  return (
    // <View style={{ marginTop: 50 }}>
    //   {users.map((el) => (
    //     <Text>{el.name}</Text>
    //   ))}
    // </View>
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <StatusBar backgroundColor={mainColor} barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingVertical: 15,
          backgroundColor: mainColor,
        }}
      >
        <Text style={{ fontSize: 18, color: textColor }}>Хэрэглэгчид</Text>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        duration={200}
        style={{
          flex: 20,
          backgroundColor: lightColor,
        }}
      >
        <ScrollView>
          {/* <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10 }}>
            Хэрэглэгчдийн жагсаалт
          </Text> */}

          <TableView style={{ marginTop: -15 }}>
            <Section>
              <Cell
                cellContentView={
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <Text style={{ flex: 1, fontSize: 15, fontWeight: "bold" }}>
                      Нэрс:
                    </Text>

                    <Feather name="edit" size={20} color="black" />
                  </View>
                }
              />
              {users.map((user, index) => (
                <Cell
                  cellContentView={
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                      }}
                    >
                      <Text style={{ flex: 1, fontSize: 15 }}>
                        {index + 1}. {user.name}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          getUser(user._id) && setVisible(true);
                        }}
                      >
                        <Feather name="edit-3" size={20} color="black" />
                      </TouchableOpacity>
                    </View>
                  }
                />
              ))}
            </Section>
          </TableView>
        </ScrollView>
        <ScrollView>
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
                Хэрэглэгчийн мэдээлэл
              </Text>
            </View>
            <TextInput
              label="Хэрэглэгчийн нэр"
              value={userName}
              onChangeText={(e) => setUserName(e)}
            />
            <TextInput
              label="Хэрэглэгчийн и-мэйл"
              value={userEmail}
              onChangeText={(e) => setUserEmail(e)}
            />
            <TextInput
              label="Хэрэглэгчийн role"
              value={userRole}
              onChangeText={(e) => setUserRole(e)}
            />
            <TextInput
              label="Хэрэглэгч бүртгэгдсэн хугацаа"
              value={userCreatedAt}
              onChangeText={(e) => setUserCreatedAt(e)}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
                marginHorizontal: 10,
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
                  updateUser(userId);
                }}
                mode="outlined"
                color="#05375a"
                style={{ height: 40 }}
              >
                Өөрчлөх
              </Button>

              <Button
                onPress={() => {
                  deleteUser(userId);
                }}
                mode="outlined"
                color="#05375a"
                style={{ height: 40 }}
              >
                Устгах
              </Button>
            </View>
          </Modal>

          {/* <MyButton title="Буцах" onPress={() => props.navigation.goBack()} /> */}
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
