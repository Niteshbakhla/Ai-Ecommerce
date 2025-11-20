import mongoose, { Document, Schema } from "mongoose";

export interface Address {
            street?: string;
            city?: string;
            state?: string;
            country?: string;
            pincode?: string;
            phone?: string;
}

export interface IUser extends Document {
            name: string;
            email: string;
            password: string;
            role: "user" | "admin";
            addresses?: Address[];
            wishlist?: mongoose.Types.ObjectId[];
            lastLogin?: Date;
}

const userSchema = new Schema<IUser>(
            {
                        name: { type: String, required: true },

                        email: { type: String, required: true, unique: true },

                        password: { type: String, required: true },

                        role: { type: String, enum: ["user", "admin"], default: "user" },

                        addresses: [
                                    {
                                                street: String,
                                                city: String,
                                                state: String,
                                                country: String,
                                                pincode: String,
                                                phone: String,
                                    },
                        ],

                        wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],

                        lastLogin: Date,
            },
            { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
