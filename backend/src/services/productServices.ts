import { FilterQuery } from "mongoose";
import Product, { IProduct } from "../models/product.model"


interface ListQuery {
            search?: string;
            category?: string;
            minPrice?: number;
            maxPrice?: number;
            sort?: string;
            page?: number;
            limit?: number;
}


export const createProduct = async (
            data: Partial<IProduct>,
            createdBy: string
): Promise<IProduct> => {
            const product = await Product.create({
                        ...data,
                        createdBy
            });

            return product;
}

export const getProductById = async (id: string): Promise<IProduct | null> => {
            return Product.findById(id).populate("category");
}


export const updateProduct = async (
            id: string,
            data: Partial<IProduct>
): Promise<IProduct | null> => {
            return Product.findByIdAndUpdate(id, data, { new: true })
}


export const deleteProduct = async (id: string): Promise<IProduct | null> => {
            return Product.findByIdAndDelete(id);
}

export const listProducts = async (query: ListQuery) => {
            const { search, category, minPrice, maxPrice, sort = "createdAt", page = 1, limit = 12 } = query;

            const filter: FilterQuery<IProduct> = {};

            if (search) {
                        if (search) {
                                    filter.title = { $regex: search, $options: "i" }; // case-insensitive
                        }

            }

            if (category) {
                        filter.category = category;
            }

            if (minPrice !== undefined || maxPrice !== undefined) {
                        filter.price = {};
                        if (minPrice !== undefined) filter.price.$gte = minPrice;
                        if (maxPrice !== undefined) filter.price.$lte = maxPrice
            }

            let sortOption: any = {};
            if (sort === "price_asc") sortOption.price = 1;   // low to high
            else if (sort === "price_desc") sortOption.price = -1; // high to low
            else if (sort === "rating") sortOption.ratingsAverage = -1; // highest rating first
            else sortOption.createdAt = -1; // latest first

            const skip = (page - 1) * limit;
            const [items, total] = await Promise.all([
                        Product.find(filter).sort(sortOption).skip(skip).limit(limit),
                        Product.countDocuments(filter),
            ]);


            return {
                        items,
                        total,
                        page,
                        totalPages: Math.ceil(total / limit),
            };


}