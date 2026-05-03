import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import type { Plan, PlanFormData } from "../../types/plan";
import { BILLING_CYCLES } from "../../types/plan";
import { createPlan, updatePlan } from "../../api/api";

interface Props {
  plan: Plan | null; // null = create mode
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddEditPlanModal({ plan, onClose, onSuccess }: Props) {
  const isEdit = plan !== null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlanFormData>({
    defaultValues: {
      name: "",
      price: 0,
      billing_cycle_id: 1,
      features: "",
    },
  });

  useEffect(() => {
    if (plan) {
      reset({
        name: plan.plan_name,
        price: Number(plan.price),
        billing_cycle_id: Number(plan.billing_cycle_id) ?? 1,
        features: plan.features ?? "",
      });
    } else {
      reset({ name: "", price: 0, billing_cycle_id: 1, features: "" });
    }
  }, [plan, reset]);

  const onSubmit = async (data: PlanFormData) => {
    try {
      const payload = {
        plan_name: data.name,
        price: Number(data.price),
        billing_cycle_id: Number(data.billing_cycle_id),
        features: data.features,
      };

      if (isEdit) {
        await updatePlan(plan.plan_id, payload);
      } else {
        await createPlan(payload);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {isEdit ? "Edit Plan" : "Create Plan"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {isEdit
                ? "Update the plan details below"
                : "Fill in the details to create a new plan"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="px-6 py-5 space-y-4">
            {/* Plan Name */}
            <FormField label="Plan Name" required error={errors.name?.message}>
              <input
                {...register("name", { required: "Plan name is required" })}
                placeholder="e.g. Pro Plan"
                className={inputClass(!!errors.name)}
              />
            </FormField>

            {/* Price */}
            <FormField label="Price (₹)" required error={errors.price?.message}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                  ₹
                </span>
                <input
                  type="number"
                  min={0}
                  step="1"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be 0 or more" },
                    valueAsNumber: true,
                  })}
                  placeholder="0"
                  className={`${inputClass(!!errors.price)} pl-7`}
                />
              </div>
            </FormField>

            {/* Billing Cycle */}
            <FormField
              label="Billing Cycle"
              required
              error={errors.billing_cycle_id?.message}
            >
              <select
                {...register("billing_cycle_id", {
                  required: "Billing cycle is required",
                  valueAsNumber: true,
                })}
                className={inputClass(!!errors.billing_cycle_id)}
              >
                {BILLING_CYCLES.map((cycle) => (
                  <option key={cycle.id} value={cycle.id}>
                    {cycle.label}
                  </option>
                ))}
              </select>
            </FormField>

            {/* Features */}
            <FormField
              label="Features"
              required
              error={errors.features?.message}
            >
              <textarea
                {...register("features", { required: "Features are required" })}
                rows={3}
                placeholder="e.g. Unlimited users, Priority support, Custom domain"
                className={`${inputClass(!!errors.features)} resize-none`}
              />
            </FormField>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && <Spinner />}
              {isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function inputClass(hasError: boolean) {
  return `w-full px-3 py-2 rounded-lg text-sm border outline-none transition-colors ${
    hasError
      ? "border-red-300 bg-red-50 focus:border-red-400"
      : "border-gray-200 bg-gray-50 focus:border-gray-400 focus:bg-white"
  }`;
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

function FormField({ label, required, error, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-3.5 w-3.5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
