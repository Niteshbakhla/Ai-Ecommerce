import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store/store";
import { logout } from "../../store/slices/authSlices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "lucide-react";
import {
            DropdownMenu,
            DropdownMenuTrigger,
            DropdownMenuContent,
            DropdownMenuItem,
} from "../ui/dropdown-menu";

export default function Navbar() {
            const { user } = useSelector((state: RootState) => state.auth);
            const cartCount = 0; // TODO later when cart API is integrated
            const dispatch = useDispatch();

            return (
                        <nav className="sticky top-0 bg-white shadow-md px-6 py-3 flex items-center justify-between z-50">

                                    {/* Logo */}
                                    <Link to="/" className="text-xl font-bold text-blue-600">
                                                MyStore
                                    </Link>

                                    {/* Search Bar */}
                                    <div className="w-1/2">
                                                <Input placeholder="Search for products..." className="w-full" />
                                    </div>

                                    {/* Right Section */}
                                    <div className="flex items-center gap-4">

                                                {/* Login or Profile */}
                                                {!user ? (
                                                            <Link to="/login">
                                                                        <Button variant="outline">Login</Button>
                                                            </Link>
                                                ) : (
                                                            <DropdownMenu>
                                                                        <DropdownMenuTrigger asChild>
                                                                                    <Button variant="outline">{user.name}</Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent align="end">
                                                                                    <DropdownMenuItem>
                                                                                                <Link to="/orders">My Orders</Link>
                                                                                    </DropdownMenuItem>

                                                                                    {user.role === "admin" && (
                                                                                                <DropdownMenuItem>
                                                                                                            <Link to="/admin">Admin Dashboard</Link>
                                                                                                </DropdownMenuItem>
                                                                                    )}

                                                                                    <DropdownMenuItem onClick={() => dispatch(logout())}>
                                                                                                Logout
                                                                                    </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                            </DropdownMenu>
                                                )}

                                                {/* Cart Icon */}
                                                <Link to="/cart" className="relative">
                                                            <ShoppingCart size={24} />
                                                            {cartCount > 0 && (
                                                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                                                                                    {cartCount}
                                                                        </span>
                                                            )}
                                                </Link>
                                    </div>
                        </nav>
            );
}
