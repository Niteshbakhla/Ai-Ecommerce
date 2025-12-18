import { useState } from 'react';
import { Search, ShoppingCart, X } from 'lucide-react';
import type { FilterStatus, Order, OrderStatus, PaymentStatus } from '@/types/orderTypes';

export default function OrdersPage() {
  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');



  // Sample orders data
  const [orders, setOrders] = useState<Order[]>([
    {
      _id: 'ORD-001',
      orderNumber: 'ORD-001',
      customer: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 234 567 8900'
      },
      items: [
        { productName: 'Wireless Headphones', quantity: 1, price: 299.99 },
        { productName: 'Laptop Stand', quantity: 2, price: 49.99 }
      ],
      totalAmount: 399.97,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      shippingAddress: '123 Main St, New York, NY 10001',
      createdAt: '2024-12-10T10:30:00',
      deliveredAt: '2024-12-12T14:20:00'
    },
    {
      _id: 'ORD-002',
      orderNumber: 'ORD-002',
      customer: {
        name: 'Sarah Smith',
        email: 'sarah.smith@email.com',
        phone: '+1 234 567 8901'
      },
      items: [
        { productName: 'Smart Watch', quantity: 1, price: 199.99 }
      ],
      totalAmount: 199.99,
      status: 'shipped',
      paymentStatus: 'paid',
      paymentMethod: 'PayPal',
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
      createdAt: '2024-12-11T15:45:00',
      shippedAt: '2024-12-12T09:00:00'
    },
    {
      _id: 'ORD-003',
      orderNumber: 'ORD-003',
      customer: {
        name: 'Michael Johnson',
        email: 'michael.j@email.com',
        phone: '+1 234 567 8902'
      },
      items: [
        { productName: 'Wireless Headphones', quantity: 1, price: 299.99 },
        { productName: 'Smart Watch', quantity: 1, price: 199.99 }
      ],
      totalAmount: 499.98,
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      shippingAddress: '789 Pine Rd, Chicago, IL 60601',
      createdAt: '2024-12-13T08:15:00'
    },
    {
      _id: 'ORD-004',
      orderNumber: 'ORD-004',
      customer: {
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        phone: '+1 234 567 8903'
      },
      items: [
        { productName: 'Laptop Stand', quantity: 3, price: 49.99 }
      ],
      totalAmount: 149.97,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'Bank Transfer',
      shippingAddress: '321 Elm St, Miami, FL 33101',
      createdAt: '2024-12-13T11:00:00'
    },
    {
      _id: 'ORD-005',
      orderNumber: 'ORD-005',
      customer: {
        name: 'David Wilson',
        email: 'david.wilson@email.com',
        phone: '+1 234 567 8904'
      },
      items: [
        { productName: 'Smart Watch', quantity: 2, price: 199.99 }
      ],
      totalAmount: 399.98,
      status: 'cancelled',
      paymentStatus: 'refunded',
      paymentMethod: 'Credit Card',
      shippingAddress: '654 Maple Dr, Seattle, WA 98101',
      createdAt: '2024-12-09T16:30:00',
      cancelledAt: '2024-12-10T10:00:00'
    },
    {
      _id: 'ORD-006',
      orderNumber: 'ORD-006',
      customer: {
        name: 'Lisa Anderson',
        email: 'lisa.a@email.com',
        phone: '+1 234 567 8905'
      },
      items: [
        { productName: 'Wireless Headphones', quantity: 1, price: 299.99 }
      ],
      totalAmount: 299.99,
      status: 'shipped',
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      shippingAddress: '987 Cedar Ln, Boston, MA 02101',
      createdAt: '2024-12-12T14:20:00',
      shippedAt: '2024-12-13T10:30:00'
    }
  ]);

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setShowOrderDetails(false);
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };
  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status];
  };


  const getPaymentStatusColor = (status: PaymentStatus) => {
    const colors = {
      paid: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      refunded: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {/* <h1 className="text-4xl font-bold text-gray-800 mb-2">Orders Management</h1> */}
          <p className="text-gray-600">View and manage all customer orders</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search orders by order number, customer name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-medium"
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{order.orderNumber}</div>
                      <div className="text-sm text-gray-500">{order.items.length} item(s)</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-800">{formatDate(order.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">${order.totalAmount.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">{order.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewOrderDetails(order)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
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
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Order Number</p>
                  <p className="text-lg font-bold text-gray-800">{selectedOrder.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Order Date</p>
                  <p className="text-lg font-medium text-gray-800">{formatDate(selectedOrder.createdAt)}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-800 mb-3">Customer Information</h4>
                <div className="space-y-2">
                  <p className="text-gray-700"><span className="font-medium">Name:</span> {selectedOrder.customer.name}</p>
                  <p className="text-gray-700"><span className="font-medium">Email:</span> {selectedOrder.customer.email}</p>
                  <p className="text-gray-700"><span className="font-medium">Phone:</span> {selectedOrder.customer.phone}</p>
                  <p className="text-gray-700"><span className="font-medium">Address:</span> {selectedOrder.shippingAddress}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{item.productName}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & Status */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">Payment Status</p>
                  <span className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                    {selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">Order Status</p>
                  <span className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-800">Total Amount</p>
                  <p className="text-2xl font-bold text-blue-600">${selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
              </div>

              {/* Update Status */}
              {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Update Order Status</p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedOrder.status === 'pending' && (
                      <button
                        onClick={() => handleUpdateOrderStatus(selectedOrder._id, 'processing')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Mark as Processing
                      </button>
                    )}
                    {selectedOrder.status === 'processing' && (
                      <button
                        onClick={() => handleUpdateOrderStatus(selectedOrder._id, 'shipped')}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                      >
                        Mark as Shipped
                      </button>
                    )}
                    {selectedOrder.status === 'shipped' && (
                      <button
                        onClick={() => handleUpdateOrderStatus(selectedOrder._id, 'delivered')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        Mark as Delivered
                      </button>
                    )}
                    <button
                      onClick={() => handleUpdateOrderStatus(selectedOrder._id, 'cancelled')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}