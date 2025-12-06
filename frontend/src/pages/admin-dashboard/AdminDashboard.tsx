import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Home, Package, AlertTriangle, Users, Bell, LogOut, Plus, Pencil, Trash2, TrendingUp, DollarSign, Star, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Product, StatCardProps } from '@/types/adminTypes';

// Mock Data
const salesData = [
            { name: 'Mon', sales: 4000 },
            { name: 'Tue', sales: 3000 },
            { name: 'Wed', sales: 5000 },
            { name: 'Thu', sales: 4500 },
            { name: 'Fri', sales: 6000 },
            { name: 'Sat', sales: 5500 },
            { name: 'Sun', sales: 4800 }
];

const initialProducts = [
            { id: 1, name: 'Wireless Headphones', price: 79.99, sold: 145, stock: 23, category: 'Audio' },
            { id: 2, name: 'Smart Watch', price: 199.99, sold: 98, stock: 5, category: 'Wearables' },
            { id: 3, name: 'USB-C Cable', price: 12.99, sold: 234, stock: 156, category: 'Accessories' },
            { id: 4, name: 'Phone Case', price: 24.99, sold: 189, stock: 8, category: 'Accessories' },
            { id: 5, name: 'Laptop Stand', price: 49.99, sold: 67, stock: 34, category: 'Office' },
            { id: 6, name: 'Mechanical Keyboard', price: 129.99, sold: 156, stock: 45, category: 'Peripherals' }
];

const customers = [
            { id: 1, name: 'John Smith', orders: 24, totalSpend: 2456.80 },
            { id: 2, name: 'Sarah Johnson', orders: 18, totalSpend: 1890.50 },
            { id: 3, name: 'Michael Brown', orders: 15, totalSpend: 1678.90 },
            { id: 4, name: 'Emily Davis', orders: 12, totalSpend: 1234.60 }
];

