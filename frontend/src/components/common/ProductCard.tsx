import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface Props {
            product: {
                        _id: string;
                        title: string;
                        price: number;
                        images: string[];
                        ratingsAverage?: number;
            };
}

export default function ProductCard({ product }: Props) {
            const [isWishlisted, setIsWishlisted] = useState(false);

            return (
                        <Card className="group relative overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-xl transition-all ">

                                    {/* Wishlist Button */}
                                    <button
                                                onClick={() => setIsWishlisted(!isWishlisted)}
                                                className="absolute top-3 right-3 z-10 rounded-full bg-white p-1.5 shadow hover:scale-110 transition"
                                    >
                                                <Heart
                                                            className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                                                                        }`}
                                                />
                                    </button>

                                    {/* Product Image */}
                                    <Link to={`/product/${product._id}`} className="block overflow-hidden">
                                                <img
                                                            src={product.images?.[0]}
                                                            alt={product.title}
                                                            className="h-52 w-full object-cover transition-transform group-hover:scale-110"
                                                />
                                    </Link>

                                    {/* Rating Badge */}
                                    {product.ratingsAverage && (
                                                <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-semibold text-black shadow-md">
                                                            <Star className="h-3 w-3 fill-black text-black" />
                                                            {product.ratingsAverage.toFixed(1)}
                                                </div>
                                    )}

                                    {/* Content */}
                                    <CardContent className="space-y-3 p-4">
                                                <h3 className="font-semibold text-base line-clamp-1 group-hover:text-blue-600">
                                                            {product.title}
                                                </h3>

                                                <p className="text-lg font-bold text-gray-800">
                                                            ₹{product.price.toLocaleString()}
                                                </p>

                                                {/* Add to Cart + View Buttons */}
                                                <div className="flex gap-2">
                                                            <Button className="flex-1 flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 shadow-md">
                                                                        <ShoppingCart className="h-4 w-4" />
                                                                        Add
                                                            </Button>

                                                            <Button asChild variant="outline" className="flex-1">
                                                                        <Link to={`/product/${product._id}`}>View</Link>
                                                            </Button>
                                                </div>
                                    </CardContent>
                        </Card>
            );
}
