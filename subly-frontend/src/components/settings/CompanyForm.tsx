import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Company, CompanyFormData } from "../../types/company";
import { updateCompany } from "../../api/api";

interface Props {
  company: Company | null;
  loading: boolean;
}

export default function CompanyForm({ company, loading }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CompanyFormData>({
    defaultValues: { company_name: "", phone: "", address: "" },
  });

  // Pre-fill when company data arrives
  useEffect(() => {
    if (company) {
      reset({
        company_name: company.company_name,
        phone: company.phone,
        address: company.address,
      });
    }
  }, [company, reset]);

  const onSubmit = async (data: CompanyFormData) => {
    try {
      await updateCompany(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
      {/* Section header */}
      <div>
        <h2 className="text-base font-semibold text-gray-900">
          Company Information
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Update your company details and contact information.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-400 text-sm py-4">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Loading company info...
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Company Name */}
          <FormField label="Company Name" required error={errors.company_name?.message}>
            <input
              {...register("company_name", { required: "Company name is required" })}
              placeholder="Your company name"
              className={inputClass(!!errors.company_name)}
            />
          </FormField>

          {/* Email — readonly */}
          <FormField label="Email Address">
            <input
              type="email"
              readOnly
              value={company?.email ?? ""}
              className="w-full bg-gray-100 border border-transparent rounded-lg px-3 py-2 text-sm text-gray-400 outline-none cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
          </FormField>

          {/* Phone */}
          <FormField label="Phone Number" error={errors.phone?.message}>
            <input
              {...register("phone")}
              placeholder="+1 (555) 000-0000"
              className={inputClass(false)}
            />
          </FormField>

          {/* Address */}
          <FormField label="Address" error={errors.address?.message}>
            <input
              {...register("address")}
              placeholder="123 Main St, City, Country"
              className={inputClass(false)}
            />
          </FormField>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            {isSubmitSuccessful && (
              <p className="text-sm text-green-600">Changes saved successfully.</p>
            )}
            <div className="ml-auto">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting && <Spinner />}
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function inputClass(hasError: boolean) {
  return `w-full bg-gray-100 border rounded-lg px-3 py-2 text-sm outline-none transition-colors ${
    hasError
      ? "border-red-300 bg-red-50 focus:border-red-400"
      : "border-transparent focus:border-gray-300 focus:bg-white"
  }`;
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function FormField({ label, required, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
