import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { restApiUrl } from "../../Constants";

export default (foodId) => {
  const [food, setFood] = useState(null);
  const [error, setError] = useState(null);
  // console.log(id);

  const state = useContext(UserContext);

  const loadFood = async () => {
    try {
      const result = await axios.get(`${restApiUrl}/api/v1/foods/${foodId}`);
      setFood(result.data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteFood = (foodId) => {
    return axios.delete(`${restApiUrl}/api/v1/foods/${foodId}`, {
      headers: { Authorization: "Bearer " + state.token },
    });
  };

  // const updateFood = (
  //   name,
  //   photo,
  //   author,
  //   rating,
  //   content,
  //   steps,
  //   ingredients,
  //   calorie,
  //   video
  // ) => {
  //   axios
  //     .put(
  //       `${restApiUrl}/api/v1/foods/${foodId}`,
  //       {
  //         name: name,
  //         photo: photo,
  //         author: author,
  //         rating: rating,
  //         content: content,
  //         steps: steps,
  //         calorie: calorie,
  //         ingredients: ingredients,
  //         video: video,
  //       },
  //       {
  //         headers: { Authorization: "Bearer " + state.token },
  //       }
  //     )
  //     .then((result) => {
  //       console.log(result);
  //       this.setState({
  //         ...result.data.data,
  //         error: null,
  //         loading: false,
  //         success: "Амжилттай хадгалагдлаа",
  //       });
  //     })
  //     .catch((err) => {
  //       this.setState({
  //         error: err.response.data.error.message,
  //         loading: false,
  //       });
  //     });
  // };

  useEffect(() => {
    loadFood();
  }, []);
  return [food, error, deleteFood];
};
