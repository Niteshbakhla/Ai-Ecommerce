import API from "../api/axiosInstance";


export const getProducts = async (page: number = 1, search: string) => {
            const { data } = await API.get(`/products?page=${page}&search=${search}`);
            return data.products.items;
};

// Get single product
export const getProductById = async (id: string) => {
            const { data } = await API.get(`/products/${id}`);
            return data.products;
};

// Get similar products (AI)
export const getSimilarProducts = async (id: string) => {
            const { data } = await API.get(`/ai/similar/${id}`);
            return data;
};
