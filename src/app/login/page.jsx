"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

 const handleSignIn = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });

}



const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const user = Object.fromEntries(formData.entries());

  const { data, error } = await authClient.signIn.email({
    email: user.email,
    password: user.password,
  });

  if (error) {
    console.log("Login error:", error);
    return;
  }

  console.log("Login successful:", data);

  // Get JWT token
  const { data: tokenData, error: tokenError } =
    await authClient.token();

  if (tokenError) {
    console.log("Token error:", tokenError);
    return;
  }

  console.log("JWT Token:", tokenData.token);

  router.push("/");
};

  return (
    <div className="relative flex min-h-[calc(100vh-3rem)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-12">
      {/* Background decoration */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />

      <Card className="relative z-10 w-full max-w-md border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
        <CardHeader className="space-y-4 pb-6 text-center">
          <Link
            href="/"
            className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-600"
          >
            <Compass className="size-8" />
          </Link>

          <div>
            <CardTitle className="font-serif text-3xl font-bold tracking-tight text-slate-900">
              Welcome Back!
            </CardTitle>
            <CardDescription className="mt-2 text-sm leading-6 text-slate-500">
              Your next adventure is waiting. Sign in to continue exploring
              the world with Wanderlust.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email Address
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="h-11 border-slate-200 pl-10 focus-visible:ring-cyan-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="password" className="text-slate-700">
                  Password
                </Label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-cyan-600 transition hover:text-cyan-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="h-11 border-slate-200 pl-10 pr-11 focus-visible:ring-cyan-500"
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <Checkbox id="remember" name="remember" value="true" />
              <Label
                htmlFor="remember"
                className="cursor-pointer text-sm font-normal text-slate-600"
              >
                Remember me
              </Label>
            </div>

            {/* Submit */}
            <Button
            onSubmit={handleSubmit}
              type="submit"
              className="h-11 w-full bg-cyan-500 font-semibold text-white shadow-md shadow-cyan-500/20 transition hover:bg-cyan-600"
            >
              Sign In
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-slate-400">OR CONTINUE WITH</span>
            <Separator className="flex-1" />
          </div>

          {/* Google login UI */}
          <Button
            
            type="button"
            variant="outline"
            className="h-11 w-full border-slate-200 font-medium text-slate-700 hover:bg-slate-50"
            onClick={handleSignIn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="mr-2 size-5"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.06 13.22l7.98 6.19C12.93 13.72 18.05 9.5 24 9.5Z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.43 37.91 46.98 31.79 46.98 24.55Z"
              />
              <path
                fill="#FBBC05"
                d="M10.04 28.59A14.4 14.4 0 0 1 9.27 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.55 2.56 10.78l7.48-6.19Z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.88 2.3-8.18 2.3-5.95 0-11.07-4.22-12.96-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
              />
            </svg>
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-cyan-600 transition hover:text-cyan-700 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;