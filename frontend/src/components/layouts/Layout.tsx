import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store/store"
import { logout } from "@/store/slices/authSlices";

export default function Layout({ children }: { children: React.ReactNode }) {
            const [cartCount, setCartCount] = useState(3);

            // Correct TS-safe selector
            const user = useSelector((state: RootState) => state.auth.user);

            const dispatch = useDispatch();

            // For navigation
            const navigate = useNavigate();

            const logoutFunction = () => {
                        dispatch(logout());   // 👈 correct Redux logout
                        navigate("/login");
            };

            return (
                        <>
                                    <Navbar
                                                user={user}
                                                cartCount={cartCount}
                                                onLogoClick={() => navigate("/")}
                                                onSearch={(query) => console.log("Searching:", query)}
                                                onCartClick={() => navigate("/cart")}
                                                onLoginClick={() => navigate("/login")}
                                                onOrdersClick={() => navigate("/orders")}
                                                onAdminClick={() => navigate("/admin")}
                                                onLogout={logoutFunction}
                                    />

                                    <main className="min-h-screen bg-gray-50 p-4">{children}</main>
                        </>
            );
}
