import React from 'react';
import { Badge } from "@/components/ui/badge";
import { useAdminInventoryQuery } from "@/hooks/useAdminDashboard";
import { Package, AlertCircle } from 'lucide-react';

interface Product {
            _id: string;
            title: string;
            stock: number;
}

export default function AdminInventory() {
            const { data, isLoading, isError } = useAdminInventoryQuery();

            if (isLoading) {
                        return (
                                    <div className="flex items-center justify-center min-h-screen">
                                                <div className="flex flex-col items-center gap-3">
                                                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                                            <p className="text-gray-600">Loading inventory...</p>
                                                </div>
                                    </div>
                        );
            }

            if (isError) {
                        return (
                                    <div className="flex items-center justify-center min-h-screen">
                                                <div className="flex items-center gap-2 text-red-600">
                                                            <AlertCircle className="w-5 h-5" />
                                                            <p>Failed to load inventory</p>
                                                </div>
                                    </div>
                        );
            }

            return (
                        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
                                    <div className="max-w-6xl mx-auto">
                                                {/* Header */}
                                                <div className="mb-8">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                        <Package className="w-8 h-8 text-blue-600" />
                                                                        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
                                                            </div>
                                                            <p className="text-gray-600">Monitor and manage low stock products</p>
                                                </div>

                                                {/* Stats Card */}
                                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                                                            <div className="flex items-center justify-between">
                                                                        <div>
                                                                                    <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                                                                                    <p className="text-3xl font-bold text-gray-900 mt-1">{data?.length || 0}</p>
                                                                        </div>
                                                                        <div className="bg-red-50 p-3 rounded-full">
                                                                                    <AlertCircle className="w-6 h-6 text-red-600" />
                                                                        </div>
                                                            </div>
                                                </div>

                                                {/* Table Card */}
                                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                                            <div className="overflow-x-auto">
                                                                        <table className="w-full">
                                                                                    <thead>
                                                                                                <tr className="bg-gray-50 border-b border-gray-200">
                                                                                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                                                                                        Product Name
                                                                                                            </th>
                                                                                                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                                                                                        Stock Level
                                                                                                            </th>
                                                                                                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                                                                                        Status
                                                                                                            </th>
                                                                                                </tr>
                                                                                    </thead>
                                                                                    <tbody className="divide-y divide-gray-200">
                                                                                                {data?.length === 0 ? (
                                                                                                            <tr>
                                                                                                                        <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                                                                                                                                    No low stock items found
                                                                                                                        </td>
                                                                                                            </tr>
                                                                                                ) : (
                                                                                                            data?.map((product: Product) => (
                                                                                                                        <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                                                                                                                    <td className="px-6 py-4">
                                                                                                                                                <div className="flex items-center gap-3">
                                                                                                                                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                                                                                                                                        <Package className="w-5 h-5 text-blue-600" />
                                                                                                                                                            </div>
                                                                                                                                                            <span className="font-medium text-gray-900">{product.title}</span>
                                                                                                                                                </div>
                                                                                                                                    </td>
                                                                                                                                    <td className="px-6 py-4 text-center">
                                                                                                                                                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-700 font-semibold">
                                                                                                                                                            {product.stock}
                                                                                                                                                </span>
                                                                                                                                    </td>
                                                                                                                                    <td className="px-6 py-4 text-center">
                                                                                                                                                <Badge variant="destructive" className="font-medium">
                                                                                                                                                            Low Stock
                                                                                                                                                </Badge>
                                                                                                                                    </td>
                                                                                                                        </tr>
                                                                                                            ))
                                                                                                )}
                                                                                    </tbody>
                                                                        </table>
                                                            </div>
                                                </div>
                                    </div>
                        </div>
            );
}