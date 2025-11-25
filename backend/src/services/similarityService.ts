import natural from "natural";
import Product from "../models/product.model";



export const getSimilarProducts = async (productId: string, limit = 5) => {
            const products = await Product.find().select("searchText");

            const target = products.find((p) => p._id.toString() === productId);
            if (!target) throw new Error("Product not found");

            const tfidf = new natural.TfIdf();

            products.forEach((p) => tfidf.addDocument(p.searchText));

            const scores: { id: string; score: number }[] = [];

            tfidf.tfidfs(target.searchText, (i, score) => {
                        const current = products[i];
                        if (current._id.toString() !== productId) {
                                    scores.push({ id: current._id.toString(), score });
                        }
            });

            scores.sort((a, b) => b.score - a.score);

            const topIds = scores.slice(0, limit).map((s) => s.id);

            return Product.find({ _id: { $in: topIds } });
};
