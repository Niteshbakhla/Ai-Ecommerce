import { useState } from 'react';
import { Search, ShoppingCart, X, Package, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getOrderForAdmin } from '@/api/order.api';

type FilterStatus = 'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface Product {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  _id: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

interface OrderData {
  _id: string;
  userId: User;
  products: Product[];
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  paymentId: string;
  razorpayOrderId: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrdersPage() {
  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-order"],
    queryFn: getOrderForAdmin
  });

  const handleViewOrderDetails = (order: OrderData) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      paid: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700',
      refunded: 'bg-orange-100 text-orange-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = data?.filter((order: OrderData) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userId.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.razorpayOrderId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || order.orderStatus === filterStatus;

    return matchesSearch && matchesStatus;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <X className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 text-lg">Failed to load orders</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
      

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{data?.length || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {data?.filter((o: OrderData) => o.orderStatus === 'pending').length || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Delivered</p>
            <p className="text-2xl font-bold text-green-600">
              {data?.filter((o: OrderData) => o.orderStatus === 'delivered').length || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Revenue</p>
            <p className="text-2xl font-bold text-blue-600">
              ₹{data?.reduce((sum: number, o: OrderData) => sum + o.totalAmount, 0).toFixed(2) || 0}
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by order ID, customer name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-medium"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order: OrderData) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm text-gray-800">{order._id.slice(-8)}</div>
                      <div className="text-xs text-gray-500">{order.razorpayOrderId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{order.userId.name}</div>
                      <div className="text-sm text-gray-500">{order.userId.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-800">{formatDate(order.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-800">
                          {order.products.reduce((sum, p) => sum + p.quantity, 0)} item(s)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">₹{order.totalAmount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewOrderDetails(order)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">Order Details</h3>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Order ID</p>
                  <p className="text-lg font-mono text-gray-800">{selectedOrder._id}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Order Date</p>
                  <p className="text-lg font-medium text-gray-800">{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Razorpay Order ID</p>
                  <p className="text-sm font-mono text-gray-800">{selectedOrder.razorpayOrderId}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Payment ID</p>
                  <p className="text-sm font-mono text-gray-800">{selectedOrder.paymentId}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-800 mb-3">Customer Information</h4>
                <div className="space-y-2">
                  <p className="text-gray-700"><span className="font-medium">Name:</span> {selectedOrder.userId.name}</p>
                  <p className="text-gray-700"><span className="font-medium">Email:</span> {selectedOrder.userId.email}</p>
                  <p className="text-gray-700"><span className="font-medium">Customer ID:</span> {selectedOrder.userId._id}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.products.map((item) => (
                    <div key={item._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Product ID: {item.productId}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-500">Price: ₹{item.priceAtPurchase}</p>
                      </div>
                      <p className="font-semibold text-gray-800">₹{(item.priceAtPurchase * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">Payment Status</p>
                  <span className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                    {selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">Order Status</p>
                  <span className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(selectedOrder.orderStatus)}`}>
                    {selectedOrder.orderStatus.charAt(0).toUpperCase() + selectedOrder.orderStatus.slice(1)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-800">Total Amount</p>
                  <p className="text-2xl font-bold text-blue-600">₹{selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}