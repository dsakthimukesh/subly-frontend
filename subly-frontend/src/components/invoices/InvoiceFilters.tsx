interface Props {
  status: string;
  onChange: (status: string) => void;
}

export default function InvoiceFilters({ status, onChange }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-700 outline-none cursor-pointer"
      >
        <option value="">All Status</option>
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
        <option value="Overdue">Overdue</option>
      </select>
    </div>
  );
}
