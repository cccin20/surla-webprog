import axios from "axios";
import constants from "../constants/constants";

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

export const fetchArticles = () => API.get("/");
export const fetchPublishedArticles = () =>
  API.get("/", { params: { status: "published" } });
export const createArticle = (newArticle) => API.post("/", newArticle);
export const updateArticle = (id, updatedArticle) =>
  API.put(`/${id}`, updatedArticle);
export const deleteArticle = (id) => API.delete(`/${id}`);
