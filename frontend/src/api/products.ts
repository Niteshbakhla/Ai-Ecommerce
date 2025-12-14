import type { ProductFormData } from "@/types/adminTypes";
import API from "./axiosInstance"
import type { UpdateProductPayload } from "@/types/productTypes";

export const createProduct = async (productData: ProductFormData) => {

            const { data } = await API.post("/products", productData);
            return data;
};


export const deleteProduct = async (id: string) => {

            const { data } = await API.delete(`/products/${id}`)
            return data;
}




export const updateProduct = async ({
            id,
            updateData,
}: UpdateProductPayload) => {
            const { data } = await API.patch(`/products/${id}`, updateData);
            return data;
};