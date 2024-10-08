import { axiosCustom } from "../config/axios.config.js"

export const getAllCategories = async () => {
    const allCategories = await axiosCustom.get("/categories");

    return allCategories.data
}

export const getAllFoods = async () => {
    const allFoods = await axiosCustom.get("/foods");

    return allFoods.data
}

export const getAllFoodsByCategoryId = async (categoryId) => {
    const allFoods = await axiosCustom.get(`/foods/${categoryId}`);

    return allFoods.data
}


export const getAllReviews = async () => {
    const allReviews = await axiosCustom.get("/reviews");

    return allReviews.data
}
