import API from "../api/axiosInstance";

export const getProducts = async (page: number = 1) => {
            const { data } = await API.get(`/products?page=${page}`);

            return data;
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
