import type { IOrder } from "@/types/orderTypes";
import API from "./axiosInstance"



export const getAllUserOrders = async (): Promise<IOrder[]> => {
            const res = await API.get("/orders");
            console.log(res.data)
            return res.data;
}
