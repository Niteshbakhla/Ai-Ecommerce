import { useState } from 'react';
import { Search, Users, TrendingUp, ShoppingBag, Mail, Loader2, AlertCircle } from 'lucide-react';
import { useAdminCustomersQuery } from '@/hooks/useAdminDashboard';
import type { CustomerData } from '@/types/adminTypes';




export default function CustomerManagement() {
            const [searchQuery, setSearchQuery] = useState<string>('');
            const [sortBy, setSortBy] = useState<'name' | 'spent' | 'orders'>('spent');

            const { data, isLoading, isError } = useAdminCustomersQuery();

            const filteredCustomers = data?.filter((customer: CustomerData) => {
                        const matchesSearch =
                                    customer.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    customer.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    customer._id.toLowerCase().includes(searchQuery.toLowerCase());

                        return matchesSearch;
            }) || [];

            // Sort customers
            const sortedCustomers = [...filteredCustomers].sort((a, b) => {
                        if (sortBy === 'name') {
                                    return a.user.name.localeCompare(b.user.name);
                        } else if (sortBy === 'spent') {
                                    return b.totalSpent - a.totalSpent;
                        } else {
                                    return b.orderCount - a.orderCount;
                        }
            });

            // Calculate statistics
            const totalCustomers = data?.length || 0;
            const totalRevenue = data?.reduce((sum, c) => sum + c.totalSpent, 0) || 0;
            const totalOrders = data?.reduce((sum, c) => sum + c.orderCount, 0) || 0;
            const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

            if (isLoading) {
                        return (
                                    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                                                <div className="text-center">
                                                            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                                                            <p className="text-gray-600 text-lg">Loading customers...</p>
                                                </div>
                                    </div>
                        );
            }

            if (isError) {
                        return (
                                    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                                                <div className="text-center">
                                                            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                                                            <p className="text-red-600 text-lg">Failed to load customers</p>
                                                </div>
                                    </div>
                        );
            }

            return (
                        <div className="min-h-screen bg-gray-50 p-6">
                                    <div className="max-w-7xl mx-auto">
                                                {/* Header */}
                                                <div className="mb-8">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                        <Users className="w-8 h-8 text-blue-600" />
                                                                        <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
                                                            </div>
                                                            <p className="text-gray-600">View and analyze customer data and purchase history</p>
                                                </div>

                                                {/* Stats Cards */}
                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                                                                        <div className="flex items-center justify-between mb-2">
                                                                                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                                                                                    <Users className="w-5 h-5 text-blue-600" />
                                                                        </div>
                                                                        <p className="text-3xl font-bold text-gray-900">{totalCustomers}</p>
                                                            </div>

                                                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                                                                        <div className="flex items-center justify-between mb-2">
                                                                                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                                                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                                                        </div>
                                                                        <p className="text-3xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                                                            </div>

                                                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                                                                        <div className="flex items-center justify-between mb-2">
                                                                                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                                                                    <ShoppingBag className="w-5 h-5 text-purple-600" />
                                                                        </div>
                                                                        <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                                                            </div>

                                                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                                                                        <div className="flex items-center justify-between mb-2">
                                                                                    <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                                                                                    <TrendingUp className="w-5 h-5 text-orange-600" />
                                                                        </div>
                                                                        <p className="text-3xl font-bold text-gray-900">₹{avgOrderValue.toFixed(0)}</p>
                                                            </div>
                                                </div>

                                                {/* Search and Sort Bar */}
                                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
                                                            <div className="flex-1 relative">
                                                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                                        <input
                                                                                    type="text"
                                                                                    placeholder="Search by name, email, or customer ID..."
                                                                                    value={searchQuery}
                                                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                        />
                                                            </div>
                                                            <select
                                                                        value={sortBy}
                                                                        onChange={(e) => setSortBy(e.target.value as 'name' | 'spent' | 'orders')}
                                                                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-medium"
                                                            >
                                                                        <option value="spent">Sort by Spending</option>
                                                                        <option value="orders">Sort by Orders</option>
                                                                        <option value="name">Sort by Name</option>
                                                            </select>
                                                </div>

                                                {/* Customers Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                            {sortedCustomers.map((customer: CustomerData) => (
                                                                        <div
                                                                                    key={customer._id}
                                                                                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                                                                        >
                                                                                    {/* Customer Avatar and Name */}
                                                                                    <div className="flex items-start gap-4 mb-4">
                                                                                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                                                                                            {customer.user.name.charAt(0).toUpperCase()}
                                                                                                </div>
                                                                                                <div className="flex-1 min-w-0">
                                                                                                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                                                                                        {customer.user.name}
                                                                                                            </h3>
                                                                                                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                                                                                                        <Mail className="w-4 h-4 flex-shrink-0" />
                                                                                                                        <span className="truncate">{customer.user.email}</span>
                                                                                                            </div>
                                                                                                </div>
                                                                                    </div>

                                                                                    {/* Customer Stats */}
                                                                                    <div className="space-y-3 pt-4 border-t border-gray-100">
                                                                                                <div className="flex items-center justify-between">
                                                                                                            <span className="text-sm text-gray-600">Total Spent</span>
                                                                                                            <span className="text-lg font-bold text-green-600">
                                                                                                                        ₹{customer.totalSpent.toLocaleString()}
                                                                                                            </span>
                                                                                                </div>
                                                                                                <div className="flex items-center justify-between">
                                                                                                            <span className="text-sm text-gray-600">Total Orders</span>
                                                                                                            <span className="text-lg font-bold text-blue-600">
                                                                                                                        {customer.orderCount}
                                                                                                            </span>
                                                                                                </div>
                                                                                                <div className="flex items-center justify-between">
                                                                                                            <span className="text-sm text-gray-600">Avg per Order</span>
                                                                                                            <span className="text-lg font-bold text-purple-600">
                                                                                                                        ₹{(customer.totalSpent / customer.orderCount).toFixed(0)}
                                                                                                            </span>
                                                                                                </div>
                                                                                    </div>

                                                                                    {/* Customer ID */}
                                                                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                                                                                <p className="text-xs text-gray-500">
                                                                                                            Customer ID: <span className="font-mono">{customer._id.slice(-8)}</span>
                                                                                                </p>
                                                                                    </div>
                                                                        </div>
                                                            ))}
                                                </div>

                                                {/* Empty State */}
                                                {sortedCustomers.length === 0 && (
                                                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                                                                        <Users size={48} className="mx-auto text-gray-300 mb-4" />
                                                                        <p className="text-gray-500 text-lg">No customers found</p>
                                                                        <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria</p>
                                                            </div>
                                                )}

                                                {/* Customer Table View (Alternative) */}
                                                <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                                            <div className="px-6 py-4 border-b border-gray-200">
                                                                        <h2 className="text-lg font-semibold text-gray-900">Customer List</h2>
                                                            </div>
                                                            <div className="overflow-x-auto">
                                                                        <table className="w-full">
                                                                                    <thead className="bg-gray-50 border-b border-gray-200">
                                                                                                <tr>
                                                                                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                                                        Customer
                                                                                                            </th>
                                                                                                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                                                        Total Orders
                                                                                                            </th>
                                                                                                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                                                        Total Spent
                                                                                                            </th>
                                                                                                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                                                        Avg Order Value
                                                                                                            </th>
                                                                                                </tr>
                                                                                    </thead>
                                                                                    <tbody className="divide-y divide-gray-200">
                                                                                                {sortedCustomers.map((customer: CustomerData) => (
                                                                                                            <tr key={customer._id} className="hover:bg-gray-50 transition-colors">
                                                                                                                        <td className="px-6 py-4">
                                                                                                                                    <div className="flex items-center gap-3">
                                                                                                                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                                                                                                                                            {customer.user.name.charAt(0).toUpperCase()}
                                                                                                                                                </div>
                                                                                                                                                <div>
                                                                                                                                                            <div className="font-medium text-gray-900">{customer.user.name}</div>
                                                                                                                                                            <div className="text-sm text-gray-500">{customer.user.email}</div>
                                                                                                                                                </div>
                                                                                                                                    </div>
                                                                                                                        </td>
                                                                                                                        <td className="px-6 py-4 text-center">
                                                                                                                                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-700 font-semibold">
                                                                                                                                                {customer.orderCount}
                                                                                                                                    </span>
                                                                                                                        </td>
                                                                                                                        <td className="px-6 py-4 text-center">
                                                                                                                                    <span className="font-bold text-green-600 text-lg">
                                                                                                                                                ₹{customer.totalSpent.toLocaleString()}
                                                                                                                                    </span>
                                                                                                                        </td>
                                                                                                                        <td className="px-6 py-4 text-center">
                                                                                                                                    <span className="font-semibold text-purple-600">
                                                                                                                                                ₹{(customer.totalSpent / customer.orderCount).toFixed(0)}
                                                                                                                                    </span>
                                                                                                                        </td>
                                                                                                            </tr>
                                                                                                ))}
                                                                                    </tbody>
                                                                        </table>
                                                            </div>

                                                            {sortedCustomers.length === 0 && (
                                                                        <div className="text-center py-12">
                                                                                    <Users size={48} className="mx-auto text-gray-300 mb-4" />
                                                                                    <p className="text-gray-500 text-lg">No customers found</p>
                                                                        </div>
                                                            )}
                                                </div>
                                    </div>
                        </div>
            );
}