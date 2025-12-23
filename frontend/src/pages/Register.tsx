import {
            Card,
            CardHeader,
            CardTitle,
            CardDescription,
            CardContent,
            CardFooter,
} from "@/components/ui/card";
import { Loader2, Mail, Lock, User, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { registerUser } from "@/api/auth/authApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Register() {
            const [name, setName] = useState("");
            const [email, setEmail] = useState("");
            const [password, setPassword] = useState("");

            const mutation = useMutation({
                        mutationFn: registerUser,
                        onSuccess: () => {
                                    toast.success("Registered successfully! You can login now.");
                        },
                        onError: (err: any) => {
                                    toast.error(err.response?.data?.message || "Registration failed");
                        },
            });

            const handleGoogleLogin = () => {
                        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
            };

            const handleSubmit = (e: React.FormEvent) => {
                        e.preventDefault();
                        mutation.mutate({ name, email, password });
            };

            return (
                        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                                    <Card className="w-full max-w-md shadow-lg">
                                                <CardHeader className="space-y-1">
                                                            <CardTitle className="text-2xl font-bold text-center">
                                                                        Create Account
                                                            </CardTitle>
                                                            <CardDescription className="text-center">
                                                                        Enter your details to register
                                                            </CardDescription>
                                                </CardHeader>

                                                <CardContent className="space-y-4">
                                                            {/* Name Field */}
                                                            <div className="space-y-2">
                                                                        <Label htmlFor="name">Name</Label>
                                                                        <div className="relative">
                                                                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                                                    <Input
                                                                                                id="name"
                                                                                                placeholder="Your name"
                                                                                                className="pl-10"
                                                                                                value={name}
                                                                                                onChange={(e) => setName(e.target.value)}
                                                                                                disabled={mutation.isPending}
                                                                                    />
                                                                        </div>
                                                            </div>

                                                            {/* Email Field */}
                                                            <div className="space-y-2">
                                                                        <Label htmlFor="email">Email</Label>
                                                                        <div className="relative">
                                                                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                                                    <Input
                                                                                                id="email"
                                                                                                type="email"
                                                                                                placeholder="you@example.com"
                                                                                                className="pl-10"
                                                                                                value={email}
                                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                                disabled={mutation.isPending}
                                                                                    />
                                                                        </div>
                                                            </div>

                                                            {/* Password Field */}
                                                            <div className="space-y-2">
                                                                        <Label htmlFor="password">Password</Label>
                                                                        <div className="relative">
                                                                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                                                    <Input
                                                                                                id="password"
                                                                                                type="password"
                                                                                                placeholder="••••••••"
                                                                                                className="pl-10"
                                                                                                value={password}
                                                                                                onChange={(e) => setPassword(e.target.value)}
                                                                                                disabled={mutation.isPending}
                                                                                    />
                                                                        </div>
                                                            </div>

                                                            {/* Register Button */}
                                                            <Button
                                                                        onClick={handleSubmit}
                                                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                                                        disabled={mutation.isPending}
                                                            >
                                                                        {mutation.isPending ? (
                                                                                    <>
                                                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                                                Creating Account...
                                                                                    </>
                                                                        ) : (
                                                                                    "Register"
                                                                        )}
                                                            </Button>

                                                            {/* Divider */}
                                                            <div className="relative">
                                                                        <div className="absolute inset-0 flex items-center">
                                                                                    <div className="w-full border-t border-gray-300"></div>
                                                                        </div>
                                                                        <div className="relative flex justify-center text-sm">
                                                                                    <span className="px-2 bg-white text-gray-500">Or</span>
                                                                        </div>
                                                            </div>

                                                            {/* Google Button */}
                                                            <Button
                                                                        variant="outline"
                                                                        className="w-full"
                                                                        onClick={handleGoogleLogin}
                                                                        disabled={mutation.isPending}
                                                            >
                                                                        <Chrome className="mr-2 h-4 w-4" />
                                                                        Continue with Google
                                                            </Button>
                                                </CardContent>

                                                <CardFooter>
                                                            <p className="text-sm text-center text-gray-600 w-full">
                                                                        Already have an account?{" "}
                                                                        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                                                                                    Login
                                                                        </Link>
                                                            </p>
                                                </CardFooter>
                                    </Card>
                        </div>
            );
}