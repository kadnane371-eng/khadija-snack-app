import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

const fallbackBaseUrl = "http://192.168.1.37:3000";

const resolvedBaseUrl =
  process.env.EXPO_PUBLIC_API_URL ||
  Constants.expoConfig?.extra?.API_URL ||
  fallbackBaseUrl;

const api = axios.create({
  baseURL: resolvedBaseUrl.replace(/\/$/, ""),
  timeout: 10000,
});

export default api;