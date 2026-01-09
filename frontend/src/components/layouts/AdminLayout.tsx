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
            ChevronDown,
            LogOut,
            UserCircle
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
                        <div className="flex h-screen bg-linear-to-br from-muted via-background to-muted overflow-hidden">
                                    {/* Sidebar */}
                                    <aside
                                                className={`bg-linear-to-b from-primary via-primary to-primary/90 text-primary-foreground flex flex-col shadow-2xl border-r border-primary-foreground/10
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-72' : 'w-20'}`}
                                    >
                                                {/* Header */}
                                                <div className="p-6 flex items-center justify-between border-b border-primary-foreground/20">
                                                            <div className={`flex items-center gap-3 transition-all duration-200 overflow-hidden
            ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                                                                        <div className="relative">
                                                                                    <div className="absolute inset-0 bg-primary-foreground rounded-xl blur-md opacity-30"></div>
                                                                                    <div className="relative w-11 h-11 bg-primary-foreground/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-primary-foreground/30">
                                                                                                <LayoutDashboard size={22} className="text-primary-foreground" />
                                                                                    </div>
                                                                        </div>
                                                                        <div className={`${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                                                                                    <h1 className="text-xl font-bold">Admin Panel</h1>
                                                                                    <p className="text-xs text-primary-foreground/70">Management Dashboard</p>
                                                                        </div>
                                                            </div>

                                                            <button
                                                                        onClick={() => setSidebarOpen(!sidebarOpen)}
                                                                        className="p-2.5 hover:bg-primary-foreground/10 rounded-xl transition-all hover:scale-105 border border-transparent hover:border-primary-foreground/20"
                                                            >
                                                                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                                                            </button>
                                                </div>

                                                {/* Nav */}
                                                <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-foreground/20 scrollbar-track-transparent">
                                                            {navItems.map((item) => {
                                                                        const Icon = item.icon;
                                                                        const isActive = location.pathname === item.path;
                                                                        return (
                                                                                    <button
                                                                                                key={item.id}
                                                                                                onClick={() => {
                                                                                                            navigate(item.path);
                                                                                                }}
                                                                                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl
                transition-all duration-200 group relative
                ${isActive
                                                                                                                        ? 'bg-primary-foreground text-primary shadow-lg scale-105 font-semibold'
                                                                                                                        : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground hover:scale-105'
                                                                                                            }`}
                                                                                    >
                                                                                                <Icon size={20} className="min-w-5 transition-transform group-hover:scale-110" />

                                                                                                <span
                                                                                                            className={`font-medium transition-all duration-200 overflow-hidden whitespace-nowrap
                  ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
                                                                                                >
                                                                                                            {item.label}
                                                                                                </span>

                                                                                                {isActive && (
                                                                                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary-foreground rounded-r-full shadow-lg" />
                                                                                                )}
                                                                                    </button>
                                                                        );
                                                            })}
                                                </nav>

                                                {/* Footer */}
                                                <div className="p-4 border-t border-primary-foreground/20 space-y-2">
                                                            <button
                                                                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all group hover:scale-105"
                                                                        onClick={() => window.open('/', '_blank')}
                                                            >
                                                                        <Globe size={20} className="min-w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
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
                                                <header className="bg-card/80 backdrop-blur-xl border-b-2 border-border shadow-lg sticky top-0 z-10">
                                                            <div className="px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between">
                                                                        <div>
                                                                                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                                                                                {navItems.find(item => item.id === location.pathname.split("/")[2])?.label || 'Dashboard'}
                                                                                    </h2>
                                                                                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                                                                                Welcome back{user?.name ? `, ${user.name}` : ''}
                                                                                                <span className="hidden sm:inline">👋</span>
                                                                                    </p>
                                                                        </div>

                                                                        <div className="flex items-center gap-2 sm:gap-3">
                                                                                    {/* Notifications */}
                                                                                    <button className="relative p-2.5 hover:bg-muted rounded-xl transition-all hover:scale-105 border-2 border-transparent hover:border-border">
                                                                                                <Bell size={20} className="text-foreground" />
                                                                                                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full animate-pulse ring-2 ring-card"></span>
                                                                                    </button>

                                                                                    {/* Settings */}
                                                                                    <button className="p-2.5 hover:bg-muted rounded-xl transition-all hover:scale-105 border-2 border-transparent hover:border-border hidden sm:block">
                                                                                                <Settings size={20} className="text-foreground" />
                                                                                    </button>

                                                                                    {/* User Menu */}
                                                                                    {user && (
                                                                                                <div className="relative">
                                                                                                            <button
                                                                                                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                                                                                                        className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 hover:bg-muted rounded-xl transition-all border-2 border-transparent hover:border-border hover:scale-105"
                                                                                                            >
                                                                                                                        <div className="relative">
                                                                                                                                    <div className="absolute inset-0 bg-primary rounded-full blur-sm opacity-50"></div>
                                                                                                                                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg ring-2 ring-card">
                                                                                                                                                {user.name?.charAt(0).toUpperCase() || 'U'}
                                                                                                                                    </div>
                                                                                                                        </div>
                                                                                                                        <div className="hidden lg:block text-left">
                                                                                                                                    <p className="text-sm font-semibold text-foreground">{user.name}</p>
                                                                                                                                    <p className="text-xs text-muted-foreground truncate max-w-[120px]">{user.email}</p>
                                                                                                                        </div>
                                                                                                                        <ChevronDown size={16} className={`text-muted-foreground transition-transform hidden sm:block ${showUserMenu ? 'rotate-180' : ''}`} />
                                                                                                            </button>

                                                                                                            {showUserMenu && (
                                                                                                                        <>
                                                                                                                                    <div
                                                                                                                                                className="fixed inset-0 z-10"
                                                                                                                                                onClick={() => setShowUserMenu(false)}
                                                                                                                                    ></div>
                                                                                                                                    <div className="absolute right-0 mt-3 w-64 bg-card rounded-2xl shadow-2xl border-2 border-border py-2 z-20">
                                                                                                                                                <div className="px-4 py-3 border-b border-border">
                                                                                                                                                            <p className="text-sm font-bold text-foreground">{user.name}</p>
                                                                                                                                                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                                                                                                                                </div>

                                                                                                                                                <a
                                                                                                                                                            href="#"
                                                                                                                                                            className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors font-medium"
                                                                                                                                                >
                                                                                                                                                            <UserCircle size={18} className="text-primary" />
                                                                                                                                                            Profile Settings
                                                                                                                                                </a>

                                                                                                                                                <a
                                                                                                                                                            href="#"
                                                                                                                                                            className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors font-medium"
                                                                                                                                                >
                                                                                                                                                            <Settings size={18} className="text-primary" />
                                                                                                                                                            Account Settings
                                                                                                                                                </a>

                                                                                                                                                <div className="border-t border-border my-2"></div>

                                                                                                                                                <button
                                                                                                                                                            onClick={() => {
                                                                                                                                                                        setShowUserMenu(false);
                                                                                                                                                                        handleLogout();
                                                                                                                                                            }}
                                                                                                                                                            className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-destructive hover:bg-red-50 transition-colors font-medium"
                                                                                                                                                >
                                                                                                                                                            <LogOut size={18} />
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

                                                <div className="p-4 sm:p-6 lg:p-8 ">
                                                            <Outlet />
                                                </div>
                                    </main>
                        </div>
            );
}