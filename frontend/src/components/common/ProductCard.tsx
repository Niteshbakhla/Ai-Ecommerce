import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
            product: {
                        _id: string;
                        title: string;
                        price: number;
                        images: string[];
                        ratingsAverage?: number;
            };
            onAddToCart?: () => void;
            onProductClick?: () => void;
}

export default function ProductCard({ product, onAddToCart }: Props) {
            const [isWishlisted, setIsWishlisted] = useState(false);
            const navigate = useNavigate();
            return (
                        <Card className="group relative overflow-hidden border-0 bg-gray-50 hover:bg-white transition-all duration-300 ">

                                    {/* Wishlist Button */}
                                    <button
                                                onClick={() => setIsWishlisted(!isWishlisted)}
                                                className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                                <Heart
                                                            className={`h-5 w-5 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-gray-600"
                                                                        }`}
                                                />
                                    </button>

                                    {/* Product Image */}
                                    <button onClick={() => navigate(`/product/${product._id}`)} className="block w-full cursor-pointer">
                                                <div className="aspect-square overflow-hidden bg-white">
                                                            <img
                                                                        src={product.images?.[0]}
                                                                        alt={product.title}
                                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            />
                                                </div>
                                    </button>

                                    {/* Content */}
                                    <CardContent className="p-4 space-y-2 ">
                                                <button  className="text-left w-full">
                                                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-gray-600 transition-colors">
                                                                        {product.title}
                                                            </h3>
                                                </button>

                                                <div className="flex items-center justify-between">
                                                            <p className="text-lg font-semibold text-gray-900">
                                                                        ₹{product.price.toLocaleString()}
                                                            </p>

                                                            {product.ratingsAverage && (
                                                                        <span className="text-xs text-gray-500">
                                                                                    ★ {product.ratingsAverage.toFixed(1)}
                                                                        </span>
                                                            )}
                                                </div>

                                                {/* Add to Cart Button */}
                                                <Button
                                                            onClick={onAddToCart}
                                                            className="w-full bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                                                            size="sm"
                                                >
                                                            Add to Cart
                                                </Button>
                                    </CardContent>
                        </Card>
            );
}