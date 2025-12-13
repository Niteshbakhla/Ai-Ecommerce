import API from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useAdminOverviewQuery = () =>
            useQuery({
                        queryKey: ["admin", "overview"],
                        queryFn: async () => {
                                    const res = await API.get("/admin/analytics/overview");
                                    return res.data;
                        },
            });

export const useAdminSalesQuery = () =>
            useQuery({
                        queryKey: ["admin", "sales"],
                        queryFn: async () => {
                                    const res = await API.get("/admin/analytics/sales");
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
