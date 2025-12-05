import API from "../api/axiosInstance";

export const getNewAccessToken = async () => {
            const res = await API.post("/auth/refresh");
            console.log("frontend Response", res.data);
            return res.data.accessToken;
};
