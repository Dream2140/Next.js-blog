"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Input from "@/components/Input/Input";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";
import AuthCard from "@/components/Auth/AuthCard";

interface RegisterState {
  name: string;
  email: string;
  password: string;
}

const initialState: RegisterState = {
  name: "",
  email: "",
  password: "",
};

export default function RegisterForm() {
  const [userData, setUserData] = useState<RegisterState>(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const request = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!request.ok) {
        const errorData = await request.json();
        setError(errorData.error || "Could not create account");
        return;
      }

      await signIn("credentials", {
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
        redirect: true,
        callbackUrl: ROUTES.HOME,
      });
    } catch (error) {
      console.error(error);
      setError("Unexpected error while creating the account");
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
      title="Create your account"
      subtitle="Start publishing articles and managing your blog in one place."
      footer={
        <span>
          Already have an account?{" "}
          <Link href={ROUTES.LOGIN} className="font-medium text-sky-600">
            Sign in
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <Input
          placeholder="Jane Doe"
          id="name"
          type="text"
          name="name"
          label="Name"
          autoComplete="name"
          onChange={handleChange}
          value={userData.name}
          required
        />
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
          placeholder="At least 8 characters"
          id="password"
          type="password"
          name="password"
          label="Password"
          autoComplete="new-password"
          onChange={handleChange}
          value={userData.password}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Spinner /> : "Create account"}
        </Button>
      </form>
    </AuthCard>
  );
}
