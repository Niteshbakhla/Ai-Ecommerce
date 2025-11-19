import mongoose, { Schema, Model, Document } from "mongoose";

export interface IProduct extends Document {
            title: string;
            description: string;
            price: number;
            images: string[];
            category: mongoose.Types.ObjectId;
            stock: number;
            ratingsAverage: number;
            ratingsCount: number;
            isFeatured: boolean;
            embeddingVector: number[];
            createdBy: mongoose.Types.ObjectId;
            createdAt: Date;
            updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
            {
                        title: { type: String, required: true },

                        description: { type: String, required: true },

                        price: { type: Number, required: true },

                        images: [{ type: String }], // Cloudinary URLs

                        category: { type: Schema.Types.ObjectId, ref: "Category" },

                        stock: { type: Number, default: 0 },

                        ratingsAverage: {
                                    type: Number,
                                    default: 0,
                                    min: 0,
                                    max: 5,
                        },

                        ratingsCount: { type: Number, default: 0 },

                        isFeatured: { type: Boolean, default: false },

                        embeddingVector: { type: [Number] },

                        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
            },
            { timestamps: true }
);

productSchema.index({ title: "text", description: "text" });
productSchema.index({ price: 1 });
productSchema.index({ category: 1 });
productSchema.index({ ratingAverage: -1 });

export const Product: Model<IProduct> =
            mongoose.model<IProduct>("Product", productSchema);

export default Product;
