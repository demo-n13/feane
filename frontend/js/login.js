"use strict";

import { axiosCustom } from "../config/axios.config.js";

const formEl = document.querySelector(".login-form")

async function submitLoginForm(e) {
    e.preventDefault();

    const phone = e.target.phone.value;
    const email = e.target.email.value;

    const data = { email, phone };

    try {
        const response = await axiosCustom.post("/auth/login", data);
        localStorage.setItem("token", response?.data?.accessToken)
        localStorage.setItem("refreshToken", response?.data?.refreshToken)

        axiosCustom.defaults.headers.common['Authorization'] = `Bearer ${response?.data?.accessToken}`
        window.location.href = "./index.html"
    } catch (error) {
        error?.response?.data?.message && alert(error?.response?.data?.message)
    }
}

formEl.addEventListener("submit", submitLoginForm)