import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const apiClient = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const fetchProducts = async () => (await apiClient.get("/products")).data;
export const fetchProduct = async (id) => (await apiClient.get(`/products/${id}`)).data;
export const submitRFQ = async (payload) => (await apiClient.post("/rfq", payload)).data;
export const submitContact = async (payload) => (await apiClient.post("/contact", payload)).data;
