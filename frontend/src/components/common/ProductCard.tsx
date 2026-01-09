import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Loader2, Trash2, ShoppingCart, Star } from "lucide-react";
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
                        <Card className="group relative overflow-hidden border-2 border-border bg-card hover:border-primary hover:shadow-xl transition-all duration-300 rounded-2xl">

                                    {/* Wishlist Button */}
                                    <button
                                                onClick={() => setIsWishlisted(!isWishlisted)}
                                                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-card/90 backdrop-blur-sm border-2 border-border opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:border-primary shadow-md"
                                    >
                                                <Heart
                                                            className={`h-4 w-4 transition-colors ${isWishlisted
                                                                                    ? "fill-destructive text-destructive"
                                                                                    : "text-muted-foreground hover:text-destructive"
                                                                        }`}
                                                />
                                    </button>

                                    {/* Product Image */}
                                    <button onClick={() => navigate(`/product/${product._id}`)} className="block w-full cursor-pointer">
                                                <div className="aspect-square overflow-hidden bg-linear-to-br from-muted to-card relative">
                                                            <img
                                                                        src={product.images?.[0]}
                                                                        alt={product.title}
                                                                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 p-4"
                                                            />
                                                            {/* Overlay on hover */}
                                                            <div className="absolute inset-0 bg-linear-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                    </button>

                                    {/* Content */}
                                    <CardContent className="p-5 space-y-3">
                                                <button
                                                            onClick={() => navigate(`/product/${product._id}`)}
                                                            className="text-left w-full"
                                                >
                                                            <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-relaxed">
                                                                        {product.title}
                                                            </h3>
                                                </button>

                                                <div className="flex items-center justify-between">
                                                            <p className="text-xl font-bold text-primary">
                                                                        ₹{product.price.toLocaleString()}
                                                            </p>

                                                            {product.ratingsAverage && (
                                                                        <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                                                                                    <Star className="h-3 w-3 fill-chart-4 text-chart-4" />
                                                                                    {product.ratingsAverage.toFixed(1)}
                                                                        </span>
                                                            )}
                                                </div>

                                                {/* Add to Cart Button */}

                                                {isInCart(product._id) ? (
                                                            <div className="flex items-center gap-2">
                                                                        {/* Go to Cart */}
                                                                        <Button
                                                                                    onClick={() => navigate("/cart")}
                                                                                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md hover:shadow-lg transition-all  rounded-xl"
                                                                                    size="sm"
                                                                        >
                                                                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                                                                    Go to Cart
                                                                        </Button>

                                                                        {/* Small Delete Button */}
                                                                        <Button
                                                                                    onClick={() => removeCartMutation.mutate(product._id)}
                                                                                    variant="outline"
                                                                                    size="icon"
                                                                                    className="h-9 w-9 p-0 border-2 border-border hover:bg-red-50 hover:text-destructive hover:border-destructive rounded-xl transition-all "
                                                                        >
                                                                                    {removeCartMutation.isPending ? (
                                                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                                                    ) : (
                                                                                                <Trash2 className="h-4 w-4" />
                                                                                    )}
                                                                        </Button>
                                                            </div>
                                                ) : (
                                                            <Button
                                                                        onClick={() => userCartMutate.mutate(product._id)}
                                                                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md hover:shadow-lg transition-all  rounded-xl"
                                                                        size="sm"
                                                            >
                                                                        {userCartMutate.isPending ? (
                                                                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                                        ) : (
                                                                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                                                        )}
                                                                        {userCartMutate.isPending ? "Adding..." : "Add to Cart"}
                                                            </Button>
                                                )}

                                    </CardContent>
                        </Card>
            );
}