import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store/store"
import { logout } from "@/store/slices/authSlices";
import { useQuery } from "@tanstack/react-query";
import { getUserCarts } from "@/api/cart.services";

export default function Layout({ children }: { children: React.ReactNode }) {

            // Correct TS-safe selector
            const user = useSelector((state: RootState) => state.auth.user);
            const location = useLocation();

            const dispatch = useDispatch();

            // For navigation
            const navigate = useNavigate();

            const logoutFunction = () => {
                        dispatch(logout());   // 👈 correct Redux logout
                        navigate("/login");
            };
            const getCurrentPage = (pathname: string): "/" | "login" | "register" | "admin" | undefined => {
                        if (pathname === "/") return "/";
                        if (pathname.includes("/login")) return "login";
                        if (pathname.includes("/register")) return "register";
                        if (pathname.includes("/admin")) return "admin"
                        return undefined;
            };

            const { data, isLoading } = useQuery({
                        queryKey: ["cart"],
                        queryFn: getUserCarts,
            });

            return (
                        <>
                                    <Navbar
                                                user={user}
                                                cartCount={isLoading ? 0 : data?.items?.length ?? 0}

                                                currentPage={getCurrentPage(location.pathname)}
                                                onLogoClick={() => navigate("/")}
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
