import { Button } from "@/components/ui/button";
import { getUserCarts, removeCartItem, updateCartQuantity, } from "@/api/cart.services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Loader2, Package, Truck, Tag } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createCheckoutOrder, verifyPayment } from "@/api/payment.api";
import { loadRazorpay } from "@/utils/loadRazorpay";


export default function CartPage() {
            const navigate = useNavigate();
            const queryClient = useQueryClient();
            const [loading, setLoading] = useState(false);

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
                        mutationFn: removeCartItem,
                        onSuccess: (data) => {
                                    toast.success(data.message);
                                    queryClient.invalidateQueries({ queryKey: ["cart"] });
                        },
            });

            // 👉 Handles full payment flow
            const handleCheckout = async () => {
                        setLoading(true)
                        // 1️⃣ Load Razorpay SDK first
                        const loaded = await loadRazorpay();

                        if (!loaded) {
                                    toast.error("Failed to load Razorpay script");
                                    return;
                        }

                        // 2️⃣ Create order from backend API
                        // backend will generate a real Razorpay order
                        try {
                                    const orderResult = await createCheckoutOrder(total);

                                    if (!orderResult.success) {
                                                toast.error("Order creation failed");
                                                return;
                                    }

                                    const { razorpayOrderId, amount, currency, key_id } = orderResult;
                                    // return console.log(razorpayOrderId, key_id, amount)

                                    // 3️⃣ Configure Razorpay options
                                    const options = {
                                                key: key_id, // Public key from backend
                                                amount: amount, // Must be in paise
                                                currency: currency,
                                                name: "My Store Checkout",
                                                description: "Cart Payment",
                                                order_id: razorpayOrderId,

                                                // 👉 After payment success, this function runs
                                                handler: async (response: any) => {

                                                            // 4️⃣ Verify the payment signature from backend
                                                            const verifyResult = await verifyPayment(response);

                                                            if (verifyResult.success) {
                                                                        toast.success("Payment successful ✔");
                                                                        navigate("/"); // redirect or show success message
                                                            } else {
                                                                        toast.error("Payment verification failed ❌");
                                                            }
                                                },
                                    };


                                    // 5️⃣ Open Razorpay UI popup
                                    const rzp = new (window as any).Razorpay(options);
                                    rzp.open();
                                    setLoading(false)
                        } catch (error) {
                                    toast.error("Something went wrong during checkout");
                                    console.error(error);
                                    setLoading(false)
                        }
            };


            // Promo state
            const [promoApplied] = useState(false);

            if (isLoading) {
                        return (
                                    <div className="min-h-screen bg-background flex items-center justify-center">
                                                <div className="text-center">
                                                            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                                                            <p className="text-muted-foreground text-lg font-medium">Loading your cart...</p>
                                                </div>
                                    </div>
                        );
            }


            // Empty cart UI
            if (cartItems.length === 0) {
                        return (
                                    <div className="min-h-screen bg-background flex items-center justify-center p-4">
                                                <div className="text-center space-y-6 max-w-md">
                                                            <div className="relative">
                                                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
                                                                        <div className="relative w-32 h-32 mx-auto bg-linear-to-br from-muted to-card rounded-full flex items-center justify-center border-2 border-border">
                                                                                    <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                                                                        </div>
                                                            </div>
                                                            <div>
                                                                        <h2 className="text-3xl font-bold text-foreground mb-2">Your cart is empty</h2>
                                                                        <p className="text-muted-foreground">Add some products to get started!</p>
                                                            </div>
                                                            <Button
                                                                        onClick={() => navigate("/")}
                                                                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all "
                                                            >
                                                                        <ShoppingBag className="h-5 w-5 mr-2" />
                                                                        Continue Shopping
                                                            </Button>
                                                </div>
                                    </div>
                        );
            }

            // 🧮 Price calculations
            const subtotal = cartItems.reduce(
                        (sum: number, item: any) => sum + item.productId?.price * item.quantity,
                        0
            );

            const discount = promoApplied ? subtotal * 0.1 : 0;
            const shipping = subtotal > 500 ? 0 : 50;
            const total = subtotal - discount + shipping;

            return (
                        <div className="min-h-screen bg-background py-8">

                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                                                {/* Header */}
                                                <div className="mb-8">
                                                            <button
                                                                        onClick={() => navigate("/")}
                                                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4 font-medium px-4 py-2 rounded-xl hover:bg-muted"
                                                            >
                                                                        <ArrowLeft className="h-4 w-4" />
                                                                        Continue Shopping
                                                            </button>

                                                            <div className="flex items-center justify-between">
                                                                        <div>
                                                                                    <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Shopping Cart</h1>
                                                                                    <p className="text-muted-foreground mt-2 flex items-center gap-2">
                                                                                                <Package className="h-4 w-4" />
                                                                                                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                                                                                    </p>
                                                                        </div>
                                                            </div>
                                                </div>

                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                                                            {/* Cart Items */}
                                                            <div className="lg:col-span-2 space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                                                                        {cartItems.map((item: any) => (
                                                                                    <div key={item._id} className="bg-card rounded-2xl p-6 border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-lg group">

                                                                                                <div className="flex gap-6">

                                                                                                            {/* Product Image */}
                                                                                                            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-card border-2 border-border group-hover:border-primary transition-all">
                                                                                                                        <img
                                                                                                                                    src={item.productId?.image}
                                                                                                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                                                                                                    alt={item.productId?.title}
                                                                                                                        />
                                                                                                            </div>

                                                                                                            {/* Product Info */}
                                                                                                            <div className="flex-1">
                                                                                                                        <div className="flex justify-between mb-3">
                                                                                                                                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">{item.productId?.title}</h3>
                                                                                                                                    <button
                                                                                                                                                onClick={() => removeItemMutation.mutate(item.productId?._id)}
                                                                                                                                                disabled={removeItemMutation.isPending}
                                                                                                                                                className="hidden sm:flex items-center justify-center w-10 h-10 hover:bg-red-50 rounded-xl transition-all hover:scale-110 border-2 border-transparent hover:border-destructive group/delete"
                                                                                                                                    >
                                                                                                                                                {removeItemMutation.isPending ? (
                                                                                                                                                            <Loader2 className="h-5 w-5 animate-spin text-destructive" />
                                                                                                                                                ) : (
                                                                                                                                                            <Trash2 className="h-5 w-5 text-muted-foreground group-hover/delete:text-destructive transition-colors" />
                                                                                                                                                )}
                                                                                                                                    </button>
                                                                                                                        </div>

                                                                                                                        <p className="text-2xl font-bold text-primary mb-4">₹{item.productId?.price.toLocaleString()}</p>

                                                                                                                        {/* Quantity Controls */}
                                                                                                                        <div className="flex items-center justify-between mt-4">
                                                                                                                                    <div className="flex items-center gap-2 bg-muted rounded-xl p-1.5 border-2 border-border">

                                                                                                                                                {/* Decrease */}
                                                                                                                                                <button
                                                                                                                                                            disabled={item.quantity <= 1 || updateQuantityMutation.isPending}
                                                                                                                                                            onClick={() =>
                                                                                                                                                                        updateQuantityMutation.mutate({
                                                                                                                                                                                    itemId: item?.productId._id,
                                                                                                                                                                                    quantity: -1,
                                                                                                                                                                        })
                                                                                                                                                            }
                                                                                                                                                            className="w-9 h-9 hover:bg-card rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 flex items-center justify-center"
                                                                                                                                                >
                                                                                                                                                            <Minus className="h-4 w-4 text-foreground" />
                                                                                                                                                </button>

                                                                                                                                                <span className="text-base font-bold text-foreground min-w-[2rem] text-center">
                                                                                                                                                            {updateQuantityMutation.isPending ? (
                                                                                                                                                                        <Loader2 className="h-4 w-4 animate-spin inline" />
                                                                                                                                                            ) : (
                                                                                                                                                                        item.quantity
                                                                                                                                                            )}
                                                                                                                                                </span>

                                                                                                                                                {/* Increase */}
                                                                                                                                                <button
                                                                                                                                                            disabled={updateQuantityMutation.isPending}
                                                                                                                                                            onClick={() =>
                                                                                                                                                                        updateQuantityMutation.mutate({
                                                                                                                                                                                    itemId: item?.productId._id,
                                                                                                                                                                                    quantity: 1,
                                                                                                                                                                        })
                                                                                                                                                            }
                                                                                                                                                            className="w-9 h-9 hover:bg-card rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 flex items-center justify-center"
                                                                                                                                                >
                                                                                                                                                            <Plus className="h-4 w-4 text-foreground" />
                                                                                                                                                </button>
                                                                                                                                    </div>

                                                                                                                                    {/* Total Price */}
                                                                                                                                    <div className="hidden sm:block text-right">
                                                                                                                                                <p className="text-xs text-muted-foreground mb-1">Total</p>
                                                                                                                                                <p className="text-xl font-bold text-primary">₹{(item.productId?.price * item.quantity).toLocaleString()}</p>
                                                                                                                                    </div>

                                                                                                                                    {/* Mobile Remove */}
                                                                                                                                    <button
                                                                                                                                                onClick={() => removeItemMutation.mutate(item._id)}
                                                                                                                                                className="sm:hidden text-destructive text-sm font-medium flex items-center gap-1 hover:underline"
                                                                                                                                    >
                                                                                                                                                <Trash2 className="h-4 w-4" /> Remove
                                                                                                                                    </button>
                                                                                                                        </div>

                                                                                                            </div>
                                                                                                </div>

                                                                                    </div>
                                                                        ))}
                                                            </div>

                                                            {/* Order Summary */}
                                                            <div className="lg:col-span-1">
                                                                        <div className="bg-card rounded-2xl p-6 border-2 border-border shadow-lg sticky top-8">

                                                                                    <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                                                                                                <Package className="h-6 w-6 text-primary" />
                                                                                                Order Summary
                                                                                    </h2>

                                                                                    {/* Prices */}
                                                                                    <div className="space-y-4 mb-6 pb-6 border-b-2 border-border">
                                                                                                <div className="flex justify-between text-base">
                                                                                                            <span className="text-muted-foreground">Subtotal</span>
                                                                                                            <span className="font-semibold text-foreground">₹{subtotal.toLocaleString()}</span>
                                                                                                </div>

                                                                                                {discount > 0 && (
                                                                                                            <div className="flex justify-between text-base bg-green-50 -mx-2 px-2 py-2 rounded-lg">
                                                                                                                        <span className="text-green-600 flex items-center gap-1 font-medium">
                                                                                                                                    <Tag className="h-4 w-4" />
                                                                                                                                    Discount
                                                                                                                        </span>
                                                                                                                        <span className="font-semibold text-green-600">-₹{discount.toLocaleString()}</span>
                                                                                                            </div>
                                                                                                )}

                                                                                                <div className="flex justify-between text-base">
                                                                                                            <span className="text-muted-foreground flex items-center gap-1">
                                                                                                                        <Truck className="h-4 w-4" />
                                                                                                                        Shipping
                                                                                                            </span>
                                                                                                            <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-foreground'}`}>
                                                                                                                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                                                                                                            </span>
                                                                                                </div>

                                                                                                {subtotal < 500 && (
                                                                                                            <p className="text-xs text-muted-foreground bg-muted p-2 rounded-lg">
                                                                                                                        Add ₹{(500 - subtotal).toLocaleString()} more to get free shipping!
                                                                                                            </p>
                                                                                                )}
                                                                                    </div>

                                                                                    <div className="flex justify-between text-2xl font-bold mb-6 py-4 bg-linear-to-r from-muted to-card rounded-xl px-4">
                                                                                                <span className="text-foreground">Total</span>
                                                                                                <span className="text-primary">₹{total.toLocaleString()}</span>
                                                                                    </div>

                                                                                    <Button
                                                                                                onClick={handleCheckout}
                                                                                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                                                                    >
                                                                                                <ShoppingBag className="h-5 w-5 mr-2" />
                                                                                                {
                                                                                                            loading ? <Loader2 className="animate-spin" /> : "Proceed to Checkout"
                                                                                                }
                                                                                    </Button>

                                                                                    <p className="text-xs text-muted-foreground text-center mt-4">
                                                                                                Secure checkout powered by Razorpay
                                                                                    </p>

                                                                        </div>
                                                            </div>

                                                </div>
                                    </div>
                        </div>
            );
}