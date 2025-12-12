import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
            Package,
            Truck,
            CheckCircle,
            XCircle,
            Clock,
            MapPin,
            Phone,
            CreditCard,
            Calendar,
            ShoppingBag,
            ChevronRight,
            Eye,
            Download,
            AlertCircle
} from 'lucide-react';
import { getUserOrder } from '@/api/order';

interface IOrderProduct {
            productId: {
                        _id: string;
                        title: string;
                        images: string[];
                        price: number;
            };
            quantity: number;
            priceAtPurchase: number;
}

interface IOrder {
            _id: string;
            userId: string;
            products: IOrderProduct[];
            paymentStatus: 'pending' | 'paid' | 'failed';
            orderStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled';
            address: {
                        street: string;
                        city: string;
                        state: string;
                        pincode: string;
                        phone: string;
            };
            paymentId?: string;
            totalAmount: number;
            razorpayOrderId: string;
            createdAt: string;
            updatedAt: string;
}

export default function OrdersPage() {
            const navigate = useNavigate();
            const [selectedStatus, setSelectedStatus] = useState<string>('all');

      

            // Fetch orders - replace with your API call
            const { data: orders, isLoading } = useQuery<IOrder[]>({
                        queryKey: ['orders'],
                        queryFn: getUserOrder
            });

            const getStatusColor = (status: string) => {
                        const colors = {
                                    pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
                                    shipped: 'bg-blue-100 text-blue-700 border-blue-300',
                                    delivered: 'bg-green-100 text-green-700 border-green-300',
                                    cancelled: 'bg-red-100 text-red-700 border-red-300',
                                    paid: 'bg-green-100 text-green-700 border-green-300',
                                    failed: 'bg-red-100 text-red-700 border-red-300'
                        };
                        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
            };

            const getStatusIcon = (status: string) => {
                        const icons = {
                                    pending: <Clock className="w-4 h-4" />,
                                    shipped: <Truck className="w-4 h-4" />,
                                    delivered: <CheckCircle className="w-4 h-4" />,
                                    cancelled: <XCircle className="w-4 h-4" />
                        };
                        return icons[status as keyof typeof icons] || <Package className="w-4 h-4" />;
            };

            const filteredOrders = selectedStatus === 'all'
                        ? orders
                        : orders?.filter(order => order.orderStatus === selectedStatus);

            if (isLoading) {
                        return (
                                    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                                                <div className="text-center space-y-4">
                                                            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                                                            <p className="text-gray-600 font-medium">Loading your orders...</p>
                                                </div>
                                    </div>
                        );
            }

            return (
                        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
                                    {/* Header */}
                                    <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                                                            <div className="flex items-center justify-between">
                                                                        <div>
                                                                                    <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                                                                                    <p className="text-gray-600 mt-1">Track and manage your orders</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-3">
                                                                                    <ShoppingBag className="w-8 h-8 text-blue-600" />
                                                                                    <span className="text-2xl font-bold text-gray-900">
                                                                                                {orders?.length || 0}
                                                                                    </span>
                                                                        </div>
                                                            </div>

                                                            {/* Filter Tabs */}
                                                            <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
                                                                        {['all', 'pending', 'shipped', 'delivered', 'cancelled'].map((status) => (
                                                                                    <button
                                                                                                key={status}
                                                                                                onClick={() => setSelectedStatus(status)}
                                                                                                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${selectedStatus === status
                                                                                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                                                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                                                                            }`}
                                                                                    >
                                                                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                                                                    </button>
                                                                        ))}
                                                            </div>
                                                </div>
                                    </div>

                                    {/* Orders List */}
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                                {!filteredOrders || filteredOrders.length === 0 ? (
                                                            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                                                                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                                                    <Package className="w-12 h-12 text-gray-400" />
                                                                        </div>
                                                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Orders Found</h3>
                                                                        <p className="text-gray-600 mb-6">
                                                                                    {selectedStatus === 'all'
                                                                                                ? "You haven't placed any orders yet."
                                                                                                : `No ${selectedStatus} orders found.`}
                                                                        </p>
                                                                        <button
                                                                                    onClick={() => navigate('/products')}
                                                                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                                                                        >
                                                                                    Start Shopping
                                                                        </button>
                                                            </div>
                                                ) : (
                                                            <div className="space-y-6">
                                                                        {filteredOrders.map((order) => (
                                                                                    <div
                                                                                                key={order._id}
                                                                                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                                                                                    >
                                                                                                {/* Order Header */}
                                                                                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
                                                                                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                                                                                        <div className="space-y-2">
                                                                                                                                    <div className="flex items-center gap-3">
                                                                                                                                                <span className="text-sm font-semibold text-gray-600">Order ID:</span>
                                                                                                                                                <span className="text-sm font-mono bg-white px-3 py-1 rounded-lg border border-gray-200">
                                                                                                                                                            {order._id}
                                                                                                                                                </span>
                                                                                                                                    </div>
                                                                                                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                                                                                                <Calendar className="w-4 h-4" />
                                                                                                                                                <span>
                                                                                                                                                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                                                                                                                                        day: 'numeric',
                                                                                                                                                                        month: 'long',
                                                                                                                                                                        year: 'numeric'
                                                                                                                                                            })}
                                                                                                                                                </span>
                                                                                                                                    </div>
                                                                                                                        </div>

                                                                                                                        <div className="flex flex-wrap gap-3">
                                                                                                                                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm border ${getStatusColor(order.orderStatus)}`}>
                                                                                                                                                {getStatusIcon(order.orderStatus)}
                                                                                                                                                {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                                                                                                                                    </span>
                                                                                                                                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm border ${getStatusColor(order.paymentStatus)}`}>
                                                                                                                                                <CreditCard className="w-4 h-4" />
                                                                                                                                                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                                                                                                                    </span>
                                                                                                                        </div>
                                                                                                            </div>
                                                                                                </div>

                                                                                                {/* Order Body */}
                                                                                                <div className="p-6">
                                                                                                            {/* Products */}
                                                                                                            <div className="space-y-4 mb-6">
                                                                                                                        {order.products.map((item, idx) => (
                                                                                                                                    <div
                                                                                                                                                key={idx}
                                                                                                                                                className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                                                                                                                    >
                                                                                                                                                {/* <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                                                                                                                                            <img
                                                                                                                                                                        src={item.productId.images[0]}
                                                                                                                                                                        alt={item.productId.title}
                                                                                                                                                                        className="w-full h-full object-cover"
                                                                                                                                                            />
                                                                                                                                                </div> */}
                                                                                                                                                <div className="flex-1 min-w-0">
                                                                                                                                                            <h4 className="font-semibold text-gray-900 mb-1 truncate">
                                                                                                                                                                        {item.productId.title}
                                                                                                                                                            </h4>
                                                                                                                                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                                                                                                                                        <span>Qty: {item.quantity}</span>
                                                                                                                                                                        <span className="font-semibold text-gray-900">
                                                                                                                                                                                    ₹{item.priceAtPurchase.toLocaleString()}
                                                                                                                                                                        </span>
                                                                                                                                                            </div>
                                                                                                                                                </div>
                                                                                                                                    </div>
                                                                                                                        ))}
                                                                                                            </div>

                                                                                                            <div className="grid md:grid-cols-2 gap-6">
                                                                                                                        {/* Delivery Address */}
                                                                                                                        {/* <div className="space-y-3">
                                                                                                                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                                                                                                                                <MapPin className="w-4 h-4 text-blue-600" />
                                                                                                                                                Delivery Address
                                                                                                                                    </div>
                                                                                                                                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl space-y-1 text-sm">
                                                                                                                                                <p className="text-gray-900 font-medium">{order.address.street}</p>
                                                                                                                                                <p className="text-gray-700">
                                                                                                                                                            {order.address.city}, {order.address.state}
                                                                                                                                                </p>
                                                                                                                                                <p className="text-gray-700">PIN: {order.address.pincode}</p>
                                                                                                                                                <div className="flex items-center gap-2 pt-2 border-t border-gray-200 mt-2">
                                                                                                                                                            <Phone className="w-3 h-3 text-gray-600" />
                                                                                                                                                            <p className="text-gray-900 font-medium">{order.address.phone}</p>
                                                                                                                                                </div>
                                                                                                                                    </div>
                                                                                                                        </div> */}

                                                                                                                        {/* Payment & Total */}
                                                                                                                        <div className="space-y-3">
                                                                                                                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                                                                                                                                <CreditCard className="w-4 h-4 text-blue-600" />
                                                                                                                                                Payment Details
                                                                                                                                    </div>
                                                                                                                                    <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl space-y-3">
                                                                                                                                                {order.paymentId && (
                                                                                                                                                            <div className="flex justify-between text-sm">
                                                                                                                                                                        <span className="text-gray-600">Payment ID:</span>
                                                                                                                                                                        <span className="font-mono text-gray-900 text-xs">
                                                                                                                                                                                    {order.paymentId}
                                                                                                                                                                        </span>
                                                                                                                                                            </div>
                                                                                                                                                )}
                                                                                                                                                <div className="flex justify-between text-sm">
                                                                                                                                                            <span className="text-gray-600">Razorpay Order:</span>
                                                                                                                                                            <span className="font-mono text-gray-900 text-xs">
                                                                                                                                                                        {order.razorpayOrderId}
                                                                                                                                                            </span>
                                                                                                                                                </div>
                                                                                                                                                <div className="pt-3 border-t border-blue-200 flex justify-between items-center">
                                                                                                                                                            <span className="text-gray-900 font-semibold">Total Amount:</span>
                                                                                                                                                            <span className="text-2xl font-bold text-gray-900">
                                                                                                                                                                        ₹{order.totalAmount.toLocaleString()}
                                                                                                                                                            </span>
                                                                                                                                                </div>
                                                                                                                                    </div>
                                                                                                                        </div>
                                                                                                            </div>
                                                                                                </div>

                                                                                                {/* Order Footer */}
                                                                                                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-wrap gap-3 justify-end">
                                                                                                            <button
                                                                                                                        onClick={() => navigate(`/orders/${order._id}`)}
                                                                                                                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all"
                                                                                                            >
                                                                                                                        <Eye className="w-4 h-4" />
                                                                                                                        View Details
                                                                                                            </button>
                                                                                                            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                                                                                                                        <Download className="w-4 h-4" />
                                                                                                                        Download Invoice
                                                                                                            </button>
                                                                                                </div>
                                                                                    </div>
                                                                        ))}
                                                            </div>
                                                )}
                                    </div>
                        </div>
            );
}