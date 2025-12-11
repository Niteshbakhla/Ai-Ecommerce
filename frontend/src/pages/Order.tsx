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
            ChevronDown,
            Download
} from 'lucide-react';
import { getAllUserOrders } from '@/api/order';
import type { IOrder } from '@/types/orderTypes';




export default function OrdersPage() {
            const navigate = useNavigate();
            const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

            // Fetch orders
            const { data: orders, isLoading } = useQuery<IOrder[]>({
                        queryKey: ['orders'],
                        queryFn: getAllUserOrders
            });

            const getStatusConfig = (status: string) => {
                        const configs = {
                                    pending: {
                                                color: 'bg-yellow-500',
                                                text: 'Processing',
                                                icon: <Clock className="w-4 h-4" />,
                                                bg: 'bg-yellow-50',
                                                textColor: 'text-yellow-700'
                                    },
                                    shipped: {
                                                color: 'bg-blue-500',
                                                text: 'On the way',
                                                icon: <Truck className="w-4 h-4" />,
                                                bg: 'bg-blue-50',
                                                textColor: 'text-blue-700'
                                    },
                                    delivered: {
                                                color: 'bg-green-500',
                                                text: 'Delivered',
                                                icon: <CheckCircle className="w-4 h-4" />,
                                                bg: 'bg-green-50',
                                                textColor: 'text-green-700'
                                    },
                                    cancelled: {
                                                color: 'bg-red-500',
                                                text: 'Cancelled',
                                                icon: <XCircle className="w-4 h-4" />,
                                                bg: 'bg-red-50',
                                                textColor: 'text-red-700'
                                    }
                        };
                        return configs[status as keyof typeof configs];
            };

            if (isLoading) {
                        return (
                                    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                                    </div>
                        );
            }

            return (
                        <div className="min-h-screen bg-gray-50">
                                    {/* Simple Header */}
                                    <div className="bg-white border-b">
                                                <div className="max-w-4xl mx-auto px-4 py-6">
                                                            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                                                            <p className="text-gray-500 text-sm mt-1">{orders?.length || 0} orders</p>
                                                </div>
                                    </div>

                                    {/* Orders List */}
                                    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
                                                {!orders || orders.length === 0 ? (
                                                            <div className="bg-white rounded-xl p-12 text-center">
                                                                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                                                                        <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                                                                        <button
                                                                                    onClick={() => navigate('/products')}
                                                                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                                                                        >
                                                                                    Start Shopping
                                                                        </button>
                                                            </div>
                                                ) : (
                                                            orders.map((order) => {
                                                                        const statusConfig = getStatusConfig(order.orderStatus);
                                                                        const isExpanded = expandedOrder === order._id;

                                                                        return (
                                                                                    <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                                                                                {/* Order Summary - Always Visible */}
                                                                                                <div className="p-4">
                                                                                                            {/* Status Bar */}
                                                                                                            <div className={`${statusConfig.bg} rounded-lg p-3 mb-4`}>
                                                                                                                        <div className="flex items-center justify-between">
                                                                                                                                    <div className="flex items-center gap-3">
                                                                                                                                                <div className={`${statusConfig.color} w-2 h-2 rounded-full`}></div>
                                                                                                                                                <span className={`font-semibold ${statusConfig.textColor}`}>
                                                                                                                                                            {statusConfig.text}
                                                                                                                                                </span>
                                                                                                                                    </div>
                                                                                                                                    <span className="text-sm text-gray-600">
                                                                                                                                                {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                                                                                                    </span>
                                                                                                                        </div>
                                                                                                            </div>

                                                                                                            {/* Product Preview */}
                                                                                                            <div className="flex gap-3 mb-4">
                                                                                                                        <div className="flex -space-x-2">
                                                                                                                                    {order.products.slice(0, 3).map((item, idx) => (
                                                                                                                                                <img
                                                                                                                                                            key={idx}
                                                                                                                                                            src={item.productId.images[0]}
                                                                                                                                                            alt={item.productId.title}
                                                                                                                                                            className="w-12 h-12 rounded-lg border-2 border-white object-cover"
                                                                                                                                                />
                                                                                                                                    ))}
                                                                                                                                    {order.products.length > 3 && (
                                                                                                                                                <div className="w-12 h-12 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600">
                                                                                                                                                            +{order.products.length - 3}
                                                                                                                                                </div>
                                                                                                                                    )}
                                                                                                                        </div>
                                                                                                                        <div className="flex-1">
                                                                                                                                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                                                                                                                                {order.products[0].productId.title}
                                                                                                                                                {order.products.length > 1 && ` +${order.products.length - 1} more`}
                                                                                                                                    </p>
                                                                                                                                    <p className="text-xs text-gray-500 mt-1">
                                                                                                                                                Order #{order._id.slice(-8)}
                                                                                                                                    </p>
                                                                                                                        </div>
                                                                                                                        <div className="text-right">
                                                                                                                                    <p className="text-lg font-bold text-gray-900">₹{order.totalAmount.toLocaleString()}</p>
                                                                                                                                    <button
                                                                                                                                                onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                                                                                                                                                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 mt-1"
                                                                                                                                    >
                                                                                                                                                {isExpanded ? 'Less' : 'Details'}
                                                                                                                                                <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                                                                                                                    </button>
                                                                                                                        </div>
                                                                                                            </div>

                                                                                                            {/* Quick Actions */}
                                                                                                            {!isExpanded && order.orderStatus === 'delivered' && (
                                                                                                                        <button className="w-full bg-gray-50 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 flex items-center justify-center gap-2">
                                                                                                                                    <Download className="w-4 h-4" />
                                                                                                                                    Download Invoice
                                                                                                                        </button>
                                                                                                            )}
                                                                                                </div>

                                                                                                {/* Expanded Details */}
                                                                                                {isExpanded && (
                                                                                                            <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-4">
                                                                                                                        {/* All Products */}
                                                                                                                        <div className="space-y-2">
                                                                                                                                    <p className="text-xs font-semibold text-gray-500 uppercase">Items</p>
                                                                                                                                    {order.products.map((item, idx) => (
                                                                                                                                                <div key={idx} className="flex gap-3 bg-white p-3 rounded-lg">
                                                                                                                                                            <img
                                                                                                                                                                        src={item.productId.images[0]}
                                                                                                                                                                        alt={item.productId.title}
                                                                                                                                                                        className="w-14 h-14 rounded object-cover"
                                                                                                                                                            />
                                                                                                                                                            <div className="flex-1 min-w-0">
                                                                                                                                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                                                                                                                                                    {item.productId.title}
                                                                                                                                                                        </p>
                                                                                                                                                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                                                                                                                            </div>
                                                                                                                                                            <p className="text-sm font-semibold text-gray-900">
                                                                                                                                                                        ₹{(item.priceAtPurchase * item.quantity).toLocaleString()}
                                                                                                                                                            </p>
                                                                                                                                                </div>
                                                                                                                                    ))}
                                                                                                                        </div>

                                                                                                                        {/* Delivery Address */}
                                                                                                                        <div>
                                                                                                                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-1">
                                                                                                                                                <MapPin className="w-3 h-3" />
                                                                                                                                                Delivery to
                                                                                                                                    </p>
                                                                                                                                    <div className="bg-white p-3 rounded-lg text-sm">
                                                                                                                                                <p className="font-medium text-gray-900">{order.address.street}</p>
                                                                                                                                                <p className="text-gray-600">{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                                                                                                                                                <p className="text-gray-600 mt-1">{order.address.phone}</p>
                                                                                                                                    </div>
                                                                                                                        </div>

                                                                                                                        {/* Payment Info */}
                                                                                                                        <div className="bg-white p-3 rounded-lg">
                                                                                                                                    <div className="flex justify-between text-sm mb-2">
                                                                                                                                                <span className="text-gray-600">Payment</span>
                                                                                                                                                <span className="font-semibold text-green-600">
                                                                                                                                                            {order.paymentStatus === 'paid' ? '✓ Paid' : order.paymentStatus}
                                                                                                                                                </span>
                                                                                                                                    </div>
                                                                                                                                    {order.paymentId && (
                                                                                                                                                <p className="text-xs text-gray-500">Payment ID: {order.paymentId}</p>
                                                                                                                                    )}
                                                                                                                        </div>

                                                                                                                        {/* Actions */}
                                                                                                                        <div className="flex gap-2">
                                                                                                                                    <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                                                                                                                Track Order
                                                                                                                                    </button>
                                                                                                                                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                                                                                                                                                <Download className="w-4 h-4" />
                                                                                                                                                Invoice
                                                                                                                                    </button>
                                                                                                                        </div>
                                                                                                            </div>
                                                                                                )}
                                                                                    </div>
                                                                        );
                                                            })
                                                )}
                                    </div>
                        </div>
            );
}