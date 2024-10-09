"use strict";

import { getMe } from "./requests.js";

function checkToken() {
    const token = localStorage.getItem("token")

    if(!token) {
        localStorage.clear()
        window.location.href = "./login.html"
    }
}
//  CHECK TOKEN
checkToken()

const data = await getMe()
console.log(data)



