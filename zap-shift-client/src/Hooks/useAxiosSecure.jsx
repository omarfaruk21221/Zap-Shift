import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // interceptor add
    const interceptor = axiosSecure.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`; // ✅ fixed typo
      }
      return config;
    });
    // interceptor respon
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.status;
        if (statusCode == 401 || statusCode == 403) {
          signOutUser().then(() => {
            navigate("/signin");
          });
        }
        return Promise.reject(error);
      }
    );

    // cleanup old interceptor to prevent duplicates
    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [signOutUser, user]);

  return axiosSecure;
};

export default useAxiosSecure;
