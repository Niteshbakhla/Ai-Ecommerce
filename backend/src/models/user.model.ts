import mongoose, { Model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";


export interface IUser extends Document {
            name: string,
            email: string,
            password: string,
            recentWishlist: mongoose.Types.ObjectId[];
            createdAt: Date,
            updatedAt: Date,
}

const userSchema = new Schema<IUser>(
            {
                        name: { type: String, required: true, lowercase: true },
                        email: {
                                    type: String,
                                    required: true,
                                    unique: true,
                                    lowercase: true,
                                    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
                        },
                        password: {
                                    type: String,
                                    required: true,
                                    select: false
                        },

                        recentWishlist: [{
                                    type: Schema.Types.ObjectId, ref: "Product"
                        }]
            },
            { timestamps: true }
)

// Hashing password before saving 
userSchema.pre("save", async function (next) {
            if (!this.isModified("password")) return next();
            this.password = await bcrypt.hash(this.password, 10)
            next();
});

// Compare password 
userSchema.methods.comparePassword = async function (password: string) {
            return await bcrypt.compare(password, this.password);
}

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;