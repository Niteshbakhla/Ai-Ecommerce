import API from "../axiosInstance";

interface RegisterUser {
            name: string;
            email: string;
            password: string
}

interface LoginUser {
            email: string;
            password: string
}

export const registerUser = (data: RegisterUser) => API.post("/auth/register", data);

export const loginUser = (data: LoginUser) => API.post("/auth/login", data);