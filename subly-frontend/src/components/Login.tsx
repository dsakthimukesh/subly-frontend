import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/api";
import type { ApiError } from "../api/api";
import Input from "./common/Input";
import Button from "./common/Button";

interface LoginFormData {
  email: string;
  password: string;
}

interface Feedback {
  message: string;
  type: "error" | "warning" | "success";
}

const feedbackStyles: Record<Feedback["type"], string> = {
  success: "bg-green-50 border border-green-300 text-green-700",
  warning: "bg-yellow-50 border border-yellow-300 text-yellow-800",
  error:   "bg-red-50 border border-red-300 text-red-700",
};

export default function Login() {
  const { register, handleSubmit, watch } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const { login: saveToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const values = watch();
  const isFormComplete = !!values.email?.trim() && !!values.password?.trim();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setFeedback(null);

    try {
      const res = await loginUser(data);
      // 200 — success
      saveToken(res.token);
      navigate("/dashboard");
    } catch (err) {
      const { status } = err as ApiError;

      if (status === 400) {
        setFeedback({ type: "error", message: "Incorrect email or password." });
      } else if (status === 500) {
        setFeedback({ type: "error", message: "Something went wrong on our end. Please try again later." });
      } else {
        setFeedback({ type: "error", message: "An unexpected error occurred. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[420px] rounded-2xl shadow-md p-8">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-center">Subly</h1>
        <p className="text-center text-gray-500 mt-2 mb-6 text-sm">
          Simplified Subscription & Billing Management
        </p>

        {/* Feedback Banner */}
        {feedback && (
          <div className={`rounded-lg px-4 py-3 text-sm mb-4 ${feedbackStyles[feedback.type]}`}>
            {feedback.message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
            {...register("email")}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            {...register("password")}
          />
          <Button type="submit" loading={loading} disabled={!isFormComplete}>
            Login
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 text-sm hover:underline"
          >
            Don't have an account? Sign up
          </button>
        </div>

        <div className="border-t my-6" />

        <div className="text-center text-sm text-gray-600 cursor-pointer hover:underline">
          Super Admin Access →
        </div>

      </div>
    </div>
  );
}
