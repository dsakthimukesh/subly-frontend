import { Eye, CircleCheckBig } from "lucide-react";
import type { Invoice } from "../../types/invoice";

interface Props {
  invoice: Invoice;
  markingPaidId: string | null;
  onMarkPaid: (invoice: Invoice) => void;
}

export default function ActionButtons({ invoice, markingPaidId, onMarkPaid }: Props) {
  const isPaying = markingPaidId === invoice.invoice_id;
  const canMarkPaid = invoice.status_name === "UNPAID" || invoice.status_name === "OVERDUE";

  return (
    <div className="flex items-center justify-end gap-2">
      {/* View */}
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        <Eye size={15} />
        View
      </button>

      {/* Mark as Paid — only for Unpaid / Overdue */}
      {canMarkPaid && (
        <button
          onClick={() => onMarkPaid(invoice)}
          disabled={isPaying}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CircleCheckBig size={15} />
          {isPaying ? "Saving..." : "Mark Paid"}
        </button>
      )}
    </div>
  );
}
