import type { Invoice } from "../../types/invoice";
import InvoiceStatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";

interface Props {
  invoices: Invoice[];
  loading: boolean;
  markingPaidId: string | null;
  onMarkPaid: (invoice: Invoice) => void;
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(amount: string, currency: string): string {
  const symbol = currency?.toUpperCase() === "USD" ? "$" : "₹";
  return `${symbol}${Number(amount).toLocaleString("en-IN")}`;
}

export default function InvoicesTable({
  invoices,
  loading,
  markingPaidId,
  onMarkPaid,
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
          <span className="text-sm">Loading invoices...</span>
        </div>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No invoices found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Invoice ID
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Customer
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Amount
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Due Date
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
            {invoices.map((invoice) => (
              <tr
                key={invoice.invoice_id}
                className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* Invoice ID */}
                <td className="px-6 py-4 font-medium text-gray-900">
                  #{invoice.invoice_id}
                </td>

                {/* Customer */}
                <td className="px-6 py-4 text-gray-700">
                  {invoice.customer_name}
                </td>

                {/* Amount */}
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {formatAmount(invoice.amount, invoice.currency)}
                </td>

                {/* Due Date */}
                <td className="px-6 py-4 text-gray-600">
                  {formatDate(invoice.due_date)}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <InvoiceStatusBadge status={invoice.status_name} />
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <ActionButtons
                    invoice={invoice}
                    markingPaidId={markingPaidId}
                    onMarkPaid={onMarkPaid}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl text-xs text-gray-400">
        {invoices.length} invoice{invoices.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
