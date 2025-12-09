import mongoose from "mongoose";
import Cart from "../models/cart.model";
import Product from "../models/product.model"
import AppError from "../utils/customError";


export const getUserCart = async (userId: string) => {
            return Cart.findOne({ userId }).populate("items.productId");
}

export const addToCart = async (userId: string, productId: string) => {


            const product = await Product.findById(productId);
            if (!product) throw new AppError("product not found ", 404);

            let cart = await Cart.findOne({ userId });

            const productObjectId = new mongoose.Types.ObjectId(productId);

            if (!cart) {
                        cart = await Cart.create({ userId, items: [{ productId: productObjectId, quantity: 1 }] });
            } else {
                        const item = cart.items.find((i) => i.productId.toString() === productId);
                        if (item) item.quantity += 1;
                        else cart.items.push({ productId: productObjectId, quantity: 1 });

                        await cart.save();
            }

            return cart.populate("items.productId");

}

export const removeCartItem = async (userId: string, productId: string) => {
            const cart = await Cart.findOne({ userId });
            if (!cart) throw new AppError("cart not found", 404);

            cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
            await cart.save();

            return cart.populate("items.productId");
}

export const clearCart = async (userId: string) => {
            return Cart.findOneAndDelete({ userId });
}

export const updateQuantity = async (
            userId: string,
            productId: string,
            change: number
) => {
            const cart = await Cart.findOne({ userId });

            if (!cart) return;

            const item = cart.items.find(
                        (i: any) => i.productId.toString() === productId
            );

            if (!item) return;

            const newQty = item.quantity + change;

            // If quantity would go below 1 -> remove item
            if (newQty < 1) {
                        await Cart.updateOne(
                                    { userId },
                                    { $pull: { items: { productId } } }
                        );
                        return;
            }

            // Just update the quantity
            await Cart.updateOne(
                        {
                                    userId,
                                    "items.productId": productId,
                        },
                        {
                                    $set: {
                                                "items.$.quantity": newQty,
                                    },
                        }
            );
};
