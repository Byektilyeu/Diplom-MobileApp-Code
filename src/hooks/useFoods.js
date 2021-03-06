import { useState, useEffect } from "react";
import axios from "axios";
import { restApiUrl } from "../../Constants";

export default (categoryId, searchServerValue, refreshCategory, setRefresh) => {
  const [foods, setFoods] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

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
      .get(
        `${restApiUrl}/api/v1/categories/${categoryId}/foods?limit=${limit}${search}`
      )
      .then((result) => {
        console.log("hoolnuudiig amjillttai huleej avlaa useFoods ");
        setFoods(result.data.data);
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
