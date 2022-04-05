import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const UserContext = React.createContext();

export const UserStore = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await axios.get(`http://10.0.0.103:8000/api/v1/users/logout`);
    setIsLoggedIn(false);
    setToken(null);
    setEmail(null);
    setUserName(null);
    setUserRole(null);
  };

  const login = (email, password) => {
    axios
      .post(`http://10.0.0.103:8000/api/v1/users/login`, {
        email: email,
        password: password,
      })
      .then((result) => {
        console.log(result.data);
        loginUserSuccessful(
          result.data.token,
          email,
          result.data.user.name,
          result.data.user.role
        );
      })
      .catch((err) => {
        loginFailed(err.response.data.error.message);
      });
  };

  const signUp = (name, email, password) => {
    axios
      .post(`http://10.0.0.103:8000/api/v1/users/register`, {
        name: name,
        email: email,
        password: password,
        role: "admin",
      })
      .then((result) => {
        console.log(result.data);
        loginUserSuccessful(result.data.token, email, name, "admin");
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

  return (
    <UserContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
