import API from "./axiosInstance";

export const getNewAccessToken = async () => {
            const res = await API.post("/auth/refresh");
            return res.data.accessToken;
};
