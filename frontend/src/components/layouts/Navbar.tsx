import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Package, LayoutDashboard, LogOut, ArrowLeft, Sparkles } from "lucide-react";
import { useState, } from "react";
import {
            DropdownMenu,
            DropdownMenuTrigger,
            DropdownMenuContent,
            DropdownMenuItem,
            DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import SearchBar from "../common/SearchBar";
import { useSearch } from "@/SearchContext";

interface NavbarProps {
            user?: {
                        name: string;
                        role: string;
                        email?: string;
            } | null;
            cartCount?: number;
            currentPage?: '/' | 'login' | 'register' | "admin" | "cart";
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
            const { setSearch } = useSearch();

            const isAuthPage = currentPage === 'login' || currentPage === 'register';
            if (currentPage === "admin" || currentPage === "login" || currentPage === "register" || currentPage === "cart") return null;

            // Auth page navbar (login/register)
            if (isAuthPage) {
                        return (
                                    <nav className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border z-50 shadow-sm">
                                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                            <div className="flex items-center justify-between h-20">

                                                                        {/* Back Button */}
                                                                        <button
                                                                                    onClick={onBackClick}
                                                                                    className="flex items-center gap-2 px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all duration-200 group"
                                                                        >
                                                                                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
                                                                                    <span className="text-sm font-semibold">Back</span>
                                                                        </button>

                                                                        {/* Logo - Center */}
                                                                        <button
                                                                                    onClick={onLogoClick}
                                                                                    className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 group"
                                                                        >
                                                                                    <div className="relative">
                                                                                                <div className="absolute inset-0 bg-primary rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                                                                                <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                                                                                            <span className="text-primary-foreground font-bold text-base">MS</span>
                                                                                                </div>
                                                                                    </div>
                                                                                    <span className="text-2xl font-bold text-primary hidden sm:block">
                                                                                                MyStore
                                                                                    </span>
                                                                        </button>

                                                                        {/* Auth Toggle Button */}
                                                                        <div className="flex items-center gap-2">
                                                                                    <Button
                                                                                                size="sm"
                                                                                                variant="ghost"
                                                                                                onClick={currentPage === 'login' ? onRegisterClick : onLoginClick}
                                                                                                className="text-primary hover:bg-muted font-semibold px-5 py-2.5 rounded-xl hover:scale-105 transition-all"
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
                        <nav className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border z-50 shadow-lg">
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                <div className="flex items-center justify-between h-20">

                                                            {/* Logo */}
                                                            <button
                                                                        onClick={onLogoClick}
                                                                        className="flex items-center gap-3 shrink-0 group"
                                                            >
                                                                        <div className="relative">
                                                                                    <div className="absolute inset-0 bg-primary rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                                                                    <div className="relative w-11 h-11 bg-linear-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                                                                                <span className="text-primary-foreground font-bold text-base">CX</span>
                                                                                    </div>
                                                                        </div>
                                                                        <div className="hidden sm:block">
                                                                                    <span className="text-2xl font-bold text-primary">
                                                                                                CommerceX
                                                                                    </span>
                                                                                    <p className="text-xs text-muted-foreground font-medium -mt-1">Shop with confidence</p>
                                                                        </div>
                                                            </button>

                                                            {/* Spacer */}
                                                            <div className="flex-1"></div>
                                                            <SearchBar setSearch={setSearch} />
                                                            {/* Desktop Right Section */}
                                                            <div className="hidden md:flex items-center gap-3">

                                                                        {/* Cart */}
                                                                        <button
                                                                                    onClick={onCartClick}
                                                                                    className="relative p-3 hover:bg-muted rounded-2xl transition-all group border-2 border-transparent hover:border-border hover:scale-105"
                                                                        >
                                                                                    <ShoppingCart className="h-5 w-5 text-foreground group-hover:scale-110 transition-transform" />
                                                                                    {cartCount > 0 && (
                                                                                                <span className="absolute -top-1 -right-1 bg-linear-to-br from-destructive to-red-700 text-destructive-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-in zoom-in ring-2 ring-card">
                                                                                                            {cartCount > 9 ? "9+" : cartCount}
                                                                                                </span>
                                                                                    )}
                                                                        </button>

                                                                        {/* User Section */}
                                                                        {!user ? (
                                                                                    <Button
                                                                                                size="sm"
                                                                                                onClick={onLoginClick}
                                                                                                className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl px-8 py-2.5 shadow-lg hover:shadow-xl transition-all font-semibold hover:scale-105"
                                                                                    >
                                                                                                <Sparkles className="h-4 w-4 mr-2" />
                                                                                                Login
                                                                                    </Button>
                                                                        ) : (
                                                                                    <DropdownMenu>
                                                                                                <DropdownMenuTrigger asChild>
                                                                                                            <button className="flex items-center gap-3 pl-3 pr-5 py-2.5 hover:bg-muted rounded-2xl transition-all ml-2 group border-2 border-transparent hover:border-border ">
                                                                                                                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold  transition-transform shadow-md ring-2 ring-card">
                                                                                                                                    {user.name.charAt(0).toUpperCase()}
                                                                                                                        </div>
                                                                                                                        <span className="text-sm font-semibold text-foreground max-w-[100px] truncate">
                                                                                                                                    {user.name}
                                                                                                                        </span>
                                                                                                            </button>
                                                                                                </DropdownMenuTrigger>
                                                                                                <DropdownMenuContent align="end" className="w-64 p-3 rounded-2xl border-2 border-border shadow-xl">
                                                                                                            <div className="px-3 py-3 mb-2 bg-gradient-to-br from-muted to-card rounded-xl">
                                                                                                                        <p className="text-sm font-bold text-foreground">{user.name}</p>
                                                                                                                        {user.email && (
                                                                                                                                    <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
                                                                                                                        )}
                                                                                                            </div>
                                                                                                            <DropdownMenuSeparator />

                                                                                                            <DropdownMenuItem
                                                                                                                        onClick={onOrdersClick}
                                                                                                                        className="cursor-pointer rounded-xl py-3 px-3"
                                                                                                            >
                                                                                                                        <Package className="h-4 w-4 mr-3 text-primary" />
                                                                                                                        <span className="font-medium">My Orders</span>
                                                                                                            </DropdownMenuItem>

                                                                                                            {user.role === "admin" && (
                                                                                                                        <DropdownMenuItem
                                                                                                                                    onClick={onAdminClick}
                                                                                                                                    className="cursor-pointer rounded-xl py-3 px-3"
                                                                                                                        >
                                                                                                                                    <LayoutDashboard className="h-4 w-4 mr-3 text-primary" />
                                                                                                                                    <span className="font-medium">Admin Dashboard</span>
                                                                                                                        </DropdownMenuItem>
                                                                                                            )}

                                                                                                            <DropdownMenuSeparator />

                                                                                                            <DropdownMenuItem
                                                                                                                        onClick={onLogout}
                                                                                                                        className="text-destructive cursor-pointer rounded-xl py-3 px-3 focus:text-destructive hover:bg-red-50 transition-colors font-medium"
                                                                                                            >
                                                                                                                        <LogOut className="h-4 w-4 mr-3" />
                                                                                                                        Logout
                                                                                                            </DropdownMenuItem>
                                                                                                </DropdownMenuContent>
                                                                                    </DropdownMenu>
                                                                        )}
                                                            </div>

                                                            {/* Mobile Right Section */}
                                                            <div className="flex md:hidden items-center gap-2">
                                                                        {/* Mobile Cart */}
                                                                        <button
                                                                                    onClick={onCartClick}
                                                                                    className="relative p-2.5 hover:bg-muted rounded-xl transition-all border-2 border-transparent hover:border-border"
                                                                        >
                                                                                    <ShoppingCart className="h-5 w-5 text-foreground" />
                                                                                    {cartCount > 0 && (
                                                                                                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-destructive to-red-700 text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg ring-2 ring-card">
                                                                                                            {cartCount > 9 ? "9+" : cartCount}
                                                                                                </span>
                                                                                    )}
                                                                        </button>

                                                                        {/* Mobile Menu Toggle */}
                                                                        <button
                                                                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                                                                    className="p-2.5 hover:bg-muted rounded-xl transition-all border-2 border-transparent hover:border-border"
                                                                        >
                                                                                    {mobileMenuOpen ? (
                                                                                                <X className="h-5 w-5 text-foreground" />
                                                                                    ) : (
                                                                                                <Menu className="h-5 w-5 text-foreground" />
                                                                                    )}
                                                                        </button>
                                                            </div>
                                                </div>
                                    </div>

                                    {/* Mobile Menu */}
                                    {mobileMenuOpen && (
                                                <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-xl animate-in slide-in-from-top-2 shadow-lg">
                                                            <div className="px-4 py-4 space-y-3">
                                                                        {!user ? (
                                                                                    <Button
                                                                                                className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-lg font-semibold py-3 hover:scale-105 transition-all"
                                                                                                onClick={() => {
                                                                                                            onLoginClick?.();
                                                                                                            setMobileMenuOpen(false);
                                                                                                }}
                                                                                    >
                                                                                                <Sparkles className="h-4 w-4 mr-2" />
                                                                                                Login
                                                                                    </Button>
                                                                        ) : (
                                                                                    <>
                                                                                                <div className="flex items-center gap-3 px-4 py-4 bg-gradient-to-br from-muted to-card rounded-2xl mb-3 border-2 border-border">
                                                                                                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-md ring-2 ring-card">
                                                                                                                        {user.name.charAt(0).toUpperCase()}
                                                                                                            </div>
                                                                                                            <div className="flex-1 min-w-0">
                                                                                                                        <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
                                                                                                                        {user.email && (
                                                                                                                                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                                                                                                        )}
                                                                                                            </div>
                                                                                                </div>

                                                                                                <button
                                                                                                            onClick={() => {
                                                                                                                        onOrdersClick?.();
                                                                                                                        setMobileMenuOpen(false);
                                                                                                            }}
                                                                                                            className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-foreground hover:bg-muted rounded-xl transition-all font-medium border-2 border-transparent hover:border-border"
                                                                                                >
                                                                                                            <Package className="h-5 w-5 text-primary" />
                                                                                                            My Orders
                                                                                                </button>

                                                                                                {user.role === "admin" && (
                                                                                                            <button
                                                                                                                        onClick={() => {
                                                                                                                                    onAdminClick?.();
                                                                                                                                    setMobileMenuOpen(false);
                                                                                                                        }}
                                                                                                                        className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-foreground hover:bg-muted rounded-xl transition-all font-medium border-2 border-transparent hover:border-border"
                                                                                                            >
                                                                                                                        <LayoutDashboard className="h-5 w-5 text-primary" />
                                                                                                                        Admin Dashboard
                                                                                                            </button>
                                                                                                )}

                                                                                                <button
                                                                                                            onClick={() => {
                                                                                                                        onLogout?.();
                                                                                                                        setMobileMenuOpen(false);
                                                                                                            }}
                                                                                                            className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-destructive hover:bg-red-50 rounded-xl transition-all font-medium border-2 border-transparent hover:border-red-200"
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