import { useState } from 'react';
import {
            LayoutDashboard,
            Package,
            ShoppingCart,
            Users,
            BarChart3,
            Globe,
            Menu,
            X,
            NotebookPen,
            Bell,
            Settings,
            ChevronDown
} from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { logout } from '@/store/slices/authSlices';

export default function AdminLayout() {
            const [sidebarOpen, setSidebarOpen] = useState(true);
            const [showUserMenu, setShowUserMenu] = useState(false);
            const navigate = useNavigate();
            const location = useLocation();
            const dispatch = useDispatch();

            const user = useSelector((state: RootState) => state.auth.user);


            const navItems = [
                        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
                        { id: 'products', label: 'Products', icon: Package, path: '/admin/products' },
                        { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
                        { id: 'customers', label: 'Customers', icon: Users, path: '/admin/customers' },
                        { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
                        { id: 'inventory', label: 'Inventory', icon: NotebookPen, path: '/admin/inventory' },
            ];

            const handleLogout = () => {
                        if (confirm('Are you sure you want to log out?')) {
                                    dispatch(logout());
                                    navigate("/login");
                        }
            };

            return (
                        <div className="flex h-[95vh] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                                    {/* Sidebar */}
                                    <aside
                                                className={`bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col shadow-2xl
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-72' : 'w-20'}`}
                                    >
                                                {/* Header */}
                                                <div className="p-6 flex items-center justify-between border-b border-slate-700/50">
                                                            <div className={`flex items-center gap-3 transition-all duration-200 overflow-hidden
            ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                                                                        <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                                                                                    <LayoutDashboard size={20} />
                                                                        </div>
                                                                        <div className={`${sidebarOpen ? 'opacity-100 w-auto ' : 'opacity-0 w-0'}`}>
                                                                                    <h1 className="text-xl font-bold ">Admin Panel</h1>
                                                                                    <p className="text-xs text-slate-400 ">Management Dashboard</p>
                                                                        </div>
                                                            </div>

                                                            <button
                                                                        onClick={() => setSidebarOpen(!sidebarOpen)}
                                                                        className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                                                            >
                                                                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                                                            </button>
                                                </div>

                                                {/* Nav */}
                                                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                                                            {navItems.map((item) => {
                                                                        const Icon = item.icon;
                                                                        const isActive = location.pathname === item.path;
                                                                        return (
                                                                                    <button
                                                                                                key={item.id}
                                                                                                onClick={() => {
                                                                                                            navigate(item.path);
                                                                                                }}
                                                                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200 group relative
                ${isActive
                                                                                                                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                                                                                                                        : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
                                                                                                            }`}
                                                                                    >
                                                                                                <Icon size={20} className="min-w-[20px] transition-transform group-hover:scale-110" />

                                                                                                <span
                                                                                                            className={`font-medium transition-all duration-200 overflow-hidden whitespace-nowrap
                  ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
                                                                                                >
                                                                                                            {item.label}
                                                                                                </span>

                                                                                                {isActive && (
                                                                                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                                                                                                )}
                                                                                    </button>
                                                                        );
                                                            })}
                                                </nav>

                                                {/* Footer */}
                                                <div className="p-4 border-t border-slate-700/50 space-y-2">
                                                            <button
                                                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all group"
                                                                        onClick={() => window.open('/', '_blank')}
                                                            >
                                                                        <Globe size={20} className="min-w-[20px] transition-transform group-hover:scale-110" />
                                                                        <span
                                                                                    className={`font-medium transition-all duration-200 overflow-hidden whitespace-nowrap
              ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
                                                                        >
                                                                                    Go to Website →
                                                                        </span>
                                                            </button>


                                                </div>
                                    </aside>

                                    {/* Main */}
                                    <main className="flex-1 overflow-auto">
                                                <header className="bg-white border-b border-gray-200 shadow-sm">
                                                            <div className="px-8 py-6 flex items-center justify-between">
                                                                        <div>
                                                                                    <h2 className="text-3xl font-bold text-gray-800">
                                                                                                {navItems.find(item => item.id === location.pathname.split("/")[2])?.label || 'Dashboards'}

                                                                                    </h2>
                                                                                    <p className="text-sm text-gray-500 mt-1">
                                                                                                Welcome back{user?.name ? `, ${user.name}` : ''}
                                                                                    </p>
                                                                        </div>

                                                                        <div className="flex items-center gap-4">
                                                                                    {/* Notifications */}
                                                                                    <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                                                                <Bell size={20} className="text-gray-600" />
                                                                                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                                                                    </button>

                                                                                    {/* Settings */}
                                                                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                                                                <Settings size={20} className="text-gray-600" />
                                                                                    </button>

                                                                                    {/* User Menu */}
                                                                                    {user && (
                                                                                                <div className="relative">
                                                                                                            <button
                                                                                                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                                                                                                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                                                                            >
                                                                                                                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                                                                                                                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                                                                                                        </div>
                                                                                                                        <div className="hidden lg:block text-left">
                                                                                                                                    <p className="text-sm font-semibold text-gray-700">{user.name}</p>
                                                                                                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                                                                                        </div>
                                                                                                                        <ChevronDown size={16} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                                                                                                            </button>

                                                                                                            {showUserMenu && (
                                                                                                                        <>
                                                                                                                                    <div
                                                                                                                                                className="fixed inset-0 z-10"
                                                                                                                                                onClick={() => setShowUserMenu(false)}
                                                                                                                                    ></div>
                                                                                                                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
                                                                                                                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Profile Settings</a>
                                                                                                                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Account</a>
                                                                                                                                                <div className="border-t border-gray-200 my-2"></div>
                                                                                                                                                <button
                                                                                                                                                            onClick={() => {
                                                                                                                                                                        setShowUserMenu(false);
                                                                                                                                                                        handleLogout();
                                                                                                                                                            }}
                                                                                                                                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                                                                                                                >
                                                                                                                                                            Log out
                                                                                                                                                </button>
                                                                                                                                    </div>
                                                                                                                        </>
                                                                                                            )}
                                                                                                </div>
                                                                                    )}
                                                                        </div>
                                                            </div>
                                                </header>

                                                <div className="p-8">
                                                            <Outlet />
                                                </div>
                                    </main>
                        </div>
            );
}