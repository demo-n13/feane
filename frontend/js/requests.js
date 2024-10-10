import { axiosCustom } from "../config/axios.config.js";

export const getAllCategories = async () => {
  const allCategories = await axiosCustom.get("/categories");

  return allCategories.data;
};

export const getAllFoods = async () => {
  const allFoods = await axiosCustom.get("/foods");

  return allFoods.data;
};

export const getAllFoodsByCategoryId = async (categoryId) => {
  const allFoods = await axiosCustom.get(`/foods/${categoryId}`);

  return allFoods.data;
};

export const getAllReviews = async () => {
  const allReviews = await axiosCustom.get("/reviews");

  return allReviews.data;
};

export const getMe = async () => {
  try {
    const data = await axiosCustom.get("/me");
    localStorage.setItem("user", JSON.stringify(data.data));
    return data.data;
  } catch (error) {
    if (error.status == 422) {
      window.alert("Token already expired");
      localStorage.clear();
      window.location.href = "./login.html";
    }
  }
};

export const refresh = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axiosCustom.post("/auth/refresh", { refreshToken });
    localStorage.setItem("token", response?.data?.accessToken);
    localStorage.setItem("refreshToken", response?.data?.refreshToken);

    axiosCustom.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response?.data?.accessToken}`;

    window.location.reload();
  } catch (error) {
    localStorage.clear();
    window.location.href = "./login.html";
  }
};
