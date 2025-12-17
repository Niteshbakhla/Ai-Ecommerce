import API from "@/api/axiosInstance";
import { getProducts } from "@/api/product.api";
import { useQuery } from "@tanstack/react-query";

export const useAdminOverviewQuery = () =>
            useQuery({
                        queryKey: ["admin", "overview"],
                        queryFn: async () => {
                                    const res = await API.get("/admin/analytics/overview");
                                    return {
                                                revenue: res.data.totalRevenue,
                                                orders: res.data.totalOrders,
                                                customers: res.data.totalCustomers,
                                    };
                        },
            });

export const useAdminSalesQuery = () =>
            useQuery({
                        queryKey: ["admin", "sales"],
                        queryFn: async () => {
                                    const res = await API.get("/admin/analytics/sales");
                                    console.log(res.data, "hey I am getting something")
                                    return res.data;
                        },
            });

export const useAdminTopProductsQuery = () =>
            useQuery({
                        queryKey: ["admin", "top-products"],
                        queryFn: async () => {
                                    const res = await API.get("/admin/analytics/top-products");
                                    return res.data;
                        },
            });

export const useAdminInventoryQuery = () =>
            useQuery({
                        queryKey: ["admin", "inventory"],
                        queryFn: async () => {
                                    const res = await API.get("/admin/analytics/inventory");
                                    return res.data;
                        },
            });

export const useAdminCustomersQuery = () =>
            useQuery({
                        queryKey: ["admin", "customers"],
                        queryFn: async () => {
                                    const res = await API.get("/admin/analytics/customers");
                                    return res.data;
                        },
            });

export const useProducts = (page: number, search: string) => {
            return useQuery({
                        queryKey: ["products", page, search],
                        queryFn: () => getProducts(page, search),
            });
};