import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({ className, loading, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      disabled={loading || disabled}
      className={clsx(
        "w-full bg-black text-white py-2.5 rounded-lg font-medium",
        "hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed",
        "flex items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {loading ? "Please wait..." : children}
    </button>
  );
}
