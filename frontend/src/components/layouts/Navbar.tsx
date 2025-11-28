import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Menu, X, User } from "lucide-react";
import { useState } from "react";
import {
            DropdownMenu,
            DropdownMenuTrigger,
            DropdownMenuContent,
            DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Example props - replace with your actual routing and state management
interface NavbarProps {
            user?: {
                        name: string;
                        role: string;
            } | null;
            cartCount?: number;
            onLogoClick?: () => void;
            onCartClick?: () => void;
            onLoginClick?: () => void;
            onOrdersClick?: () => void;
            onAdminClick?: () => void;
            onLogout?: () => void;
            onSearch?: (query: string) => void;
}

export default function Navbar({
            user = null,
            cartCount = 0,
            onLogoClick,
            onCartClick,
            onLoginClick,
            onOrdersClick,
            onAdminClick,
            onLogout,
            onSearch,
}: NavbarProps) {
            const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
            const [searchOpen, setSearchOpen] = useState(false);

            return (
                        <nav className="sticky top-0 bg-white border-b z-50">
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                                                <div className="flex items-center justify-between h-16">

                                                            {/* Logo */}
                                                            <button
                                                                        onClick={onLogoClick}
                                                                        className="text-xl font-bold text-gray-900 shrink-0 hover:text-gray-700 transition-colors"
                                                            >
                                                                        MyStore
                                                            </button>

                                                            {/* Desktop Search Bar */}
                                                            <div className="hidden md:flex flex-1 max-w-md mx-8">
                                                                        <div className="relative w-full">
                                                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                                                    <Input
                                                                                                placeholder="Search products..."
                                                                                                className="w-full pl-10 border-gray-200 focus:border-gray-400 transition-colors"
                                                                                                onChange={(e) => onSearch?.(e.target.value)}
                                                                                    />
                                                                        </div>
                                                            </div>

                                                            {/* Desktop Right Section */}
                                                            <div className="hidden md:flex items-center gap-3">

                                                                        {/* Cart */}
                                                                        <button
                                                                                    onClick={onCartClick}
                                                                                    className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                                        >
                                                                                    <ShoppingCart className="h-5 w-5 text-gray-700" />
                                                                                    {cartCount > 0 && (
                                                                                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                                                                                            {cartCount}
                                                                                                </span>
                                                                                    )}
                                                                        </button>

                                                                        {/* User Section */}
                                                                        {!user ? (
                                                                                    <Button
                                                                                                variant="outline"
                                                                                                size="sm"
                                                                                                className="border-gray-300"
                                                                                                onClick={onLoginClick}
                                                                                    >
                                                                                                Login
                                                                                    </Button>
                                                                        ) : (
                                                                                    <DropdownMenu>
                                                                                                <DropdownMenuTrigger asChild>
                                                                                                            <Button variant="ghost" size="sm" className="gap-2">
                                                                                                                        <User className="h-4 w-4" />
                                                                                                                        {user.name}
                                                                                                            </Button>
                                                                                                </DropdownMenuTrigger>
                                                                                                <DropdownMenuContent align="end" className="w-48">
                                                                                                            <DropdownMenuItem onClick={onOrdersClick} className="cursor-pointer">
                                                                                                                        My Orders
                                                                                                            </DropdownMenuItem>

                                                                                                            {user.role === "admin" && (
                                                                                                                        <DropdownMenuItem onClick={onAdminClick} className="cursor-pointer">
                                                                                                                                    Admin Dashboard
                                                                                                                        </DropdownMenuItem>
                                                                                                            )}

                                                                                                            <DropdownMenuItem
                                                                                                                        onClick={onLogout}
                                                                                                                        className="text-red-600 cursor-pointer"
                                                                                                            >
                                                                                                                        Logout
                                                                                                            </DropdownMenuItem>
                                                                                                </DropdownMenuContent>
                                                                                    </DropdownMenu>
                                                                        )}
                                                            </div>

                                                            {/* Mobile Right Section */}
                                                            <div className="flex md:hidden items-center gap-2">
                                                                        {/* Mobile Search Toggle */}
                                                                        <button
                                                                                    onClick={() => setSearchOpen(!searchOpen)}
                                                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                                        >
                                                                                    <Search className="h-5 w-5 text-gray-700" />
                                                                        </button>

                                                                        {/* Mobile Cart */}
                                                                        <button
                                                                                    onClick={onCartClick}
                                                                                    className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                                        >
                                                                                    <ShoppingCart className="h-5 w-5 text-gray-700" />
                                                                                    {cartCount > 0 && (
                                                                                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                                                                                            {cartCount}
                                                                                                </span>
                                                                                    )}
                                                                        </button>

                                                                        {/* Mobile Menu Toggle */}
                                                                        <button
                                                                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                                        >
                                                                                    {mobileMenuOpen ? (
                                                                                                <X className="h-5 w-5 text-gray-700" />
                                                                                    ) : (
                                                                                                <Menu className="h-5 w-5 text-gray-700" />
                                                                                    )}
                                                                        </button>
                                                            </div>
                                                </div>

                                                {/* Mobile Search Bar */}
                                                {searchOpen && (
                                                            <div className="md:hidden pb-4">
                                                                        <div className="relative">
                                                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                                                    <Input
                                                                                                placeholder="Search products..."
                                                                                                className="w-full pl-10 border-gray-200"
                                                                                                onChange={(e) => onSearch?.(e.target.value)}
                                                                                                autoFocus
                                                                                    />
                                                                        </div>
                                                            </div>
                                                )}
                                    </div>

                                    {/* Mobile Menu */}
                                    {mobileMenuOpen && (
                                                <div className="md:hidden border-t bg-white">
                                                            <div className="px-4 py-4 space-y-3">
                                                                        {!user ? (
                                                                                    <Button
                                                                                                variant="outline"
                                                                                                className="w-full justify-start"
                                                                                                onClick={() => {
                                                                                                            onLoginClick?.();
                                                                                                            setMobileMenuOpen(false);
                                                                                                }}
                                                                                    >
                                                                                                Login
                                                                                    </Button>
                                                                        ) : (
                                                                                    <>
                                                                                                <div className="px-3 py-2 text-sm font-medium text-gray-900 border-b">
                                                                                                            {user.name}
                                                                                                </div>

                                                                                                <button
                                                                                                            onClick={() => {
                                                                                                                        onOrdersClick?.();
                                                                                                                        setMobileMenuOpen(false);
                                                                                                            }}
                                                                                                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                                                                                >
                                                                                                            My Orders
                                                                                                </button>

                                                                                                {user.role === "admin" && (
                                                                                                            <button
                                                                                                                        onClick={() => {
                                                                                                                                    onAdminClick?.();
                                                                                                                                    setMobileMenuOpen(false);
                                                                                                                        }}
                                                                                                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                                                                                            >
                                                                                                                        Admin Dashboard
                                                                                                            </button>
                                                                                                )}

                                                                                                <button
                                                                                                            onClick={() => {
                                                                                                                        onLogout?.();
                                                                                                                        setMobileMenuOpen(false);
                                                                                                            }}
                                                                                                            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                                                >
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