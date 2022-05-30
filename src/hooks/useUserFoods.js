import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { restApiUrl } from "../../Constants";
import UserContext from "../contexts/UserContext";

export default (categoryId, searchServerValue, refreshCategory, setRefresh) => {
  const [foods, setFoods] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  //   const [categoryid, setCategoryid] = useState(null);

  const state = useContext(UserContext);
  const searchFood = (searchValue) => {
    console.log(searchValue + "tulhuur ugeer search ehellee");
  };

  useEffect(() => {
    let limit = 30;
    let search = "";

    if (searchServerValue) {
      limit = 50;
      search = `&search=${searchServerValue}`;
    }

    setLoading(true);

    axios
      .get(`${restApiUrl}/api/v1/users/${state.id}/foods`)
      .then((result) => {
        console.log("hoolnuudiig amjillttai huleej avlaa ");
        setFoods(result.data.data);
        // setCategoryid(result.data.data.category._id);
        setErrorMessage(null);
        setLoading(false);
        setRefresh(false);
      })
      .catch((err) => {
        setLoading(false);
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Уучлаарай сэрвэр дээр энэ өггөдөл байхгүй байна";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу";
        setErrorMessage(message);
      });
  }, [categoryId, searchServerValue, refreshCategory]);

  return [foods, errorMessage, searchFood, loading];
};
