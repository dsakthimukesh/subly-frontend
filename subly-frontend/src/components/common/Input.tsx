import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export default function Input({ label, required, ...props }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-transparent focus:border-gray-300 outline-none"
        {...props}
      />
    </div>
  );
}
