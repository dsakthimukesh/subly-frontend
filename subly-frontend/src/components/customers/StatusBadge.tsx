import type { CustomerStatus } from "../../types/customer";

interface Props {
  status: CustomerStatus;
}

const config: Record<CustomerStatus, { bg: string; text: string }> = {
  Active: { bg: "bg-green-100", text: "text-green-700" },
  Expired: { bg: "bg-red-100", text: "text-red-700" },
  Cancelled: { bg: "bg-gray-100", text: "text-gray-600" },
};

export default function StatusBadge({ status }: Props) {
  const { bg, text } = config[status] ?? config["Cancelled"];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}
    >
      {status}
    </span>
  );
}
