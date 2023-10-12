"use client";

import { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  id: string;
  placeholder?: string;
  customClass?: string;
  label?: string;
}

export default function Input({
  type,
  value,
  onChange,
  name,
  id,
  placeholder,
  customClass,
  label,
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-gray-700 mb-5">
          {label}
        </label>
      )}
      <input
        {...props}
        required
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        className={`w-full p-4 font-light bg-white border-2 outline-none text-black ${customClass}`}
      />
    </div>
  );
}
