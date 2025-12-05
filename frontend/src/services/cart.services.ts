import API from "@/api/axiosInstance";


export const addToCartProduct = async (productId: string) => {
            const { data } = await API.post(`/cart`, { productId });
            console.log(data)
            return data;
}


export const getUserCarts = async () => {
            const { data } = await API.get("/cart")
            return data.carts;
}



export const updateCartQuantity = async (itemId: string, quantity: number) => {
            const res = await API.patch(`/cart/${itemId}`, { quantity });
            return res.data;
};

export const removeCartItem = async (itemId: string) => {
            const res = await API.delete(`/cart/${itemId}`);
            return res.data;
};