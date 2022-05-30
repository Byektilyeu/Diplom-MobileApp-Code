import { StyleSheet, Text, ScrollView, View, Image, Alert } from "react-native";
import React, { useState, useContext } from "react";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../contexts/UserContext";
import { Button } from "react-native-paper";

const SignUpScreen = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const state = useContext(UserContext);

  const signupHandler = () => {
    setError(null);
    if (password1 !== password2) {
      Alert.alert("Нууц үгнүүд хоорондоо таарахгүй байна");
      return;
    }

    if (name.length === 0) {
      Alert.alert("Та нэрээ бичнэ үү");
      return;
    }

    state.signUp(name, email, password1);
  };

  return (
    <View>
      <Image
        style={{ width: "100%", height: "30%" }}
        source={require("../../assets/Images/signUp.jpg")}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginTop: 10,
          color: "gray",
        }}
      >
        Шинээр бүртгүүлэх
      </Text>

      {error && (
        <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
          {error}
        </Text>
      )}

      <MyInput
        value={name}
        placeholder="та нэрээ оруулна уу"
        onChangeText={setName}
      />

      <MyInput
        value={email}
        keyboardType="email-address"
        placeholder="та имэйл хаягаа оруулна уу"
        onChangeText={setEmail}
      />

      <MyInput
        value={password1}
        secureTextEntry={true}
        placeholder="та нууц үгээ оруулна уу"
        onChangeText={setPassword1}
      />
      <MyInput
        value={password2}
        secureTextEntry={true}
        placeholder="та нууц үгээ давтан оруулна уу"
        onChangeText={setPassword2}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        {/* <MyButton title="Буцах" onPress={() => navigation.goBack()} />
        <MyButton title="Бүртгүүлэх" onPress={signupHandler} /> */}
        <Button
          onPress={() => navigation.goBack()}
          mode="outlined"
          color="#05375a"
          style={{ height: 40 }}
        >
          Буцах
        </Button>
        <Button
          onPress={signupHandler}
          mode="outlined"
          color="#05375a"
          style={{ height: 40 }}
        >
          Бүртгүүлэх
        </Button>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
