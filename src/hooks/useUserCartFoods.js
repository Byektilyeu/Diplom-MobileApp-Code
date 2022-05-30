import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { restApiUrl } from "../../Constants";
import UserContext from "../contexts/UserContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default (searchServerValue, refreshCategory, setRefresh) => {
  const [cartFoods, setCartFoods] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  //   const [categoryid, setCategoryid] = useState(null);

  const state = useContext(UserContext);
  const searchFood = (searchValue) => {
    console.log(searchValue + "tulhuur ugeer search ehellee");
  };

  // const getcartfoods = async () => {
  //   try {
  //     state.cart.map((el) => {
  //       let result = await axios.get(`${restApiUrl}/api/v1/foods/${el.foodId}`);
  //       console.log("hoolnuudiig amjillttai huleej avlaa ", el.foodId);
  //       setCartFoods(...cartFoods, result.data.data);
  //       setErrorMessage(null);
  //       setLoading(false);
  //       setRefresh(false);
  //     })
  //   } catch (err) {
  //     setLoading(false);
  //     let message = err.message;
  //     if (message === "Request failed with status code 404")
  //       message = "Уучлаарай сэрвэр дээр энэ өггөдөл байхгүй байна";
  //     else if (message === "Network Error")
  //       message =
  //         "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу";
  //     setErrorMessage(message);
  //   }
  // };

  useEffect(() => {
    // getcartfoods();
  }, []);

  //   axios
  //     .get(`${restApiUrl}/api/v1/foods/${el.foodId}`)
  //     .then((result) => {
  //       console.log("hoolnuudiig amjillttai huleej avlaa ", el.foodId);
  //       setCartFoods(...cartFoods, result.data.data);
  //       // setCartFoods(...result.data.data);
  //       // setCategoryid(result.data.data.category._id);
  //       setErrorMessage(null);
  //       setLoading(false);
  //       setRefresh(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       let message = err.message;
  //       if (message === "Request failed with status code 404")
  //         message = "Уучлаарай сэрвэр дээр энэ өггөдөл байхгүй байна";
  //       else if (message === "Network Error")
  //         message =
  //           "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу";
  //       setErrorMessage(message);
  //     })
  // );

  // let limit = 30;
  // let search = "";

  // if (searchServerValue) {
  //   limit = 50;
  //   search = `&search=${searchServerValue}`;
  // }

  // setLoading(true);

  //  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<---------->", ccc);
  // console.log(
  //   "((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((",
  //   state.id
  // );

  // axios
  //   .get(`${restApiUrl}/api/v1/users/${state.id}`)
  //   .then((result) => {
  //     setCartItems(result.data.data.cart.items);
  //     // console.log(
  //     //   "carts_____________________________________________________________________________________________________________________________________________________________________: ",
  //     //   result.data.data.cart.items
  //     // );
  //   })
  //   .catch((err) => Alert.alert("aldaa garlaa cart", err.message));

  // console.log(
  //   "carts_____________________________________________________________________________________________________________________________________________________________________: ",
  //   state.cart
  // );

  // const fourHiArray = [];

  // setCartFoods(fourHiArray);

  // const cart = state.cart;
  // for (let i = 0; i < cart.length; i++) {

  // console.log(
  //   "fooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooood ",
  //   foods
  // );
  // }

  return [cartFoods, errorMessage, searchFood, loading];
};
