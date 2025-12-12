import API from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";


export const useAdminOverview = () => {
            return useQuery({
                        queryKey: ["admin-overview"],
                        queryFn: async () => {
                                    const res = await API.get("/admin/analytics/overview");
                                    return res.data;
                        }
            });
}