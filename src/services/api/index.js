import axios from "axios";
import storage from "../storage";
import config from "../../config";


const request = axios.create({
    baseURL: config.API_ROOT,
    params: {},
});

request.interceptors.request.use((config) => {
    // const token = storage.get("token");
    // if (token) {
    //     config.headers['Authorization'] = `Bearer ${token}`
    // }
    return config;
}, (error) => {
    console.log(error)
});

request.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log('ERROR', error)
    return Promise.reject(error);
});

export {request};