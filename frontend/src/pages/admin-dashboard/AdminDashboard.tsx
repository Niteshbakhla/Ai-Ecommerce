// import React, { useState } from 'react';
// import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Globe, Menu, X } from 'lucide-react';

// export default function AdminDashboard() {
//             const [activeTab, setActiveTab] = useState('dashboard');
//             const [sidebarOpen, setSidebarOpen] = useState(true);

//             const navItems = [
//                         { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
//                         { id: 'products', label: 'Products', icon: Package, path: '/admin/products' },
//                         { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
//                         { id: 'customers', label: 'Customers', icon: Users, path: '/admin/customers' },
//                         { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
//             ];

       

//             return (
//                         <div className="flex h-screen bg-gray-50">
//                                     {/* Sidebar */}
//                                     <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col`}>
//                                                 <div className="p-6 flex items-center justify-between border-b border-slate-700">
//                                                             {sidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
//                                                             <button
//                                                                         onClick={() => setSidebarOpen(!sidebarOpen)}
//                                                                         className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
//                                                             >
//                                                                         {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
//                                                             </button>
//                                                 </div>

//                                                 <nav className="flex-1 p-4 space-y-2">
//                                                             {navItems.map((item) => {
//                                                                         const Icon = item.icon;
//                                                                         return (
//                                                                                     <button
//                                                                                                 key={item.id}
//                                                                                                 onClick={() => setActiveTab(item.id)}
//                                                                                                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id
//                                                                                                             ? 'bg-blue-600 text-white shadow-lg'
//                                                                                                             : 'text-gray-300 hover:bg-slate-800'
//                                                                                                             }`}
//                                                                                     >
//                                                                                                 <Icon size={20} />
//                                                                                                 {sidebarOpen && <span className="font-medium">{item.label}</span>}
//                                                                                     </button>
//                                                                         );
//                                                             })}
//                                                 </nav>

//                                                 <div className="p-4 border-t border-slate-700">
//                                                             <button
//                                                                         onClick={() => window.open('/', '_blank')}
//                                                                         className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors"
//                                                             >
//                                                                         <Globe size={20} />
//                                                                         {sidebarOpen && <span className="font-medium">Go to Website →</span>}
//                                                             </button>
//                                                 </div>
//                                     </aside>

//                                     {/* Main Content */}
//                                     <main className="flex-1 overflow-auto">
//                                                 {/* Header */}
//                                                 <header className="bg-white border-b border-gray-200 px-8 py-6">
//                                                             <div className="flex items-center justify-between">
//                                                                         <div>
//                                                                                     <h2 className="text-3xl font-bold text-gray-800">
//                                                                                                 {navItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
//                                                                                     </h2>
//                                                                                     <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
//                                                                         </div>
//                                                                         <div className="flex items-center gap-4">
//                                                                                     <div className="text-right">
//                                                                                                 <p className="text-sm font-medium text-gray-700">Admin User</p>
//                                                                                                 <p className="text-xs text-gray-500">admin@company.com</p>
//                                                                                     </div>
//                                                                                     <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
//                                                                                                 A
//                                                                                     </div>
//                                                                         </div>
//                                                             </div>
//                                                 </header>

//                                                 {/* Content */}
//                                                 <div className="p-8">
//                                                             {activeTab === 'dashboard' && (
//                                                                         <div className="space-y-6">
//                                                                                     {/* Stats Grid */}
//                                                                                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                                                                                                 {stats.map((stat, index) => (
//                                                                                                             <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//                                                                                                                         <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
//                                                                                                                         <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
//                                                                                                                         <p className={`text-sm mt-2 font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
//                                                                                                                                     {stat.change} from last month
//                                                                                                                         </p>
//                                                                                                             </div>
//                                                                                                 ))}
//                                                                                     </div>

//                                                                                     {/* Recent Activity */}
//                                                                                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                                                                                                 <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//                                                                                                             <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
//                                                                                                             <div className="space-y-4">
//                                                                                                                         {[1, 2, 3, 4].map((i) => (
//                                                                                                                                     <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
//                                                                                                                                                 <div>
//                                                                                                                                                             <p className="font-medium text-gray-800">Order #{1000 + i}</p>
//                                                                                                                                                             <p className="text-sm text-gray-500">Customer {i}</p>
//                                                                                                                                                 </div>
//                                                                                                                                                 <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
//                                                                                                                                                             Completed
//                                                                                                                                                 </span>
//                                                                                                                                     </div>
//                                                                                                                         ))}
//                                                                                                             </div>
//                                                                                                 </div>

//                                                                                                 <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//                                                                                                             <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h3>
//                                                                                                             <div className="space-y-4">
//                                                                                                                         {['Wireless Headphones', 'Smart Watch', 'Laptop Stand', 'USB-C Cable'].map((product, i) => (
//                                                                                                                                     <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
//                                                                                                                                                 <div>
//                                                                                                                                                             <p className="font-medium text-gray-800">{product}</p>
//                                                                                                                                                             <p className="text-sm text-gray-500">{(150 - i * 20)} units sold</p>
//                                                                                                                                                 </div>
//                                                                                                                                                 <span className="text-blue-600 font-semibold">${(99 - i * 10)}</span>
//                                                                                                                                     </div>
//                                                                                                                         ))}
//                                                                                                             </div>
//                                                                                                 </div>
//                                                                                     </div>
//                                                                         </div>
//                                                             )}

//                                                             {activeTab === 'products' && (
//                                                                         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//                                                                                     <h3 className="text-xl font-semibold text-gray-800 mb-4">Product Management</h3>
//                                                                                     <p className="text-gray-600">Manage your product inventory, add new products, and update existing ones.</p>
//                                                                         </div>
//                                                             )}

//                                                             {activeTab === 'orders' && (
//                                                                         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//                                                                                     <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Management</h3>
//                                                                                     <p className="text-gray-600">View and manage customer orders, process shipments, and handle returns.</p>
//                                                                         </div>
//                                                             )}

//                                                             {activeTab === 'customers' && (
//                                                                         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//                                                                                     <h3 className="text-xl font-semibold text-gray-800 mb-4">Customer Management</h3>
//                                                                                     <p className="text-gray-600">View customer profiles, manage accounts, and track customer activity.</p>
//                                                                         </div>
//                                                             )}

//                                                             {activeTab === 'analytics' && (
//                                                                         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//                                                                                     <h3 className="text-xl font-semibold text-gray-800 mb-4">Analytics & Reports</h3>
//                                                                                     <p className="text-gray-600">View detailed analytics, generate reports, and track business metrics.</p>
//                                                                         </div>
//                                                             )}
//                                                 </div>
//                                     </main>
//                         </div>
//             );
// }