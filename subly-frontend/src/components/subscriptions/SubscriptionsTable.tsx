import type { Subscription } from "../../types/subscription";
import SubscriptionStatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";

interface Props {
  subscriptions: Subscription[];
  loading: boolean;
  cancellingId: string | null;
  onCancel: (subscription: Subscription) => void;
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function SubscriptionsTable({
  subscriptions,
  loading,
  cancellingId,
  onCancel,
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
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span className="text-sm">Loading subscriptions...</span>
        </div>
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No subscriptions found.</p>
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
                Customer
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Plan
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Start Date
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                End Date
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
            {subscriptions.map((sub) => (
              <tr
                key={sub.subscription_id}
                className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* Customer */}
                <td className="px-6 py-4 font-medium text-gray-900">
                  {sub.customer_name}
                </td>

                {/* Plan */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                    {sub.plan_name}
                  </span>
                </td>

                {/* Start Date */}
                <td className="px-6 py-4 text-gray-600">
                  {formatDate(sub.start_date)}
                </td>

                {/* End Date */}
                <td className="px-6 py-4 text-gray-600">
                  {formatDate(sub.end_date)}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <SubscriptionStatusBadge status={sub.status_name} />
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <ActionMenu
                      subscription={sub}
                      cancelling={cancellingId === sub.subscription_id}
                      onCancel={onCancel}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
        {subscriptions.length} subscription{subscriptions.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
