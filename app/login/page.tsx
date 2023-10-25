"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input/Input";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";

interface InitialUserDataProps {
  name: string;
  email: string;
  password: string;
}

const initialUserData: InitialUserDataProps = {
  name: "",
  email: "",
  password: "",
};

export default function Login() {
  const router = useRouter();
  const [userData, setUserData] = useState(initialUserData);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);

      const login = await signIn("credentials", {
        ...userData,
        redirect: false,
      });

      if (login?.error) {
        return setError(login.error);
      }

      router.refresh();
      router.back();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }

  return (
    <form onSubmit={onSubmit} className="text-center">
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-3 rounded relative">
            {error}
          </div>
        )}
        <Input
          placeholder="Email"
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={userData.email}
          required
        />
        <Input
          placeholder="Password"
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={userData.password}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Log in"}
        </Button>
      </div>

      <div>
        Dont have an account?{" "}
        <Link href={ROUTES.REGISTER} className="text-blue-500">
          Sign up
        </Link>
      </div>
    </form>
  );
}
