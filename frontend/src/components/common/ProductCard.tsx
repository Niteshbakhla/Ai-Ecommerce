import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart,Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCartProduct, getUserCarts, removeCartItem } from "@/api/cart.services";
import toast from "react-hot-toast";

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
interface CartItem {
            _id: string;
            quantity: number;
            productId: {
                        _id: string;
                        title: string;
                        price: number;
                        images: string[];
            };
}

interface CartResponse {
            items: CartItem[];
}



export default function ProductCard({ product }: Props) {
            const [isWishlisted, setIsWishlisted] = useState(false);
            const navigate = useNavigate();
            const queryClient = useQueryClient();
            const { data: cartData } = useQuery<CartResponse>({
                        queryKey: ["cart"],
                        queryFn: getUserCarts,
            });

            const isInCart = (productId: string) =>
                        cartData?.items?.some((item: CartItem) => item.productId?._id === productId);


            const userCartMutate = useMutation({
                        mutationFn: addToCartProduct,
                        onSuccess(data) {
                                    toast.success(data.message);
                                    queryClient.invalidateQueries({ queryKey: ["cart"] });

                        },
            });

            const removeCartMutation = useMutation({
                        mutationFn: removeCartItem,
                        onSuccess(data) {
                                    toast.success(data.message)
                                    queryClient.invalidateQueries({ queryKey: ["cart"] })
                        }

            })

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
                                                <button className="text-left w-full">
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

                                                {isInCart(product._id) ? (
                                                            <div className="flex items-center gap-2">
                                                                        {/* Go to Cart */}
                                                                        <Button
                                                                                    onClick={() => navigate("/cart")}
                                                                                    className="flex-1 bg-gray-700 text-white hover:bg-gray-800"
                                                                                    size="sm"
                                                                        >
                                                                                    Go to cart
                                                                        </Button>

                                                                        {/* Small Delete Button */}
                                                                        <Button
                                                                                    onClick={() => removeCartMutation.mutate(product._id)}
                                                                                    variant="outline"
                                                                                    size="icon"
                                                                                    className="h-8 w-8 p-0 border-gray-300 hover:bg-red-50 hover:text-red-600"
                                                                        >
                                                                                    <Trash2 />
                                                                        </Button>
                                                            </div>
                                                ) : (
                                                            <Button
                                                                        onClick={() => userCartMutate.mutate(product._id)}
                                                                        className="w-full bg-gray-900 text-white hover:bg-gray-800"
                                                                        size="sm"
                                                            >
                                                                        Add to Cart
                                                            </Button>
                                                )}

                                    </CardContent>
                        </Card>
            );
}