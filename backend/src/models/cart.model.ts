import mongoose, { Schema, Model, Document } from "mongoose";

interface IItems {
            productId: mongoose.Types.ObjectId;
            quantity: number
}

interface ICart extends Document {
            userId: mongoose.Types.ObjectId;
            items: IItems[];
            createdAt: Date;
            updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
            {
                        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
                        items: [{
                                    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                                    quantity: { type: Number, default: 1 }
                        }]
            },
            {
                        timestamps: true
            }
)

const Cart: Model<ICart> = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;