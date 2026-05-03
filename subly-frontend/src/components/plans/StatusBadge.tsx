import type { PlanStatus } from "../../types/plan";

interface Props {
  status: PlanStatus;
}

export default function PlanStatusBadge({ status }: Props) {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive
          ? "bg-green-100 text-green-600"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
