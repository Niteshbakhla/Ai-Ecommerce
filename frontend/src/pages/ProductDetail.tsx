import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById, getSimilarProducts } from "@/services/product.service";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Truck, Shield, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { addToCartProduct } from "@/services/cart.services";
import toast from "react-hot-toast";
import { addOrUpdateReview, deleteReview, getReviews } from "@/services/review.service";
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
                        },
                        onError: (err: any) => {
                                    toast.error(err.response?.data?.message || "add to cart failed");
                        },
            });

            // const {
            //             data: reviews,
            //             isLoading: reviewsLoading,
            //             refetch: refetchReviews,
            // } = useQuery({
            //             queryKey: ["reviews", id],
            //             queryFn: () => getReviews(id!),
            // });

            const addReviewMutation = useMutation({
                        mutationFn: (formData: any) => addOrUpdateReview(id!, formData),
                        onSuccess: () => {
                                    queryClient.invalidateQueries({ queryKey: ["reviews", id] });
                        },
            });

            const deleteReviewMutation = useMutation({
                        mutationFn: (reviewId: string) => deleteReview(reviewId),
                        onSuccess: () => {
                                    queryClient.invalidateQueries({ queryKey: ["reviews", id] });
                        },
            });

            if (productLoading) {
                        return (
                                    <div className="flex items-center justify-center min-h-screen">
                                                <div className="text-gray-500">Loading...</div>
                                    </div>
                        );
            }

            if (!product) {
                        return (
                                    <div className="flex items-center justify-center min-h-screen">
                                                <div className="text-gray-500">Product not found</div>
                                    </div>
                        );
            }

            return (
                        <div className="min-h-screen bg-gray-50">
                                    {/* Back Button */}
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                                                <button
                                                            onClick={() => navigate(-1)}
                                                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                                >
                                                            <ArrowLeft className="h-4 w-4" />
                                                            Back
                                                </button>
                                    </div>

                                    {/* Main Product Section */}
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
                                                <div className="bg-white rounded-2xl overflow-hidden">
                                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12">

                                                                        {/* LEFT: Images */}
                                                                        <div className="space-y-4">
                                                                                    {/* Main Image */}
                                                                                    <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                                                                                                <img
                                                                                                            src={product.images[selectedImage]}
                                                                                                            alt={product.title}
                                                                                                            className="w-full h-full object-cover"
                                                                                                />
                                                                                    </div>

                                                                                    {/* Thumbnail Gallery */}
                                                                                    {product.images.length > 1 && (
                                                                                                <div className="grid grid-cols-4 gap-3">
                                                                                                            {product.images.map((img: string, idx: number) => (
                                                                                                                        <button
                                                                                                                                    key={idx}
                                                                                                                                    onClick={() => setSelectedImage(idx)}
                                                                                                                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx
                                                                                                                                                ? "border-gray-900"
                                                                                                                                                : "border-transparent hover:border-gray-300"
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
                                                                                                <span className="text-sm text-gray-500 uppercase tracking-wide">
                                                                                                            {product.category}
                                                                                                </span>
                                                                                    )}

                                                                                    {/* Title */}
                                                                                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                                                                                {product.title}
                                                                                    </h1>

                                                                                    {/* Rating */}
                                                                                    {product.ratingsAverage && (
                                                                                                <div className="flex items-center gap-2">
                                                                                                            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                                                                                                                        <span className="text-yellow-600 text-lg">★</span>
                                                                                                                        <span className="text-sm font-semibold text-gray-900">
                                                                                                                                    {product.ratingsAverage.toFixed(1)}
                                                                                                                        </span>
                                                                                                            </div>
                                                                                                </div>
                                                                                    )}

                                                                                    {/* Price */}
                                                                                    <div className="flex items-baseline gap-3">
                                                                                                <span className="text-4xl font-bold text-gray-900">
                                                                                                            ₹{product.price.toLocaleString()}
                                                                                                </span>
                                                                                    </div>

                                                                                    {/* Description */}
                                                                                    <p className="text-gray-600 leading-relaxed">
                                                                                                {product.description}
                                                                                    </p>

                                                                                    {/* Stock Status */}
                                                                                    <div className="flex items-center gap-2">
                                                                                                {product.stock > 0 ? (
                                                                                                            <>
                                                                                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                                                                                        <span className="text-sm font-medium text-green-700">
                                                                                                                                    In Stock ({product.stock} available)
                                                                                                                        </span>
                                                                                                            </>
                                                                                                ) : (
                                                                                                            <>
                                                                                                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                                                                                        <span className="text-sm font-medium text-red-700">
                                                                                                                                    Out of Stock
                                                                                                                        </span>
                                                                                                            </>
                                                                                                )}
                                                                                    </div>

                                                                                    {/* Quantity Selector */}
                                                                                    <div className="flex items-center gap-3">
                                                                                                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                                                                                <div className="flex items-center border rounded-lg">
                                                                                                            <button
                                                                                                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                                                                                        className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                                                                                                        disabled={quantity <= 1}
                                                                                                            >
                                                                                                                        −
                                                                                                            </button>
                                                                                                            <span className="px-4 py-2 min-w-12 text-center font-medium">
                                                                                                                        {quantity}
                                                                                                            </span>
                                                                                                            <button
                                                                                                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                                                                                                        className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                                                                                                        disabled={quantity >= product.stock}
                                                                                                            >
                                                                                                                        +
                                                                                                            </button>
                                                                                                </div>
                                                                                    </div>

                                                                                    {/* Action Buttons */}
                                                                                    <div className="flex gap-3 pt-4">
                                                                                                <Button
                                                                                                            onClick={() => cartMutation.mutate(product._id.toString())}
                                                                                                            disabled={product.stock === 0}
                                                                                                            className="flex-1 bg-gray-900 text-white hover:bg-gray-800 h-12 text-base font-medium"
                                                                                                >
                                                                                                            <ShoppingCart className="h-5 w-5 mr-2" />
                                                                                                            Add to Cart
                                                                                                </Button>
                                                                                                <Button
                                                                                                            variant="outline"
                                                                                                            size="icon"
                                                                                                            onClick={() => setIsWishlisted(!isWishlisted)}
                                                                                                            className="h-12 w-12"
                                                                                                >
                                                                                                            <Heart
                                                                                                                        className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""
                                                                                                                                    }`}
                                                                                                            />
                                                                                                </Button>
                                                                                    </div>

                                                                                    {/* Features */}
                                                                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                                                                                                <div className="flex items-center gap-3">
                                                                                                            <div className="p-2 bg-gray-100 rounded-lg">
                                                                                                                        <Truck className="h-5 w-5 text-gray-700" />
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                        <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                                                                                                                        <p className="text-xs text-gray-500">On orders over ₹500</p>
                                                                                                            </div>
                                                                                                </div>
                                                                                                <div className="flex items-center gap-3">
                                                                                                            <div className="p-2 bg-gray-100 rounded-lg">
                                                                                                                        <Shield className="h-5 w-5 text-gray-700" />
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                        <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                                                                                                                        <p className="text-xs text-gray-500">100% protected</p>
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