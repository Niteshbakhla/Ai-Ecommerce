import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

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
            comparePassword(password: string): Promise<boolean>;
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

userSchema.pre("save", async function (next) {
            if (!this.isModified("password")) return next();
            this.password = await bcrypt.hash(this.password, 10)
            next();
})

userSchema.methods.comparePassword = async function (password: string) {
            return await bcrypt.compare(password, this.password);
}

export default mongoose.model<IUser>("User", userSchema);
