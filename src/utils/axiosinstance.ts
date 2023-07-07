import axios from "axios";

function createAxiosInstance() {
    const token = window.localStorage.getItem("token");
    if (token) {
        return createInstanceWithAuth();
    } else {
        return createInstanceWithoutAuth();
    }
}

// トークンを使用するインスタンス
function createInstanceWithAuth() {
    const instance = axios.create({
        baseURL: "http://localhost:8080/api",
    });

    instance.interceptors.request.use((config) => {
        const token = window.localStorage.getItem("token");
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
    });

    return instance;
}

// トークンを使用しないインスタンス
function createInstanceWithoutAuth() {
    console.log("createInstanceWithoutAuth");
    return axios.create({
        baseURL: "http://localhost:8080/api",
    });
}

export { createAxiosInstance };
