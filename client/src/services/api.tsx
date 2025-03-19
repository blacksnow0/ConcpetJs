import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL as string;

if (!baseURL) {
  throw new Error(
    "VITE_API_BASE_URL is not defined in the environment variables."
  );
}

const API = axios.create({
  baseURL,
});

// eslint-disable-next-line react-refresh/only-export-components
export const AUTHENTICATED_API = axios.create({
  baseURL,
  withCredentials: true,
});

export default API;
