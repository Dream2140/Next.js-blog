"use client";

import { FormEvent, useState } from "react";
import Input from "@/components/Input/Input";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/Button/Button";
import { signIn } from "next-auth/react";

interface UserDataStateProps {
  name: string;
  email: string;
  password: string;
}

const userDataState: UserDataStateProps = {
  name: "",
  email: "",
  password: "",
};

export default function Register() {
  const [userData, setUserData] = useState<UserDataStateProps>(userDataState);

  const [error, setError] = useState<string>("");
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const request = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (request.ok) {
        await signIn("credentials", {
          email: userData.email,
          password: userData.password,
          redirect: true,
          callbackUrl: ROUTES.HOME,
        });
      } else {
        const errorData = await request.json();

        setError(errorData.error);

        console.log("API Error Response:", errorData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  function handleChange(event: any) {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }

  return (
    <form onSubmit={handleSubmit} className="text-center">
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-3 rounded relative">
            {error}
          </div>
        )}
        <Input
          placeholder="Name"
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={userData.name}
          required
        />
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
        <Button type="submit">Submit</Button>
      </div>

      <div>
        <div>
          Do you have an account ?{" "}
          <Link href={ROUTES.LOGIN} className="text-blue-500">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
}
