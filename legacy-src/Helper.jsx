import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import url from "./url";

const Interceptor = () => {

  const getAccessToken = () => localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const jwtInterceptor = axios.create();

  jwtInterceptor.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${getAccessToken()}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  jwtInterceptor.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await axios.get(`${url}/auth/refresh`, {
            'withCredentials': true,
          });
          const newAccessToken = response?.data?.accessToken;

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("username", response.data.username);

          jwtInterceptor.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

          return jwtInterceptor(originalRequest);

        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("username");
          navigate('/sign-in');
          toast.error("Please sign-in");
          return ;
        }
      }
      console.error("Request failed:", error);
      return Promise.reject(error);
    }
  );

  return jwtInterceptor;
}
export default Interceptor;
