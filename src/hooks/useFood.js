import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

export default (foodId) => {
  const [food, setFood] = useState(null);
  const [error, setError] = useState(null);
  // console.log(id);

  const state = useContext(UserContext);

  const loadFood = async () => {
    try {
      const result = await axios.get(
        `http://10.0.0.103:8000/api/v1/foods/${foodId}`
      );
      setFood(result.data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteFood = (foodId) => {
    return axios.delete(`http://10.0.0.103:8000/api/v1/foods/${foodId}`, {
      headers: { Authorization: "Bearer " + state.token },
    });
  };

  useEffect(() => {
    loadFood();
  }, []);
  return [food, error, deleteFood];
};
