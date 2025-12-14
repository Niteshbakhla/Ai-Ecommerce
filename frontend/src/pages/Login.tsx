import {
            Card,
            CardHeader,
            CardTitle,
            CardDescription,
            CardContent,
            CardFooter,
} from "../components/ui/card";
import { Loader2, Mail, Lock, Chrome } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { loginUser } from "../api/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "@/store/slices/authSlices";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getNewAccessToken } from "@/services/auth.service";


export default function Login() {
            const [email, setEmail] = useState("");
            const [password, setPassword] = useState("");
            const dispatch = useDispatch();

            const navigate = useNavigate();

            const mutation = useMutation({
                        mutationFn: loginUser,
                        onSuccess: ({ data }) => {
                                    dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }))
                                    toast.success("Login successfully! You can login now.");
                                    console.log(data)
                                    if (data.user.role === "admin") navigate("/admin")
                                    else navigate("/")
                        },
                        onError: (err: any) => {
                                    toast.error(err.response?.data?.message || "Login failed");
                        },
            });


            const handleGoogleLogin = () => {
                        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
            };

            const handleSubmit = (e: FormEvent) => {
                        e.preventDefault();
                        mutation.mutate({ email, password });
            };

            return (
                        <div className="flex justify-center items-center h-screen bg-linear-to-br from-slate-100 to-gray-200">
                                    <Card className="w-[380px] shadow-lg border border-gray-200">
                                                <CardHeader>
                                                            <CardTitle className=" text-2xl font-bold">
                                                                        Welcome back
                                                            </CardTitle>
                                                            <CardDescription className="">
                                                                        Welcome back! Please enter you details.
                                                            </CardDescription>
                                                </CardHeader>

                                                <form onSubmit={handleSubmit}>
                                                            <CardContent className="space-y-4">
                                                                        {/* Email */}
                                                                        <div className="space-y-2">
                                                                                    <Label htmlFor="email">Email</Label>
                                                                                    <div className="relative">
                                                                                                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                                                                                <Input
                                                                                                            id="email"
                                                                                                            placeholder="you@example.com"
                                                                                                            className="pl-8"
                                                                                                            value={email}
                                                                                                            onChange={(e) => setEmail(e.target.value)}
                                                                                                            disabled={mutation.isPending}
                                                                                                />
                                                                                    </div>
                                                                        </div>

                                                                        {/* Password */}
                                                                        <div className="space-y-2">
                                                                                    <Label htmlFor="password">Password</Label>
                                                                                    <div className="relative">
                                                                                                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                                                                                <Input
                                                                                                            id="password"
                                                                                                            type="password"
                                                                                                            placeholder="•••••••••"
                                                                                                            className="pl-8"
                                                                                                            value={password}
                                                                                                            onChange={(e) => setPassword(e.target.value)}
                                                                                                            disabled={mutation.isPending}
                                                                                                />
                                                                                    </div>
                                                                                    <div className="text-right">
                                                                                                <Link
                                                                                                            to="/forgot-password"
                                                                                                            className="text-sm text-blue-600 hover:underline"
                                                                                                >
                                                                                                            Forgot password?
                                                                                                </Link>
                                                                                    </div>
                                                                        </div>

                                                                        {/* Google OAuth Button */}
                                                                        <Button
                                                                                    type="button"
                                                                                    variant="outline"
                                                                                    className="w-full flex gap-2 mb-2"
                                                                                    onClick={handleGoogleLogin}
                                                                                    disabled={mutation.isPending}
                                                                        >
                                                                                    <Chrome className="h-4 w-4" />
                                                                                    Continue with Google
                                                                        </Button>
                                                            </CardContent>

                                                            <CardFooter className="flex flex-col gap-3">
                                                                        <Button className="w-full" disabled={mutation.isPending}>
                                                                                    {mutation.isPending && (
                                                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                                    )}
                                                                                    Login
                                                                        </Button>

                                                                        {/* 🔥 Login Link */}
                                                                        <p className="text-sm text-center text-gray-600">
                                                                                    Already have an account?{" "}
                                                                                    <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                                                                                                Register
                                                                                    </Link>
                                                                        </p>
                                                            </CardFooter>
                                                </form>
                                    </Card>
                        </div>
            );

}
