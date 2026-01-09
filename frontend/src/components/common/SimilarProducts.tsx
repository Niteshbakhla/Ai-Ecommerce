import type { SimilarType } from "@/types/adminTypes";
import { useNavigate } from "react-router-dom"

type SimilarProductsProps = {
            similar: SimilarType[];
};



const SimilarProducts = ({ similar }: SimilarProductsProps) => {
          
            const navigate = useNavigate();
            return (
                        <div className="mt-16">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                                Similar Products
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                                {similar.map((p: any) => (
                                                            <button
                                                                        key={p._id}
                                                                        onClick={() => navigate(`/product/${p._id}`)}
                                                                        className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                                                            >
                                                                        <div className="aspect-square bg-gray-100 overflow-hidden">
                                                                                    <img
                                                                                                src={p.images[0]}
                                                                                                alt={p.title}
                                                                                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                                                    />
                                                                        </div>
                                                                        <div className="p-4 space-y-2">
                                                                                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 text-left">
                                                                                                {p.title}
                                                                                    </h3>
                                                                                    <p className="text-lg font-bold text-gray-900 text-left">
                                                                                                ₹{p.price.toLocaleString()}
                                                                                    </p>
                                                                        </div>
                                                            </button>
                                                ))}
                                    </div>
                        </div>
            )
}

export default SimilarProducts