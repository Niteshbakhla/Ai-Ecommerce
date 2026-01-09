import {
            Card,
            CardHeader,
            CardTitle,
            CardDescription,
            CardContent,
            CardFooter,
} from "@/components/ui/card";
import { Loader2, Mail, Lock, User, UserPlus, Chrome } from "lucide-react";
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
                        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-muted via-background to-muted p-4">
                                    <div className="w-full p-6 max-w-md  border-2 border-border rounded-3xl overflow-hidden">
                                                <CardHeader className="space-y-3 text-center pb-2 bg-linear-to-br from-card to-muted/30">
                                                            <div className="mx-auto w-16 h-16 bg-linear-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg mb-2">
                                                                        <UserPlus className="h-8 w-8 text-primary-foreground" />
                                                            </div>
                                                            <CardTitle className="text-3xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                                                        Create Account
                                                            </CardTitle>
                                                            <CardDescription className="text-base text-muted-foreground">
                                                                        Join us and start your journey
                                                            </CardDescription>
                                                </CardHeader>

                                                <CardContent className="space-y-5 ">
                                                            {/* Name Field */}
                                                            <div className="space-y-2">
                                                                        <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                                                                                    Full Name
                                                                        </Label>
                                                                        <div className="relative group">
                                                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                                                    <Input
                                                                                                id="name"
                                                                                                placeholder="Your name"
                                                                                                className="pl-12 h-12 rounded-xl border-2 border-border focus:border-primary transition-all bg-muted/50 focus:bg-card"
                                                                                                value={name}
                                                                                                onChange={(e) => setName(e.target.value)}
                                                                                                disabled={mutation.isPending}
                                                                                    />
                                                                        </div>
                                                            </div>

                                                            {/* Email Field */}
                                                            <div className="space-y-2">
                                                                        <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                                                                                    Email Address
                                                                        </Label>
                                                                        <div className="relative group">
                                                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                                                    <Input
                                                                                                id="email"
                                                                                                type="email"
                                                                                                placeholder="you@example.com"
                                                                                                className="pl-12 h-12 rounded-xl border-2 border-border focus:border-primary transition-all bg-muted/50 focus:bg-card"
                                                                                                value={email}
                                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                                disabled={mutation.isPending}
                                                                                    />
                                                                        </div>
                                                            </div>

                                                            {/* Password Field */}
                                                            <div className="space-y-2">
                                                                        <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                                                                                    Password
                                                                        </Label>
                                                                        <div className="relative group">
                                                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                                                    <Input
                                                                                                id="password"
                                                                                                type="password"
                                                                                                placeholder="••••••••"
                                                                                                className="pl-12 h-12 rounded-xl border-2 border-border focus:border-primary transition-all bg-muted/50 focus:bg-card"
                                                                                                value={password}
                                                                                                onChange={(e) => setPassword(e.target.value)}
                                                                                                disabled={mutation.isPending}
                                                                                    />
                                                                        </div>
                                                            </div>

                                                            {/* Register Button */}
                                                            <Button
                                                                        onClick={handleSubmit}
                                                                        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all  mt-2"
                                                                        disabled={mutation.isPending}
                                                            >
                                                                        {mutation.isPending ? (
                                                                                    <>
                                                                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                                                                Creating Account...
                                                                                    </>
                                                                        ) : (
                                                                                    <>
                                                                                                <UserPlus className="mr-2 h-5 w-5" />
                                                                                                Create Account
                                                                                    </>
                                                                        )}
                                                            </Button>

                                                            {/* Divider */}
                                                            <div className="relative">
                                                                        <div className="absolute inset-0 flex items-center">
                                                                                    <div className="w-full border-t-2 border-border"></div>
                                                                        </div>
                                                                        <div className="relative flex justify-center text-sm">
                                                                                    <span className="px-4 bg-card text-muted-foreground font-semibold">Or continue with</span>
                                                                        </div>
                                                            </div>

                                                            {/* Google Button */}
                                                            <Button
                                                                        variant="outline"
                                                                        className="w-full h-12 rounded-xl border-2 border-border hover:border-primary hover:bg-muted transition-all  font-semibold"
                                                                        onClick={handleGoogleLogin}
                                                                        disabled={mutation.isPending}
                                                            >
                                                                        <Chrome className="mr-2 h-5 w-5 text-primary" />
                                                                        Continue with Google
                                                            </Button>
                                                </CardContent>

                                                <CardFooter className="bg-gradient-to-br from-muted/30 to-card border-t-2 border-border">
                                                            <p className="text-sm text-center text-muted-foreground w-full">
                                                                        Already have an account?{" "}
                                                                        <Link to="/login" className="text-primary font-bold hover:underline transition-colors">
                                                                                    Login Now
                                                                        </Link>
                                                            </p>
                                                </CardFooter>
                                    </div>
                        </div>
            );
}