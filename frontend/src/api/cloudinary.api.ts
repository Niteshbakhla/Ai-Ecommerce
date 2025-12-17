import axios from "axios";
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from "../lib/cloudinary";


export const uploadImageToCloudinary = async (file: File) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

            const res = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
            console.log(res)
            return res.data.secure_url; // this is what we store in DB
};
