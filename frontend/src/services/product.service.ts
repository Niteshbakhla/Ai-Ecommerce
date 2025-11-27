import API from "../api/axiosInstance";

export const getProducts = async (page: number = 1) => {
            const { data } = await API.get(`/products?page=${page}`);
           
            return data;
};
