import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API,
});

export const BASE = import.meta.env.VITE_API;