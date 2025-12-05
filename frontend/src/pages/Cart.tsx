import { Button } from "@/components/ui/button";
import { getUserCarts, removeCartItem, updateCartQuantity, } from "@/services/cart.services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
            const navigate = useNavigate();
            const queryClient = useQueryClient();

            // 🔥 Fetch cart from server
            const { data, isLoading } = useQuery({
                        queryKey: ["cart"],
                        queryFn: getUserCarts,
            });

            const cartItems = data?.items || [];

            // 🔥 Update quantity mutation
            const updateQuantityMutation = useMutation({
                        mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
                                    updateCartQuantity(itemId, quantity),
                        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
            });

            // 🔥 Remove item mutation
            const removeItemMutation = useMutation({
                        mutationFn: (itemId: string) => removeCartItem(itemId),
                        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
            });

            // Promo state
            const [promoCode, setPromoCode] = useState("");
            const [promoApplied, setPromoApplied] = useState(false);

            if (isLoading) return <p>Loading cart...</p>;

            // Empty cart UI
            if (cartItems.length === 0) {
                        return (
                                    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                                                <div className="text-center space-y-6 max-w-md">
                                                            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                                                                        <ShoppingBag className="h-12 w-12 text-gray-400" />
                                                            </div>
                                                            <h2 className="text-2xl font-bold">Your cart is empty</h2>
                                                            <Button onClick={() => navigate("/")}>Continue Shopping</Button>
                                                </div>
                                    </div>
                        );
            }

            // 🧮 Price calculations
            const subtotal = cartItems.reduce(
                        (sum: number, item: any) => sum + item.productId.price * item.quantity,
                        0
            );

            const discount = promoApplied ? subtotal * 0.1 : 0;
            const shipping = subtotal > 500 ? 0 : 50;
            const total = subtotal - discount + shipping;

            return (
                        <div className="min-h-screen bg-gray-50 py-8">

                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                                                {/* Header */}
                                                <div className="mb-8">
                                                            <button
                                                                        onClick={() => navigate("/")}
                                                                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                                                            >
                                                                        <ArrowLeft className="h-4 w-4" />
                                                                        Continue Shopping
                                                            </button>

                                                            <h1 className="text-3xl font-bold">Shopping Cart</h1>
                                                            <p className="text-gray-500 mt-1">
                                                                        {cartItems.length} items in your cart
                                                            </p>
                                                </div>

                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                                                            {/* Cart Items */}
                                                            <div className="lg:col-span-2 space-y-4">
                                                                        {cartItems.map((item: any) => (
                                                                                    <div key={item._id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md">

                                                                                                <div className="flex gap-4">

                                                                                                            {/* Product Image */}
                                                                                                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden">
                                                                                                                        <img src={item.productId.image} className="w-full h-full object-cover" />
                                                                                                            </div>

                                                                                                            {/* Product Info */}
                                                                                                            <div className="flex-1">
                                                                                                                        <div className="flex justify-between">
                                                                                                                                    <h3 className="text-lg font-semibold">{item.productId.title}</h3>
                                                                                                                                    <button
                                                                                                                                                onClick={() => removeItemMutation.mutate(item._id)}
                                                                                                                                                className="hidden sm:flex items-center justify-center w-9 h-9 hover:bg-red-50 rounded-lg"
                                                                                                                                    >
                                                                                                                                                <Trash2 className="h-5 w-5 text-gray-400 hover:text-red-500" />
                                                                                                                                    </button>
                                                                                                                        </div>

                                                                                                                        <p className="text-xl font-bold">₹{item.productId.price}</p>

                                                                                                                        {/* Quantity Controls */}
                                                                                                                        <div className="flex items-center justify-between mt-4">
                                                                                                                                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">

                                                                                                                                                {/* Decrease */}
                                                                                                                                                <button
                                                                                                                                                            disabled={item.quantity <= 1}
                                                                                                                                                            onClick={() =>
                                                                                                                                                                        updateQuantityMutation.mutate({
                                                                                                                                                                                    itemId: item._id,
                                                                                                                                                                                    quantity: item.quantity - 1,
                                                                                                                                                                        })
                                                                                                                                                            }
                                                                                                                                                            className="w-8 h-8 hover:bg-white rounded-md"
                                                                                                                                                >
                                                                                                                                                            <Minus className="h-4 w-4" />
                                                                                                                                                </button>

                                                                                                                                                <span className="text-sm font-semibold">{item.quantity}</span>

                                                                                                                                                {/* Increase */}
                                                                                                                                                <button
                                                                                                                                                            onClick={() =>
                                                                                                                                                                        updateQuantityMutation.mutate({
                                                                                                                                                                                    itemId: item._id,
                                                                                                                                                                                    quantity: item.quantity + 1,
                                                                                                                                                                        })
                                                                                                                                                            }
                                                                                                                                                            className="w-8 h-8 hover:bg-white rounded-md"
                                                                                                                                                >
                                                                                                                                                            <Plus className="h-4 w-4" />
                                                                                                                                                </button>
                                                                                                                                    </div>

                                                                                                                                    {/* Mobile Remove */}
                                                                                                                                    <button
                                                                                                                                                onClick={() => removeItemMutation.mutate(item._id)}
                                                                                                                                                className="sm:hidden text-red-600 text-sm"
                                                                                                                                    >
                                                                                                                                                <Trash2 className="h-4 w-4 inline" /> Remove
                                                                                                                                    </button>
                                                                                                                        </div>

                                                                                                            </div>
                                                                                                </div>

                                                                                    </div>
                                                                        ))}
                                                            </div>

                                                            {/* Order Summary */}
                                                            <div className="lg:col-span-1">
                                                                        <div className="bg-white rounded-2xl p-6 shadow-sm">

                                                                                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                                                                                    {/* Prices */}
                                                                                    <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                                                                                <div className="flex justify-between">
                                                                                                            <span>Subtotal</span>
                                                                                                            <span>₹{subtotal}</span>
                                                                                                </div>

                                                                                                {discount > 0 && (
                                                                                                            <div className="flex justify-between text-green-600">
                                                                                                                        <span>Discount</span>
                                                                                                                        <span>-₹{discount}</span>
                                                                                                            </div>
                                                                                                )}

                                                                                                <div className="flex justify-between">
                                                                                                            <span>Shipping</span>
                                                                                                            <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                                                                                                </div>
                                                                                    </div>

                                                                                    <div className="flex justify-between text-xl font-bold mb-6">
                                                                                                <span>Total</span>
                                                                                                <span>₹{total}</span>
                                                                                    </div>

                                                                                    <Button className="w-full bg-gray-900 text-white h-12 rounded-full">
                                                                                                Proceed to Checkout
                                                                                    </Button>

                                                                        </div>
                                                            </div>

                                                </div>
                                    </div>
                        </div>
            );
}
