import type { SubscriptionStatus } from "../../types/subscription";

interface Props {
  status: SubscriptionStatus;
}

const config: Record<SubscriptionStatus, { bg: string; text: string; label: string }> = {
  ACTIVE:    { bg: "bg-green-100", text: "text-green-700", label: "Active" },
  EXPIRED:   { bg: "bg-red-100",   text: "text-red-700",   label: "Expired" },
  CANCELLED: { bg: "bg-gray-100",  text: "text-gray-600",  label: "Cancelled" },
};

export default function SubscriptionStatusBadge({ status }: Props) {
  const { bg, text, label } = config[status] ?? config["CANCELLED"];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}
    >
      {label}
    </span>
  );
}
