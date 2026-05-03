import { Search } from "lucide-react";

export interface FilterState {
  search: string;
  plan: string;
  status: string;
}

interface Props {
  filters: FilterState;
  plans: string[];
  onChange: (filters: FilterState) => void;
}

export default function CustomerFilters({ filters, plans, onChange }: Props) {
  const set = (key: keyof FilterState, value: string) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap gap-3">
      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-100 px-3 rounded-lg flex-1 min-w-[200px]">
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search by name or email..."
          className="bg-transparent outline-none py-2 w-full text-sm text-gray-700 placeholder-gray-400"
          value={filters.search}
          onChange={(e) => set("search", e.target.value)}
        />
      </div>

      {/* Plan */}
      <select
        className="bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-700 outline-none cursor-pointer"
        value={filters.plan}
        onChange={(e) => set("plan", e.target.value)}
      >
        <option value="">All Plans</option>
        {plans.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        className="bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-700 outline-none cursor-pointer"
        value={filters.status}
        onChange={(e) => set("status", e.target.value)}
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Expired">Expired</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>
  );
}
