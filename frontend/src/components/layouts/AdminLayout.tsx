import React, { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Globe, Menu, X } from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
            const [activeTab, setActiveTab] = useState('dashboard');
            const [sidebarOpen, setSidebarOpen] = useState(true);
            const navigate = useNavigate();
            const location = useLocation();



            const navItems = [
                        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
                        { id: 'products', label: 'Products', icon: Package, path: '/admin/products' },
                        { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
                        { id: 'customers', label: 'Customers', icon: Users, path: '/admin/customers' },
                        { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
            ];

            const stats = [
                        { label: 'Total Revenue', value: '$45,231', change: '+12.5%', positive: true },
                        { label: 'Orders', value: '1,234', change: '+8.2%', positive: true },
                        { label: 'Customers', value: '892', change: '+23.1%', positive: true },
                        { label: 'Products', value: '156', change: '-2.4%', positive: false },
            ];

            return (
                        < div className="flex h-[95vh]  bg-gray-50" >
                                    {/* Sidebar */}
                                    <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col`
                                    }>
                                                <div className="p-6 flex items-center justify-between border-b border-slate-700">
                                                            {sidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
                                                            <button
                                                                        onClick={() => setSidebarOpen(!sidebarOpen)}
                                                                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                                                            >
                                                                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                                                            </button>
                                                </div>

                                                <nav className="flex-1 p-4 space-y-2">
                                                            {navItems.map((item) => {
                                                                        const Icon = item.icon;
                                                                        return (
                                                                                    <button
                                                                                                key={item.id}
                                                                                                onClick={() => { setActiveTab(item.id), navigate(item.path) }}
                                                                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${location.pathname === item.path
                                                                                                            ? 'bg-blue-600 text-white shadow-lg'
                                                                                                            : 'text-gray-300 hover:bg-slate-800'
                                                                                                            }`}
                                                                                    >
                                                                                                <Icon size={20} />
                                                                                                {sidebarOpen && <span className="font-medium">{item.label}</span>}
                                                                                    </button>
                                                                        );
                                                            })}
                                                </nav>

                                                <div className="p-4 border-t border-slate-700">
                                                            <button
                                                                        onClick={() => window.open('/', '_blank')}
                                                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors"
                                                            >
                                                                        <Globe size={20} />
                                                                        {sidebarOpen && <span className="font-medium">Go to Website →</span>}
                                                            </button>
                                                </div>
                                    </aside >

                                    {/* Main Content */}
                                    < main className="flex-1 overflow-auto" >
                                                {/* Header */}
                                                < header className="bg-white border-b border-gray-200 px-8 py-6" >
                                                            <div className="flex items-center justify-between">
                                                                        <div>
                                                                                    <h2 className="text-3xl font-bold text-gray-800">
                                                                                                {navItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                                                                                    </h2>
                                                                                    <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-4">
                                                                                    <div className="text-right">
                                                                                                <p className="text-sm font-medium text-gray-700">Admin User</p>
                                                                                                <p className="text-xs text-gray-500">admin@company.com</p>
                                                                                    </div>
                                                                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                                                                                A
                                                                                    </div>
                                                                        </div>
                                                            </div>
                                                </header >

                                                {/* Content */}
                                                < div className='p-8' >
                                                            <Outlet />
                                                </div >
                                    </main >
                        </div >
            );
}