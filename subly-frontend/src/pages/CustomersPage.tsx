import { useEffect, useMemo, useState } from "react";
import type { Customer } from "../types/customer";
import { getCustomers } from "../api/api";
import CustomerFilters, { type FilterState } from "../components/customers/CustomerFilters";
import CustomerTable from "../components/customers/CustomerTable";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    plan: "",
    status: "",
  });

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ─── Derived plan list for filter dropdown ──────────────────────────────────
  const plans = useMemo(
    () => [...new Set(customers.map((c) => c.plan).filter(Boolean))].sort(),
    [customers]
  );

  // ─── Client-side filtering ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = filters.search.toLowerCase();
    return customers.filter((c) => {
      const matchSearch =
        !q || c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q);
      const matchPlan = !filters.plan || c.plan === filters.plan;
      const matchStatus = !filters.status || c.status === filters.status;
      return matchSearch && matchPlan && matchStatus;
    });
  }, [customers, filters]);

  // ─── Handlers ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your subscription customers
          </p>
        </div>
      </div>

      {/* Filters */}
      <CustomerFilters filters={filters} plans={plans} onChange={setFilters} />

      {/* Table */}
      <CustomerTable
        customers={filtered}
        loading={loading}
      />
    </div>
  );
}
