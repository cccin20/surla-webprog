import axios from "axios";
import constants from "../constants/constants";

const API = axios.create({
  baseURL: `${constants.HOST}/users`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export const fetchUsers = () => API.get("/");

export const createUser = (user) =>
  API.post("/", user);

export const registerUser = (user) =>
  API.post("/register", user);

export const updateUser = (id, user) =>
  API.put(`/${id}`, user);

export const deleteUser = (id) =>
  API.delete(`/${id}`);

export const loginUser = (credentials) =>
  API.post("/login", credentials);
