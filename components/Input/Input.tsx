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
        className={`w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-black outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 ${customClass}`}
      />
    </div>
  );
}
