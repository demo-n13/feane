"use strict";

import { axiosCustom } from "../config/axios.config.js";

const formEl = document.querySelector(".register-form")

async function submitRegisterForm(e) {
    e.preventDefault();

    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const name = e.target.name.value;


    const data = { email, phone, name };

    try {
        const response = await axiosCustom.post("/auth/register", data);
        localStorage.setItem("token", response?.data?.accessToken)
        localStorage.setItem("refreshToken", response?.data?.refreshToken)
        axiosCustom.defaults.headers.common['Authorization'] = `Bearer ${response?.data?.accessToken}`
        window.location.href = "./index.html"
    } catch (error) {
        error?.response?.data?.message && alert(error?.response?.data?.message)
    }
}

formEl.addEventListener("submit", submitRegisterForm)