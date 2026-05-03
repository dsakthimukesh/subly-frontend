import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/api";
import type { ApiError } from "../api/api";
import Input from "./common/Input";
import Button from "./common/Button";

interface SignupFormData {
  company_name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
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

export default function SignupPage() {
  const { register, handleSubmit, watch } = useForm<SignupFormData>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const values = watch();
  const isFormComplete =
    !!values.company_name?.trim() &&
    !!values.email?.trim() &&
    !!values.password?.trim() &&
    !!values.phone?.trim() &&
    !!values.address?.trim();

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setFeedback(null);

    try {
      await signupUser(data);
      // 200 — account created
      setFeedback({ type: "success", message: "Account created! Redirecting to login..." });
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      const { status } = err as ApiError;

      if (status === 400) {
        setFeedback({ type: "warning", message: "Please fill in all fields correctly." });
      } else if (status === 401) {
        setFeedback({ type: "error", message: "Unauthorized. Please check your credentials." });
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

        <h1 className="text-3xl font-semibold text-center">Create Account</h1>
        <p className="text-center text-gray-500 mt-2 mb-6 text-sm">
          Start managing your subscriptions
        </p>

        {/* Feedback Banner */}
        {feedback && (
          <div className={`rounded-lg px-4 py-3 text-sm mb-4 ${feedbackStyles[feedback.type]}`}>
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Company Name" placeholder="Your company name" {...register("company_name")} required/>
          <Input label="Email" type="email" placeholder="Enter your email" {...register("email")} required/>
          <Input label="Password" type="password" placeholder="Create a password" {...register("password")} required/>
          <Input label="Phone" type="tel" placeholder="Your phone number" {...register("phone")} required/>
          <Input label="Address" placeholder="Your address" {...register("address")} required/>

          <Button type="submit" loading={loading} disabled={!isFormComplete}>
            Sign Up
          </Button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 text-sm hover:underline"
          >
            Already have an account? Login
          </button>
        </div>

      </div>
    </div>
  );
}
