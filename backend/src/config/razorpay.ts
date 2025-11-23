import Razorpay from "razorpay";
import config from "./config";

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = config;

const razorpayInstance = new Razorpay({
            key_id: RAZORPAY_KEY_ID as string,
            key_secret: RAZORPAY_KEY_SECRET as string,
});

export default razorpayInstance;
