import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById, getSimilarProducts } from "@/api/product.api";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Truck, Shield, ArrowLeft, Star, Minus, Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import { addToCartProduct } from "@/api/cart.services";
import toast from "react-hot-toast";
import { addOrUpdateReview } from "@/api/review.api";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import SimilarProducts from "@/components/common/SimilarProducts";
import ReviewForm from "@/components/common/ReviewForm";

export default function ProductDetails() {
            const { id } = useParams();
            const navigate = useNavigate();
            const [selectedImage, setSelectedImage] = useState(0);
            const [isWishlisted, setIsWishlisted] = useState(false);
            const [quantity, setQuantity] = useState(1);
            const queryClient = useQueryClient();
            const user = useSelector((state: RootState) => state.auth.user);

            // Fetch main product
            const { data: product, isLoading: productLoading } = useQuery({
                        queryKey: ["product", id],
                        queryFn: () => getProductById(id!),
            });

            // Fetch similar products
            const { data: similar } = useQuery({
                        queryKey: ["similar-products", id],
                        queryFn: () => getSimilarProducts(id!),
                        enabled: !!id,
            });

            console.log("similar products:-", similar)

            const cartMutation = useMutation({
                        mutationFn: addToCartProduct,
                        onSuccess: (data) => {
                                    toast.success(data.message)
                                    queryClient.invalidateQueries({ queryKey: ["cart"] });
                        },
                        onError: (err: any) => {
                                    toast.error(err.response?.data?.message || "add to cart failed");
                        },
            });

            const addReviewMutation = useMutation({
                        mutationFn: (formData: any) => addOrUpdateReview(id!, formData),
                        onSuccess: () => {
                                    queryClient.invalidateQueries({ queryKey: ["reviews", id] });
                        },
            });

            if (productLoading) {
                        return (
                                    <div className="flex items-center justify-center min-h-screen bg-background">
                                                <div className="text-center">
                                                            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                                                            <p className="text-muted-foreground text-lg font-medium">Loading product...</p>
                                                </div>
                                    </div>
                        );
            }

            if (!product) {
                        return (
                                    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
                                                <div className="text-center space-y-4">
                                                            <p className="text-2xl font-bold text-foreground">Product not found</p>
                                                            <Button onClick={() => navigate(-1)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                                                        Go Back
                                                            </Button>
                                                </div>
                                    </div>
                        );
            }

            return (
                        <div className="min-h-screen bg-background">
                                    {/* Back Button */}
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                                                <button
                                                            onClick={() => navigate(-1)}
                                                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium px-4 py-2 rounded-xl hover:bg-muted group"
                                                >
                                                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                                                            Back to Products
                                                </button>
                                    </div>

                                    {/* Main Product Section */}
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
                                                <div className="bg-card rounded-2xl overflow-hidden border-2 border-border shadow-lg">
                                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12">

                                                                        {/* LEFT: Images */}
                                                                        <div className="space-y-4">
                                                                                    {/* Main Image */}
                                                                                    <div className="aspect-square bg-gradient-to-br from-muted to-card rounded-2xl overflow-hidden border-2 border-border group">
                                                                                                <img
                                                                                                            src={product.images[selectedImage]}
                                                                                                            alt={product.title}
                                                                                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                                                                                />
                                                                                    </div>

                                                                                    {/* Thumbnail Gallery */}
                                                                                    {product.images.length > 1 && (
                                                                                                <div className="grid grid-cols-4 gap-3">
                                                                                                            {product.images.map((img: string, idx: number) => (
                                                                                                                        <button
                                                                                                                                    key={idx}
                                                                                                                                    onClick={() => setSelectedImage(idx)}
                                                                                                                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${selectedImage === idx
                                                                                                                                                ? "border-primary shadow-md"
                                                                                                                                                : "border-border hover:border-primary/50"
                                                                                                                                                }`}
                                                                                                                        >
                                                                                                                                    <img
                                                                                                                                                src={img}
                                                                                                                                                alt={`${product.title} ${idx + 1}`}
                                                                                                                                                className="w-full h-full object-cover"
                                                                                                                                    />
                                                                                                                        </button>
                                                                                                            ))}
                                                                                                </div>
                                                                                    )}
                                                                        </div>

                                                                        {/* RIGHT: Product Info */}
                                                                        <div className="flex flex-col space-y-6">

                                                                                    {/* Category */}
                                                                                    {product.category && (
                                                                                                <span className="inline-block text-sm text-primary uppercase tracking-wide font-semibold bg-primary/10 px-4 py-1.5 rounded-full w-fit">
                                                                                                            {product.category}
                                                                                                </span>
                                                                                    )}

                                                                                    {/* Title */}
                                                                                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                                                                                                {product.title}
                                                                                    </h1>

                                                                                    {/* Rating */}
                                                                                    {product.ratingsAverage && (
                                                                                                <div className="flex items-center gap-2">
                                                                                                            <div className="flex items-center gap-1.5 bg-muted px-4 py-2 rounded-xl border border-border">
                                                                                                                        <Star className="h-5 w-5 fill-chart-4 text-chart-4" />
                                                                                                                        <span className="text-base font-bold text-foreground">
                                                                                                                                    {product.ratingsAverage.toFixed(1)}
                                                                                                                        </span>
                                                                                                            </div>
                                                                                                </div>
                                                                                    )}

                                                                                    {/* Price */}
                                                                                    <div className="flex items-baseline gap-3">
                                                                                                <span className="text-4xl lg:text-5xl font-bold text-primary">
                                                                                                            ₹{product.price.toLocaleString()}
                                                                                                </span>
                                                                                    </div>

                                                                                    {/* Description */}
                                                                                    <p className="text-muted-foreground leading-relaxed text-base">
                                                                                                {product.description}
                                                                                    </p>

                                                                                    {/* Stock Status */}
                                                                                    <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl w-fit border border-border">
                                                                                                {product.stock > 0 ? (
                                                                                                            <>
                                                                                                                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                                                                                                                        <span className="text-sm font-semibold text-green-700">
                                                                                                                                    In Stock ({product.stock} available)
                                                                                                                        </span>
                                                                                                            </>
                                                                                                ) : (
                                                                                                            <>
                                                                                                                        <div className="w-2.5 h-2.5 bg-destructive rounded-full"></div>
                                                                                                                        <span className="text-sm font-semibold text-destructive">
                                                                                                                                    Out of Stock
                                                                                                                        </span>
                                                                                                            </>
                                                                                                )}
                                                                                    </div>

                                                                                    {/* Quantity Selector */}
                                                                                    <div className="flex items-center gap-4">
                                                                                                <span className="text-sm font-semibold text-foreground">Quantity:</span>
                                                                                                <div className="flex items-center border-2 border-border rounded-xl overflow-hidden bg-muted">
                                                                                                            <button
                                                                                                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                                                                                        className="px-4 py-3 hover:bg-card transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                                                                                        disabled={quantity <= 1}
                                                                                                            >
                                                                                                                        <Minus className="h-4 w-4" />
                                                                                                            </button>
                                                                                                            <span className="px-6 py-3 min-w-16 text-center font-bold text-foreground bg-card">
                                                                                                                        {quantity}
                                                                                                            </span>
                                                                                                            <button
                                                                                                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                                                                                                        className="px-4 py-3 hover:bg-card transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                                                                                        disabled={quantity >= product.stock}
                                                                                                            >
                                                                                                                        <Plus className="h-4 w-4" />
                                                                                                            </button>
                                                                                                </div>
                                                                                    </div>

                                                                                    {/* Action Buttons */}
                                                                                    <div className="flex gap-3 pt-4">
                                                                                                <Button
                                                                                                            onClick={() => cartMutation.mutate(product._id.toString())}
                                                                                                            disabled={product.stock === 0 || cartMutation.isPending}
                                                                                                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                                                                                >
                                                                                                            {cartMutation.isPending ? (
                                                                                                                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                                                                                            ) : (
                                                                                                                        <ShoppingCart className="h-5 w-5 mr-2" />
                                                                                                            )}
                                                                                                            {cartMutation.isPending ? "Adding..." : "Add to Cart"}
                                                                                                </Button>
                                                                                                <Button
                                                                                                            variant="outline"
                                                                                                            size="icon"
                                                                                                            onClick={() => setIsWishlisted(!isWishlisted)}
                                                                                                            className="h-14 w-14 border-2 border-border hover:border-primary rounded-xl hover:scale-110 transition-all"
                                                                                                >
                                                                                                            <Heart
                                                                                                                        className={`h-6 w-6 transition-colors ${isWishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"
                                                                                                                                    }`}
                                                                                                            />
                                                                                                </Button>
                                                                                    </div>

                                                                                    {/* Features */}
                                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t-2 border-border">
                                                                                                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl border border-border hover:border-primary transition-colors">
                                                                                                            <div className="p-3 bg-primary/10 rounded-xl">
                                                                                                                        <Truck className="h-6 w-6 text-primary" />
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                        <p className="text-sm font-bold text-foreground">Free Delivery</p>
                                                                                                                        <p className="text-xs text-muted-foreground">On orders over ₹500</p>
                                                                                                            </div>
                                                                                                </div>
                                                                                                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl border border-border hover:border-primary transition-colors">
                                                                                                            <div className="p-3 bg-primary/10 rounded-xl">
                                                                                                                        <Shield className="h-6 w-6 text-primary" />
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                        <p className="text-sm font-bold text-foreground">Secure Payment</p>
                                                                                                                        <p className="text-xs text-muted-foreground">100% protected</p>
                                                                                                            </div>
                                                                                                </div>
                                                                                    </div>
                                                                        </div>
                                                            </div>
                                                </div>

                                                {/* Similar Products Section */}
                                                {similar && similar.length > 0 && (
                                                            <SimilarProducts similar={similar} />
                                                )}

                                                {/* Add Review Form (only if logged in) */}
                                                {user && (
                                                            <ReviewForm addReviewMutation={addReviewMutation} />
                                                )}

                                    </div>
                        </div>
            );
}