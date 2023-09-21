import axios from "axios";

export const axiosUserInstance=axios.create({
    baseURL: `http://localhost:4000`
})
export const axiosAdminInstance=axios.create({
    baseURL: `http://localhost:4000/admin`
})
export const axiosManagerInstance=axios.create({
    baseURL: `http://localhost:4000/manager`
})