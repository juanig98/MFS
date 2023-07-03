import axios from "axios";
import.meta.env; 

const clientApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// client.interceptors.request.use((req) => {

// });
// client.interceptors.response.use((response) => response.data);

export default clientApi;
