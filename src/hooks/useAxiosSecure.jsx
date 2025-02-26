import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { userLogout } = UseAuth();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      if ([401, 403].includes(error.response?.status)) {
        await userLogout();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
