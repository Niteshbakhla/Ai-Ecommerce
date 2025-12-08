import API from "@/api/axiosInstance";


// Get reviews for product
export const getReviews = async (productId: string) => {
            const res = await API.get(`/reviews/${productId}`);
            return res.data;
};

// Add or update review
export const addOrUpdateReview = async (productId: string, data: any) => {
            const res = await API.post(`/reviews/${productId}`, data);
            return res.data;
};

// Delete review
export const deleteReview = async (reviewId: string) => {
            const res = await API.delete(`/reviews/${reviewId}`);
            return res.data;
};
