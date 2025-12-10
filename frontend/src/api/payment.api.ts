import API from "./axiosInstance";


// 👉 Create Razorpay checkout order
export const createCheckoutOrder = async (amount: number) => {
            const res = await API.post("/orders/create-checkout", { amount });
            return res.data;
};

// 👉 Verify Razorpay payment
export const verifyPayment = async (paymentData: any) => {
            const res = await API.post("/orders/verify-payment", paymentData);
            return res.data;
};
