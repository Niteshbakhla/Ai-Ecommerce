import axios from "axios";
import { store } from "../store/store";
import { setCredentials, logout } from "../store/slices/authSlices";

const API = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            withCredentials: true,
});

// Add access token to requests
API.interceptors.request.use((config) => {
            const token = store.getState().auth.accessToken;
            if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
});

// Try to refresh token when expired
API.interceptors.response.use(
            (res) => res,
            async (error) => {
                        const originalRequest = error.config;

                        // If unauthorized due to expired token
                        if (error.response?.status === 401 && !originalRequest._retry) {
                                    originalRequest._retry = true;

                                    try {
                                                const res = await API.get("/auth/refresh");

                                                const newAccessToken = res.data.accessToken;
                                                const user = store.getState().auth.user;

                                                // Update redux
                                                store.dispatch(setCredentials({ user, accessToken: newAccessToken }));

                                                // Retry original request
                                                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                                                return API(originalRequest);

                                    } catch (err) {
                                                store.dispatch(logout());
                                    }
                        }

                        return Promise.reject(error);
            }
);

export default API;
