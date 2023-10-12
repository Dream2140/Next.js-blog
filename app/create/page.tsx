"use client";

import React, { FormEvent, useState } from "react";
import Input from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";

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
  const [blogData, setBlogData] =
    useState<BlogStateProps>(blogDataInitialState);

  function handleChange(event: any) {
    setBlogData({ ...blogData, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!blogData.name || !blogData.text || !blogData.image) {
      return;
    }

    try {
      await fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify(blogData),
      });

      setBlogData(blogDataInitialState);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <div className="flex flex-col gap-3 pt-20 pb-20 w-7/12">
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

        <Button type="submit">Post Blog</Button>
      </div>
    </form>
  );
};

export default Create;
