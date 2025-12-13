import type { Product } from "@/types/adminTypes";
import API from "./axiosInstance"

export const createProduct = async (productData: Product) => {
            const { data } = await API.post("/", productData);
            return data;
};


export const deleteProduct = async (id: string) => {

            const { data } = await API.delete(`/products/${id}`)
            return data;
}