const AdminDashboard = () => {
            const [sidebarOpen, setSidebarOpen] = useState(false);
            const [currentPage, setCurrentPage] = useState('overview');
            const [products, setProducts] = useState(initialProducts);
            const [salesFilter, setSalesFilter] = useState('week');
            const [showAddDialog, setShowAddDialog] = useState(false);
            const [showEditDialog, setShowEditDialog] = useState(false);
            const [showDeleteDialog, setShowDeleteDialog] = useState(false);
            const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
            const [toast, setToast] = useState<string | null>(null);
            const [formData, setFormData] = useState({ name: '', price: '', stock: '', category: '' });

            const navItems = [
                        { id: 'overview', label: 'Overview', icon: Home },
                        { id: 'sales', label: 'Sales', icon: TrendingUp },
                        { id: 'top-products', label: 'Products', icon: Package },
                        { id: 'inventory', label: 'Inventory', icon: AlertTriangle },
                        { id: 'customers', label: 'Customers', icon: Users }
            ];

            const showToast = (message: string) => {
                        setToast(message);
                        setTimeout(() => setToast(null), 3000);
            };

            const handleAddProduct = () => {
                        if (formData.name && formData.price && formData.stock) {
                                    const newProduct = {
                                                id: products.length + 1,
                                                name: formData.name,
                                                price: parseFloat(formData.price),
                                                sold: 0,
                                                stock: parseInt(formData.stock),
                                                category: formData.category || 'General'
                                    };
                                    setProducts([...products, newProduct]);
                                    setShowAddDialog(false);
                                    setFormData({ name: '', price: '', stock: '', category: '' });
                                    showToast('Product added successfully!');
                        }
            };

            const handleEditProduct = () => {
                        if (formData.name && formData.price && formData.stock) {
                                    if (!selectedProduct) return;
                                    setProducts(products.map(p =>
                                                p.id === selectedProduct.id
                                                            ? { ...p, name: formData.name, price: parseFloat(formData.price), stock: parseInt(formData.stock), category: formData.category }
                                                            : p
                                    ));
                                    setShowEditDialog(false);
                                    setSelectedProduct(null);
                                    setFormData({ name: '', price: '', stock: '', category: '' });
                                    showToast('Product updated successfully!');
                        }
            };

            const handleDeleteProduct = () => {
                        if (!selectedProduct) return;
                        setProducts(products.filter(p => p.id !== selectedProduct.id));
                        setShowDeleteDialog(false);
                        setSelectedProduct(null);
                        showToast('Product deleted successfully!');
            };

            const openEditDialog = (product: Product) => {
                        if (!selectedProduct) return;
                        setSelectedProduct(product);
                        setFormData({ name: product.name, price: product.price.toString(), stock: product.stock.toString(), category: product.category });
                        setShowEditDialog(true);
            };

            const openDeleteDialog = (product: Product) => {
                        setSelectedProduct(product);
                        setShowDeleteDialog(true);
            };

            const totalSales = products.reduce((sum, p) => sum + (p.sold * p.price), 0);
            const lowStockCount = products.filter(p => p.stock < 10).length;
            const topProduct = products.reduce((max, p) => p.sold > max.sold ? p : max, products[0]);

            const Sidebar = () => (
                        <div className={`fixed  inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
                                                <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                                            <X className="w-5 h-5" />
                                                </button>
                                    </div>
                                    <nav className="p-4 space-y-1">
                                                {navItems.map(item => {
                                                            const Icon = item.icon;
                                                            return (
                                                                        <button
                                                                                    key={item.id}
                                                                                    onClick={() => {
                                                                                                setCurrentPage(item.id);
                                                                                                setSidebarOpen(false);
                                                                                    }}
                                                                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${currentPage === item.id
                                                                                                ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                                                                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                                                                }`}
                                                                        >
                                                                                    <Icon className="w-5 h-5" />
                                                                                    <span className="font-medium">{item.label}</span>
                                                                        </button>
                                                            );
                                                })}
                                    </nav>
                        </div>
            );

            const StatCard = ({ title, value, change, icon: Icon }: StatCardProps) => (
                        <Card>
                                    <CardContent className="p-6">
                                                <div className="flex items-center justify-between">
                                                            <div>
                                                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                                                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</h3>
                                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{change}</p>
                                                            </div>
                                                            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                                                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                                            </div>
                                                </div>
                                    </CardContent>
                        </Card>
            );

            const OverviewPage = () => (
                        <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                <div>
                                                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Overview</h1>
                                                            <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, here's your summary</p>
                                                </div>
                                                <Button onClick={() => setShowAddDialog(true)}>
                                                            <Plus className="w-4 h-4 mr-2" />
                                                            Add Product
                                                </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                                <StatCard
                                                            title="Total Revenue"
                                                            value={`$${totalSales.toFixed(2)}`}
                                                            change="+12.5% from last month"
                                                            icon={DollarSign}
                                                />
                                                <StatCard
                                                            title="Total Products"
                                                            value={products.length}
                                                            change="Active in inventory"
                                                            icon={Package}
                                                />
                                                <StatCard
                                                            title="Low Stock Items"
                                                            value={lowStockCount}
                                                            change="Needs attention"
                                                            icon={AlertTriangle}
                                                />
                                                <StatCard
                                                            title="Top Product"
                                                            value={topProduct?.sold}
                                                            change={topProduct?.name}
                                                            icon={Star}
                                                />
                                    </div>

                                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                                                <Card className="xl:col-span-2">
                                                            <CardHeader>
                                                                        <CardTitle>Sales Overview</CardTitle>
                                                                        <CardDescription>Weekly sales performance</CardDescription>
                                                            </CardHeader>
                                                            <CardContent>
                                                                        <ResponsiveContainer width="100%" height={350}>
                                                                                    <LineChart data={salesData}>
                                                                                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                                                                                                <XAxis dataKey="name" stroke="#6b7280" />
                                                                                                <YAxis stroke="#6b7280" />
                                                                                                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                                                                                                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
                                                                                    </LineChart>
                                                                        </ResponsiveContainer>
                                                            </CardContent>
                                                </Card>

                                                <Card>
                                                            <CardHeader>
                                                                        <CardTitle>Quick Stats</CardTitle>
                                                                        <CardDescription>Recent activity</CardDescription>
                                                            </CardHeader>
                                                            <CardContent className="space-y-4">
                                                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                                                    <div>
                                                                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Orders Today</p>
                                                                                                <p className="text-xs text-gray-600 dark:text-gray-400">12 new orders</p>
                                                                                    </div>
                                                                                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                                                                        </div>
                                                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                                                    <div>
                                                                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Revenue Today</p>
                                                                                                <p className="text-xs text-gray-600 dark:text-gray-400">$1,234.56</p>
                                                                                    </div>
                                                                                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                                                                        </div>
                                                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                                                    <div>
                                                                                                <p className="text-sm font-medium text-gray-900 dark:text-white">New Customers</p>
                                                                                                <p className="text-xs text-gray-600 dark:text-gray-400">8 registered</p>
                                                                                    </div>
                                                                                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                                                                        </div>
                                                            </CardContent>
                                                </Card>
                                    </div>
                        </div>
            );

            const SalesPage = () => (
                        <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                <div>
                                                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sales</h1>
                                                            <p className="text-gray-600 dark:text-gray-400 mt-1">Track your sales performance</p>
                                                </div>
                                                <div className="flex gap-2">
                                                            {['Today', 'Week', 'Month'].map(filter => (
                                                                        <Button
                                                                                    key={filter}
                                                                                    variant={salesFilter === filter.toLowerCase() ? 'default' : 'outline'}
                                                                                    onClick={() => setSalesFilter(filter.toLowerCase())}
                                                                                    size="sm"
                                                                        >
                                                                                    {filter}
                                                                        </Button>
                                                            ))}
                                                </div>
                                    </div>

                                    <Card>
                                                <CardHeader>
                                                            <CardTitle>Sales Chart</CardTitle>
                                                            <CardDescription>Performance over time</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                            <ResponsiveContainer width="100%" height={400}>
                                                                        <BarChart data={salesData}>
                                                                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                                                                                    <XAxis dataKey="name" stroke="#6b7280" />
                                                                                    <YAxis stroke="#6b7280" />
                                                                                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                                                                                    <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                                                                        </BarChart>
                                                            </ResponsiveContainer>
                                                </CardContent>
                                    </Card>
                        </div>
            );

            const TopProductsPage = () => (
                        <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                <div>
                                                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
                                                            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your product inventory</p>
                                                </div>
                                                <Button onClick={() => setShowAddDialog(true)}>
                                                            <Plus className="w-4 h-4 mr-2" />
                                                            Add Product
                                                </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                {products.sort((a, b) => b.sold - a.sold).map(product => (
                                                            <Card key={product.id}>
                                                                        <CardContent className="p-6">
                                                                                    <div className="flex items-start justify-between mb-4">
                                                                                                <div>
                                                                                                            <Badge variant="outline" className="mb-2">{product.category}</Badge>
                                                                                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                                                                                                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                                                                                                                        ${product.price.toFixed(2)}
                                                                                                            </p>
                                                                                                </div>
                                                                                    </div>

                                                                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                                                                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                                                                                            <p className="text-xs text-gray-600 dark:text-gray-400">Sold</p>
                                                                                                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{product.sold}</p>
                                                                                                </div>
                                                                                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                                                                                            <p className="text-xs text-gray-600 dark:text-gray-400">Stock</p>
                                                                                                            <Badge variant={product.stock < 10 ? 'destructive' : 'default'}>
                                                                                                                        {product.stock}
                                                                                                            </Badge>
                                                                                                </div>
                                                                                    </div>

                                                                                    <div className="flex gap-2">
                                                                                                <Button
                                                                                                            variant="outline"
                                                                                                            size="sm"
                                                                                                            onClick={() => openEditDialog(product)}
                                                                                                            className="flex-1"
                                                                                                >
                                                                                                            <Pencil className="w-4 h-4 mr-2" />
                                                                                                            Edit
                                                                                                </Button>
                                                                                                <Button
                                                                                                            variant="outline"
                                                                                                            size="sm"
                                                                                                            onClick={() => openDeleteDialog(product)}
                                                                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                                                                                >
                                                                                                            <Trash2 className="w-4 h-4" />
                                                                                                </Button>
                                                                                    </div>
                                                                        </CardContent>
                                                            </Card>
                                                ))}
                                    </div>
                        </div>
            );

            const InventoryPage = () => {
                        const lowStockProducts = products.filter(p => p.stock < 10);

                        return (
                                    <div className="space-y-6">
                                                <div>
                                                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Low Stock Alert</h1>
                                                            <p className="text-gray-600 dark:text-gray-400 mt-1">Items that need immediate attention</p>
                                                </div>

                                                <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-900">
                                                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                                                            <AlertDescription className="text-orange-800 dark:text-orange-200 ml-2">
                                                                        {lowStockProducts.length} products are running low on stock. Consider restocking soon.
                                                            </AlertDescription>
                                                </Alert>

                                                <div className="grid gap-4">
                                                            {lowStockProducts.map(product => (
                                                                        <Card key={product.id}>
                                                                                    <CardContent className="p-6">
                                                                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                                                                            <div className="flex-1">
                                                                                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                                                                                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                                                                                                    {product.category} • ${product.price.toFixed(2)} • {product.sold} sold
                                                                                                                        </p>
                                                                                                            </div>
                                                                                                            <div className="flex items-center gap-4">
                                                                                                                        <Badge variant="destructive" className="text-base px-4 py-2">
                                                                                                                                    {product.stock} left
                                                                                                                        </Badge>
                                                                                                                        <Button variant="outline" size="sm">
                                                                                                                                    Restock
                                                                                                                        </Button>
                                                                                                            </div>
                                                                                                </div>
                                                                                    </CardContent>
                                                                        </Card>
                                                            ))}
                                                </div>
                                    </div>
                        );
            };

            const CustomersPage = () => (
                        <div className="space-y-6">
                                    <div>
                                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Top Customers</h1>
                                                <p className="text-gray-600 dark:text-gray-400 mt-1">Your most valuable customers</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {customers.map((customer) => (
                                                            <Card key={customer.id}>
                                                                        <CardContent className="p-6">
                                                                                    <div className="flex items-center gap-4 mb-4">
                                                                                                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
                                                                                                            {customer.name.split(' ').map(n => n[0]).join('')}
                                                                                                </div>
                                                                                                <div>
                                                                                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{customer.name}</h3>
                                                                                                            <p className="text-sm text-gray-600 dark:text-gray-400">Customer ID: #{customer.id}</p>
                                                                                                </div>
                                                                                    </div>

                                                                                    <div className="grid grid-cols-2 gap-4">
                                                                                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                                                                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Orders</p>
                                                                                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{customer.orders}</p>
                                                                                                </div>
                                                                                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                                                                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Spend</p>
                                                                                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${customer.totalSpend.toFixed(2)}</p>
                                                                                                </div>
                                                                                    </div>
                                                                        </CardContent>
                                                            </Card>
                                                ))}
                                    </div>
                        </div>
            );

            return (
                        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                                    {sidebarOpen && (
                                                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                                    )}

                                    <Sidebar />

                                    <div className="lg:pl-64">
                                                <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                                                            <div className="flex items-center justify-between">
                                                                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                                                                    <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                                                        </button>

                                                                        <div className="flex items-center gap-4 ml-auto">
                                                                                    <Button variant="ghost" size="icon">
                                                                                                <Bell className="w-5 h-5" />
                                                                                    </Button>

                                                                                    <div className="flex items-center gap-3">
                                                                                                <div className="text-right hidden sm:block">
                                                                                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                                                                                                            <p className="text-xs text-gray-600 dark:text-gray-400">admin@example.com</p>
                                                                                                </div>
                                                                                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                                                                                            AU
                                                                                                </div>
                                                                                    </div>

                                                                                    <Button variant="ghost" size="icon">
                                                                                                <LogOut className="w-5 h-5" />
                                                                                    </Button>
                                                                        </div>
                                                            </div>
                                                </header>

                                                <main className="p-6">
                                                            {currentPage === 'overview' && <OverviewPage />}
                                                            {currentPage === 'sales' && <SalesPage />}
                                                            {currentPage === 'top-products' && <TopProductsPage />}
                                                            {currentPage === 'inventory' && <InventoryPage />}
                                                            {currentPage === 'customers' && <CustomersPage />}
                                                </main>
                                    </div>

                                    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                                                <DialogContent>
                                                            <DialogHeader>
                                                                        <DialogTitle>Add New Product</DialogTitle>
                                                                        <DialogDescription>Enter the details of the new product.</DialogDescription>
                                                            </DialogHeader>
                                                            <div className="space-y-4">
                                                                        <div>
                                                                                    <Label htmlFor="name">Product Name</Label>
                                                                                    <Input
                                                                                                id="name"
                                                                                                value={formData.name}
                                                                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                                                                placeholder="Enter product name"
                                                                                    />
                                                                        </div>
                                                                        <div>
                                                                                    <Label htmlFor="category">Category</Label>
                                                                                    <Input
                                                                                                id="category"
                                                                                                value={formData.category}
                                                                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                                                                placeholder="e.g., Electronics"
                                                                                    />
                                                                        </div>
                                                                        <div className="grid grid-cols-2 gap-4">
                                                                                    <div>
                                                                                                <Label htmlFor="price">Price</Label>
                                                                                                <Input
                                                                                                            id="price"
                                                                                                            type="number"
                                                                                                            value={formData.price}
                                                                                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                                                                            placeholder="0.00"
                                                                                                />
                                                                                    </div>
                                                                                    <div>
                                                                                                <Label htmlFor="stock">Stock</Label>
                                                                                                <Input
                                                                                                            id="stock"
                                                                                                            type="number"
                                                                                                            value={formData.stock}
                                                                                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                                                                                            placeholder="0"
                                                                                                />
                                                                                    </div>
                                                                        </div>
                                                            </div>
                                                            <DialogFooter>
                                                                        <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                                                                        <Button onClick={handleAddProduct}>Add Product</Button>
                                                            </DialogFooter>
                                                </DialogContent>
                                    </Dialog>

                                    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                                                <DialogContent>
                                                            <DialogHeader>
                                                                        <DialogTitle>Edit Product</DialogTitle>
                                                                        <DialogDescription>Update the product details.</DialogDescription>
                                                            </DialogHeader>
                                                            <div className="space-y-4">
                                                                        <div>
                                                                                    <Label htmlFor="edit-name">Product Name</Label>
                                                                                    <Input
                                                                                                id="edit-name"
                                                                                                value={formData.name}
                                                                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                                                    />
                                                                        </div>
                                                                        <div>
                                                                                    <Label htmlFor="edit-category">Category</Label>
                                                                                    <Input
                                                                                                id="edit-category"
                                                                                                value={formData.category}
                                                                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                                                    />
                                                                        </div>
                                                                        <div className="grid grid-cols-2 gap-4">
                                                                                    <div>
                                                                                                <Label htmlFor="edit-price">Price</Label>
                                                                                                <Input
                                                                                                            id="edit-price"
                                                                                                            type="number"
                                                                                                            value={formData.price}
                                                                                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                                                                />
                                                                                    </div>
                                                                                    <div>
                                                                                                <Label htmlFor="edit-stock">Stock</Label>
                                                                                                <Input
                                                                                                            id="edit-stock"
                                                                                                            type="number"
                                                                                                            value={formData.stock}
                                                                                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                                                                                />
                                                                                    </div>
                                                                        </div>
                                                            </div>
                                                            <DialogFooter>
                                                                        <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
                                                                        <Button onClick={handleEditProduct}>Save Changes</Button>
                                                            </DialogFooter>
                                                </DialogContent>
                                    </Dialog>

                                    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                                                <DialogContent>
                                                            <DialogHeader>
                                                                        <DialogTitle>Delete Product</DialogTitle>
                                                                        <DialogDescription>
                                                                                    Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
                                                                        </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                                                                        <Button variant="destructive" onClick={handleDeleteProduct}>Delete</Button>
                                                            </DialogFooter>
                                                </DialogContent>
                                    </Dialog>

                                    {toast && (
                                                <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5">
                                                            <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900">
                                                                        <AlertDescription className="text-green-800 dark:text-green-200">
                                                                                    {toast}
                                                                        </AlertDescription>
                                                            </Alert>
                                                </div>
                                    )}
                        </div>
            );
};

export default AdminDashboard;