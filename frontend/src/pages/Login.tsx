import {
            Card,
            CardHeader,
            CardTitle,
            CardDescription,
            CardContent,
            CardFooter,
} from "@/components/ui/card";
import { Loader2, Mail, Lock, Chrome, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { loginUser } from "@/api/auth/authApi";
import { setCredentials } from "@/store/slices/authSlices";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Login() {
            const [email, setEmail] = useState("");
            const [password, setPassword] = useState("");
            const dispatch = useDispatch();

            const mutation = useMutation({
                        mutationFn: loginUser,
                        onSuccess: ({ data }) => {
                                    dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }));
                                    toast.success("Login successful!");
                                    if (data.user.role === "admin") {
                                                window.location.href = "/admin";
                                    } else {
                                                window.location.href = "/";
                                    }
                        },
                        onError: (err: any) => {
                                    toast.error(err.response?.data?.message || "Login failed");
                        },
            });

            const handleGoogleLogin = () => {
                        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
            };

            const handleSubmit = (e: React.FormEvent) => {
                        e.preventDefault();
                        mutation.mutate({ email, password });
            };

            return (
                        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted via-background to-muted p-4">
                                    <Card className="w-full max-w-md shadow-2xl border-2 border-border rounded-3xl overflow-hidden">
                                                <CardHeader className="space-y-3 text-center pb-6 bg-gradient-to-br from-card to-muted/30">
                                                            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg mb-2">
                                                                        <Sparkles className="h-8 w-8 text-primary-foreground" />
                                                            </div>
                                                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                                                        Welcome Back
                                                            </CardTitle>
                                                            <CardDescription className="text-base text-muted-foreground">
                                                                        Enter your credentials to continue
                                                            </CardDescription>
                                                </CardHeader>

                                                <CardContent className="space-y-5 pt-6">
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
                                                                        <div className="flex items-center justify-between">
                                                                                    <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                                                                                                Password
                                                                                    </Label>
                                                                                    <a
                                                                                                href="/forgot-password"
                                                                                                className="text-sm text-primary font-medium hover:underline transition-colors"
                                                                                    >
                                                                                                Forgot?
                                                                                    </a>
                                                                        </div>
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

                                                            {/* Login Button */}
                                                            <Button
                                                                        onClick={handleSubmit}
                                                                        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all  mt-2"
                                                                        disabled={mutation.isPending}
                                                            >
                                                                        {mutation.isPending ? (
                                                                                    <>
                                                                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                                                                Logging in...
                                                                                    </>
                                                                        ) : (
                                                                                    <>
                                                                                                <Sparkles className="mr-2 h-5 w-5" />
                                                                                                Login
                                                                                    </>
                                                                        )}
                                                            </Button>

                                                          
                                                            <div className="relative">
                                                                        <div className="absolute inset-0 flex items-center">
                                                                                    <div className="w-full border-t-2  border-border"></div>
                                                                        </div>
                                                                        <div className="relative flex justify-center text-sm ">
                                                                                    <span className="px-4 bg-card text-muted-foreground font-semibold">Or continue with</span>
                                                                        </div>
                                                            </div>

                                                    
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
                                                                        Don't have an account?{" "}
                                                                        <Link to="/register" className="text-primary font-bold hover:underline transition-colors">
                                                                                    Register Now
                                                                        </Link>
                                                            </p>
                                                </CardFooter>
                                    </Card>
                        </div>
            );
}