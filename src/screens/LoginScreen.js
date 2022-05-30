import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useState, useContext } from "react";
import MyInput from "../components/MyInput";
// import MyButton from "../components/MyButton";
import UserContext from "../contexts/UserContext";
import { Button } from "react-native-paper";

const LoginScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const state = useContext(UserContext);

  const loginHandler = () => {
    if (email.length === 0) {
      Alert.alert("Та имэйл хаягаа бичнэ үү");
      return;
    }

    if (password.length === 0) {
      Alert.alert("Та нууц үгээ бичнэ үү");
      return;
    }

    state.login(email, password);
  };

  // AsyncStorage.getItem("user_token")
  //   .then((result) => setToken(result))
  //   .catch((err) => console.log(err.message));

  return (
    <View>
      <Image
        style={{ width: "100%", height: "50%" }}
        source={require("../../assets/Images/login.jpg")}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginTop: 10,
          color: "gray",
        }}
      >
        Нэвтрэх
      </Text>

      {error && (
        <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
          {error}
        </Text>
      )}

      <MyInput
        value={email}
        keyboardType="email-address"
        placeholder="та имэйл хаягаа оруулна уу"
        onChangeText={setEmail}
      />

      <MyInput
        value={password}
        secureTextEntry={true}
        placeholder="та нууц үгээ оруулна уу"
        onChangeText={setPassword}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        <Button
          onPress={() => navigation.goBack()}
          mode="outlined"
          color="#05375a"
          style={{ height: 40 }}
        >
          Буцах
        </Button>
        <Button
          onPress={loginHandler}
          mode="outlined"
          color="#05375a"
          style={{ height: 40 }}
        >
          Нэвтрэх
        </Button>
        {/* <MyButton title="Буцах" onPress={() => navigation.goBack()} />
        <MyButton title="Нэвтрэх" onPress={loginHandler} /> */}
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
