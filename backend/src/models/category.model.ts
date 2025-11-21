import mongoose, { Schema, Model, Document } from "mongoose";

interface ICategory extends Document {
            name: string;
            description?: string;
            bannerImage?: string
}

const categorySchema = new Schema<ICategory>({
            name: { type: String, required: true, unique: true },
            description: String,
            bannerImage: String,
}, { timestamps: true });


const Category: Model<ICategory> = mongoose.model<ICategory>("Category", categorySchema);
export default Category;

