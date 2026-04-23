"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Input from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { useRouter } from "next/navigation";

interface BlogStateProps {
  name: string;
  image: string;
  text: string;
}

const blogDataInitialState: BlogStateProps = {
  name: "",
  image: "",
  text: "",
};

const Create = () => {
  const router = useRouter();
  const [blogData, setBlogData] =
    useState<BlogStateProps>(blogDataInitialState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setBlogData({ ...blogData, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!blogData.name || !blogData.text || !blogData.image) {
      setError("All fields are required");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Could not create the post");
        return;
      }

      setBlogData(blogDataInitialState);
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error(e);
      setError("Unexpected error while creating the post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <div className="flex flex-col gap-3 pt-20 pb-20 w-7/12">
        {error ? (
          <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        ) : null}
        <Input
          placeholder="Blog name"
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={blogData.name}
          label="Enter name"
          required
        />
        <div>
          <label htmlFor="text" className="block text-gray-700 mb-5">
            Enter text
          </label>
          <textarea
            className="h-[200px] w-full border-2 p-4"
            placeholder="Blog text"
            id="text"
            name="text"
            onChange={handleChange}
            value={blogData.text}
            required
          />
        </div>

        <Input
          label="Paste image url"
          placeholder="Blog image"
          id="image"
          type="url"
          name="image"
          onChange={handleChange}
          value={blogData.image}
          required
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Publishing..." : "Post Blog"}
        </Button>
      </div>
    </form>
  );
};

export default Create;
