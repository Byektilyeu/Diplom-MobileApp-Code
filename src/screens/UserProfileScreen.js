import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import * as Animatable from "react-native-animatable";
import { Button } from "react-native-paper";
import { lightColor, mainColor, restApiUrl, textColor } from "../../Constants";
import FormText from "../components/FormText";
// import MyButton from "../components/MyButton";
import UserContext from "../contexts/UserContext";
import axios from "axios";

const UserProfileScreen = (props) => {
  const state = useContext(UserContext);
  console.log({ state });

  const [user, setUser] = useState({
    id: state.id,
    userName: state.userName,
    email: state.email,
    userRole: state.userRole,
    token: state.token,
  });

  const updateUserProfile = () => {
    axios
      .put(
        `${restApiUrl}/api/v1/users/${user.id}`,
        {
          name: user.userName,
          email: user.email,
        },
        {
          headers: { Authorization: "Bearer " + user.token },
        }
      )
      .then((result) => {
        // console.log(
        //   "=================================================",
        //   result.data.data.name
        // );
        // props.navigation.navigate("Home", { userName: result.data.data.name });
        Alert.alert(`Хэрэглэгчийн мэдээлэл амжилттай солигдлоо`);
      })
      .catch((err) => console.log(err.message));
  };

  const checkName = (text) => {
    setUser({ ...user, userName: text });
  };

  const checkEmail = (text) => {
    setUser({ ...user, email: text });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <StatusBar backgroundColor={mainColor} barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 20,
          backgroundColor: mainColor,
        }}
      >
        <Text style={{ fontSize: 18, color: textColor }}>
          Хэрэглэгчийн хувийн мэдээлэл
        </Text>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        duration={800}
        style={{
          flex: 20,
          paddingHorizontal: 20,
          paddingVertical: 30,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: lightColor,
        }}
      >
        <ScrollView>
          <FormText
            label="Хэрэглэгчийн  нэр"
            placholder="Хэрэглэгчийн нэр"
            icon="user"
            value={user.userName}
            onChangeText={checkName}
          />

          <FormText
            label="Хэрэглэгчийн и-мэйл хаяг"
            placholder="Хэрэглэгчийн и-мэйл хаяг"
            icon="mail"
            value={user.email}
            onChangeText={checkEmail}
          />

          <FormText
            label="Хэрэглэгчийн role"
            placholder="Хэрэглэгчийн role"
            icon="user-check"
            value={user.userRole}
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
              onPress={updateUserProfile}
              mode="outlined"
              color="#05375a"
              style={{ height: 40 }}
            >
              Өөрчлөх
            </Button>

            {/* <MyButton title="Буцах" onPress={() => props.navigation.goBack()} />
            <MyButton title="Өөрчлөх" onPress={updateUserProfile} /> */}
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({});
