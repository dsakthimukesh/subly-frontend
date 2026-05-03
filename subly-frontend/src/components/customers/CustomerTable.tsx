import type { Customer } from "../../types/customer";
import StatusBadge from "./StatusBadge";

interface Props {
  customers: Customer[];
  loading: boolean;
}

export default function CustomerTable({
  customers,
  loading
}: Props) {
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
          <span className="text-sm">Loading customers...</span>
        </div>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No customers found.</p>
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
                Customer Name
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Email
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Current Plan
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Status
              </th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{customer.name}</div>
                  {customer.phone && (
                    <div className="text-xs text-gray-400 mt-0.5">{customer.phone}</div>
                  )}
                </td>

                <td className="px-6 py-4 text-gray-600">{customer.email}</td>

                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                    {customer.plan}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={customer.status} />
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <ActionBtn label="View" />
                    <ActionBtn
                      label="Change Plan"
                    />
                    <ActionBtn
                      label="Cancel"
                      danger
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
        {customers.length} customer{customers.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}

// ─── Internal action button ───────────────────────────────────────────────────
interface ActionBtnProps {
  label: string;
  danger?: boolean;
}

function ActionBtn({ label, danger }: ActionBtnProps) {
  return (
    <button
      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
        danger
          ? "text-red-600 border-red-200 hover:bg-red-50"
          : "text-gray-700 border-gray-200 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}
