import type { InvoiceStatus } from "../../types/invoice";

interface Props {
  status: InvoiceStatus;
}

const config: Record<InvoiceStatus, { bg: string; text: string }> = {
  PAID:    { bg: "bg-green-100",  text: "text-green-600"  },
  UNPAID:  { bg: "bg-yellow-100", text: "text-yellow-700" },
  OVERDUE: { bg: "bg-red-100",    text: "text-red-600"    },
};

export default function InvoiceStatusBadge({ status }: Props) {
  const { bg, text } = config[status] ?? config["UNPAID"];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}
    >
      {status}
    </span>
  );
}
