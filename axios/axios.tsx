import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://api-reactnative.onrender.com/api/products",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;
