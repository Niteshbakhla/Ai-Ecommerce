import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Package, LayoutDashboard, LogOut, ArrowLeft } from "lucide-react";
import { useState } from "react";
import {
            DropdownMenu,
            DropdownMenuTrigger,
            DropdownMenuContent,
            DropdownMenuItem,
            DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
            user?: {
                        name: string;
                        role: string;
                        email?: string;
            } | null;
            cartCount?: number;
            currentPage?: '/' | 'login' | 'register' | "admin";
            onLogoClick?: () => void;
            onCartClick?: () => void;
            onLoginClick?: () => void;
            onRegisterClick?: () => void;
            onOrdersClick?: () => void;
            onAdminClick?: () => void;
            onLogout?: () => void;
            onBackClick?: () => void;
}

export default function Navbar({
            user = null,
            cartCount = 0,
            currentPage = '/',
            onLogoClick,
            onCartClick,
            onLoginClick,
            onRegisterClick,
            onOrdersClick,
            onAdminClick,
            onLogout,
            onBackClick,
}: NavbarProps) {
            const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

            const isAuthPage = currentPage === 'login' || currentPage === 'register';
            if (currentPage === "admin" || currentPage === "login" || currentPage === "register") return null;

            // Auth page navbar (login/register)
            if (isAuthPage) {
                        return (
                                    <nav className="sticky top-0 bg-white border-b border-gray-200/50 z-50">
                                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                            <div className="flex items-center justify-between h-16">

                                                                        {/* Back Button */}
                                                                        <button
                                                                                    onClick={onBackClick}
                                                                                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                                                                        >
                                                                                    <ArrowLeft className="h-5 w-5" />
                                                                                    <span className="text-sm font-medium">Back</span>
                                                                        </button>

                                                                        {/* Logo - Center */}
                                                                        <button
                                                                                    onClick={onLogoClick}
                                                                                    className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 group"
                                                                        >
                                                                                    <div className="w-8 h-8 bg-linear-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                                                                                                <span className="text-white font-bold text-sm">MS</span>
                                                                                    </div>
                                                                                    <span className="text-xl font-bold text-gray-900 hidden sm:block">
                                                                                                MyStore
                                                                                    </span>
                                                                        </button>

                                                                        {/* Auth Toggle Button */}
                                                                        <div className="flex items-center gap-2">
                                                                                    <Button
                                                                                                size="sm"
                                                                                                variant="ghost"
                                                                                                onClick={currentPage === 'login' ? onRegisterClick : onLoginClick}
                                                                                                className="text-gray-900 hover:bg-gray-100 font-medium"
                                                                                    >
                                                                                                {currentPage === 'login' ? 'Register' : 'Login'}
                                                                                    </Button>
                                                                        </div>
                                                            </div>
                                                </div>
                                    </nav>
                        );
            }

            // Home page navbar (full featured)
            return (
                        <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200/50 z-50 shadow-sm">
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                <div className="flex items-center justify-between h-16">

                                                            {/* Logo */}
                                                            <button
                                                                        onClick={onLogoClick}
                                                                        className="flex items-center gap-2 shrink-0 group"
                                                            >
                                                                        <div className="w-8 h-8 bg-linear-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                                                                                    <span className="text-white font-bold text-sm">MS</span>
                                                                        </div>
                                                                        <span className="text-xl font-bold text-gray-900 hidden sm:block">
                                                                                    MyStore
                                                                        </span>
                                                            </button>

                                                            {/* Spacer */}
                                                            <div className="flex-1"></div>

                                                            {/* Desktop Right Section */}
                                                            <div className="hidden md:flex items-center gap-2">

                                                                        {/* Cart */}
                                                                        <button
                                                                                    onClick={onCartClick}
                                                                                    className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-all group"
                                                                        >
                                                                                    <ShoppingCart className="h-5 w-5 text-gray-700 group-hover:scale-110 transition-transform" />
                                                                                    {cartCount > 0 && (
                                                                                                <span className="absolute -top-1 -right-1 bg-linear-to-br from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg animate-in zoom-in">
                                                                                                            {cartCount > 9 ? "9+" : cartCount}
                                                                                                </span>
                                                                                    )}
                                                                        </button>

                                                                        {/* User Section */}
                                                                        {!user ? (
                                                                                    <Button
                                                                                                size="sm"
                                                                                                onClick={onLoginClick}
                                                                                                className="ml-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all"
                                                                                    >
                                                                                                Login
                                                                                    </Button>
                                                                        ) : (
                                                                                    <DropdownMenu>
                                                                                                <DropdownMenuTrigger asChild>
                                                                                                            <button className="flex items-center gap-2 pl-3 pr-4 py-2 hover:bg-gray-100 rounded-full transition-all ml-2 group">
                                                                                                                        <div className="w-8 h-8 bg-linear-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white text-sm font-semibold group-hover:scale-105 transition-transform">
                                                                                                                                    {user.name.charAt(0).toUpperCase()}
                                                                                                                        </div>
                                                                                                                        <span className="text-sm font-medium text-gray-900 max-w-[100px] truncate">
                                                                                                                                    {user.name}
                                                                                                                        </span>
                                                                                                            </button>
                                                                                                </DropdownMenuTrigger>
                                                                                                <DropdownMenuContent align="end" className="w-56 p-2">
                                                                                                            <div className="px-3 py-2 mb-2">
                                                                                                                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                                                                                                        {user.email && (
                                                                                                                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                                                                                        )}
                                                                                                            </div>
                                                                                                            <DropdownMenuSeparator />

                                                                                                            <DropdownMenuItem
                                                                                                                        onClick={onOrdersClick}
                                                                                                                        className="cursor-pointer rounded-lg py-2.5"
                                                                                                            >
                                                                                                                        <Package className="h-4 w-4 mr-3 text-gray-600" />
                                                                                                                        My Orders
                                                                                                            </DropdownMenuItem>

                                                                                                            {user.role === "admin" && (
                                                                                                                        <DropdownMenuItem
                                                                                                                                    onClick={onAdminClick}
                                                                                                                                    className="cursor-pointer rounded-lg py-2.5"
                                                                                                                        >
                                                                                                                                    <LayoutDashboard className="h-4 w-4 mr-3 text-gray-600" />
                                                                                                                                    Admin Dashboard
                                                                                                                        </DropdownMenuItem>
                                                                                                            )}

                                                                                                            <DropdownMenuSeparator />

                                                                                                            <DropdownMenuItem
                                                                                                                        onClick={onLogout}
                                                                                                                        className="text-red-600 cursor-pointer rounded-lg py-2.5 focus:text-red-600 focus:bg-red-50"
                                                                                                            >
                                                                                                                        <LogOut className="h-4 w-4 mr-3" />
                                                                                                                        Logout
                                                                                                            </DropdownMenuItem>
                                                                                                </DropdownMenuContent>
                                                                                    </DropdownMenu>
                                                                        )}
                                                            </div>

                                                            {/* Mobile Right Section */}
                                                            <div className="flex md:hidden items-center gap-1">
                                                                        {/* Mobile Cart */}
                                                                        <button
                                                                                    onClick={onCartClick}
                                                                                    className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
                                                                        >
                                                                                    <ShoppingCart className="h-5 w-5 text-gray-700" />
                                                                                    {cartCount > 0 && (
                                                                                                <span className="absolute -top-1 -right-1 bg-linear-to-br from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg">
                                                                                                            {cartCount > 9 ? "9+" : cartCount}
                                                                                                </span>
                                                                                    )}
                                                                        </button>

                                                                        {/* Mobile Menu Toggle */}
                                                                        <button
                                                                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                                                                    className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
                                                                        >
                                                                                    {mobileMenuOpen ? (
                                                                                                <X className="h-5 w-5 text-gray-700" />
                                                                                    ) : (
                                                                                                <Menu className="h-5 w-5 text-gray-700" />
                                                                                    )}
                                                                        </button>
                                                            </div>
                                                </div>
                                    </div>

                                    {/* Mobile Menu */}
                                    {mobileMenuOpen && (
                                                <div className="md:hidden border-t bg-white/95 backdrop-blur-md animate-in slide-in-from-top-2">
                                                            <div className="px-4 py-4 space-y-2">
                                                                        {!user ? (
                                                                                    <Button
                                                                                                className="w-full justify-center bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-md"
                                                                                                onClick={() => {
                                                                                                            onLoginClick?.();
                                                                                                            setMobileMenuOpen(false);
                                                                                                }}
                                                                                    >
                                                                                                Login
                                                                                    </Button>
                                                                        ) : (
                                                                                    <>
                                                                                                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl mb-3">
                                                                                                            <div className="w-10 h-10 bg-linear-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
                                                                                                                        {user.name.charAt(0).toUpperCase()}
                                                                                                            </div>
                                                                                                            <div className="flex-1 min-w-0">
                                                                                                                        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                                                                                                        {user.email && (
                                                                                                                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                                                                                        )}
                                                                                                            </div>
                                                                                                </div>

                                                                                                <button
                                                                                                            onClick={() => {
                                                                                                                        onOrdersClick?.();
                                                                                                                        setMobileMenuOpen(false);
                                                                                                            }}
                                                                                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                                                                                                >
                                                                                                            <Package className="h-5 w-5 text-gray-500" />
                                                                                                            My Orders
                                                                                                </button>

                                                                                                {user.role === "admin" && (
                                                                                                            <button
                                                                                                                        onClick={() => {
                                                                                                                                    onAdminClick?.();
                                                                                                                                    setMobileMenuOpen(false);
                                                                                                                        }}
                                                                                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                                                                                                            >
                                                                                                                        <LayoutDashboard className="h-5 w-5 text-gray-500" />
                                                                                                                        Admin Dashboard
                                                                                                            </button>
                                                                                                )}

                                                                                                <button
                                                                                                            onClick={() => {
                                                                                                                        onLogout?.();
                                                                                                                        setMobileMenuOpen(false);
                                                                                                            }}
                                                                                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                                                                                >
                                                                                                            <LogOut className="h-5 w-5" />
                                                                                                            Logout
                                                                                                </button>
                                                                                    </>
                                                                        )}
                                                            </div>
                                                </div>
                                    )}
                        </nav>
            );
}