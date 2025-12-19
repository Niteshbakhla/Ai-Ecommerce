import API from "./axiosInstance"


export const getUserOrder = async () => {
            const { data } = await API.get("/orders")
            return data
}

export const getOrderForAdmin = async () => {
            const { data } = await API.get("/orders/user-order");

            return data;
}