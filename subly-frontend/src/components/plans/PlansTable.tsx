import type { Plan } from "../../types/plan";

interface Props {
  plans: Plan[];
  loading: boolean;
  onEdit: (plan: Plan) => void;
}

export default function PlansTable({ plans, loading, onEdit }: Props) {
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <svg
            className="animate-spin h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span className="text-sm">Loading plans...</span>
        </div>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No plans found. Create your first plan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Plan Name
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Price
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Billing Cycle
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Features
              </th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {plans.map((plan) => (
              <tr
                key={plan.plan_id}
                className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* Plan Name */}
                <td className="px-6 py-4 font-medium text-gray-900">
                  {plan.plan_name}
                </td>

                {/* Price */}
                <td className="px-6 py-4 text-gray-700">
                  ₹{Number(plan.price).toLocaleString("en-IN")}
                </td>

                {/* Billing Cycle */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                    {plan.billing_cycle_id === "1" ? "Monthly" : "Yearly"}
                  </span>
                </td>

                {/* Features — truncate at 15 chars, show full on hover */}
                <td className="px-6 py-4 text-gray-600">
                  <FeatureCell value={plan.features} />
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => onEdit(plan)}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
        {plans.length} plan{plans.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}

// ─── Feature cell with truncation + tooltip ───────────────────────────────────
function FeatureCell({ value }: { value: string }) {
  if (!value) return <span className="text-gray-300">—</span>;

  const truncated = value.length > 15 ? value.slice(0, 15) + "…" : value;
  const needsTooltip = value.length > 15;

  if (!needsTooltip) return <span>{value}</span>;

  return (
    <span className="relative group cursor-default">
      <span>{truncated}</span>
      {/* Tooltip */}
      <span className="absolute bottom-full left-0 mb-1.5 hidden group-hover:block z-10
        bg-gray-900 text-white text-xs rounded-lg px-3 py-1.5 whitespace-nowrap shadow-lg">
        {value}
        {/* Arrow */}
        <span className="absolute top-full left-4 border-4 border-transparent border-t-gray-900" />
      </span>
    </span>
  );
}
