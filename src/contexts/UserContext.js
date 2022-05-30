import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { restApiUrl } from "../../Constants";
import { Alert } from "react-native";

const UserContext = React.createContext();

export const UserStore = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await axios.get(`${restApiUrl}/api/v1/users/logout`);
    setIsLoggedIn(false);
    setToken(null);
    setEmail(null);
    setUserName(null);
    setUserRole(null);
  };

  const login = (email, password) => {
    axios
      .post(`${restApiUrl}/api/v1/users/login`, {
        email: email,
        password: password,
      })
      .then((result) => {
        console.log(
          "llllllllllllllllllllllllllllllllll",
          result.data.user.cart
        );
        setId(result.data.user._id);
        setCart([...result.data.user.cart]);
        // console.log("cart: ", result.data.data.cart.items);
        loginUserSuccessful(
          result.data.token,
          email,
          result.data.user.name,
          result.data.user.role
        );
      })
      .catch((err) => {
        Alert.alert(err.message);
        loginFailed(err.message);
      });
  };

  const signUp = (name, email, password) => {
    axios
      .post(`${restApiUrl}/api/v1/users/register`, {
        name: name,
        email: email,
        password: password,
        role: "user",
      })
      .then((result) => {
        console.log(result.data);
        loginUserSuccessful(result.data.token, email, name, "user");
        Alert.alert(name + " нэртэй хэрэглэгч амжилттай бүртгэгдлээ");
      })
      .catch((err) => {
        loginFailed(err.response.data.error.message);
      });
  };

  const loginUserSuccessful = async (token, email, userName, userRole) => {
    setToken(token);
    setEmail(email);
    setUserName(userName);
    setUserRole(userRole);
    setIsLoggedIn(true);

    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ token, userName, email, userRole })
      );
    } catch {
      (err) => {
        console.log("Утас руу хадгалж чадсангүй");
      };
    }
  };

  const loginFailed = (error) => {
    console.log(error);
    setIsLoggedIn(false);
    setEmail(null);
    setUserName(null);
    setUserRole(null);
  };
  // console.log("--------===============------------------", cart);

  return (
    <UserContext.Provider
      value={{
        cart,
        setCart,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        login,
        userRole,
        setUserRole,
        userName,
        setUserName,
        email,
        setEmail,
        signUp,
        logout,
        isLoading,
        setIsLoading,
        id,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
