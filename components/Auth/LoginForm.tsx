"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/Input/Input";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";
import AuthCard from "@/components/Auth/AuthCard";

interface LoginState {
  email: string;
  password: string;
}

const initialUserData: LoginState = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || ROUTES.HOME;
  const [userData, setUserData] = useState(initialUserData);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const login = await signIn("credentials", {
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
        redirect: false,
        callbackUrl,
      });

      if (login?.error) {
        setError("Incorrect email or password");
        return;
      }

      router.push(login?.url || callbackUrl);
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("Unexpected error while logging in");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to publish new posts and manage your content."
      footer={
        <span>
          Don&apos;t have an account?{" "}
          <Link href={ROUTES.REGISTER} className="font-medium text-sky-600">
            Create one
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <Input
          placeholder="you@example.com"
          id="email"
          type="email"
          name="email"
          label="Email"
          autoComplete="email"
          onChange={handleChange}
          value={userData.email}
          required
        />
        <Input
          placeholder="Enter your password"
          id="password"
          type="password"
          name="password"
          label="Password"
          autoComplete="current-password"
          onChange={handleChange}
          value={userData.password}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Spinner /> : "Log in"}
        </Button>
      </form>
    </AuthCard>
  );
}
