import { useEffect, useMemo, useState } from "react";
import type { Invoice } from "../types/invoice";
import { getInvoices, markInvoicePaid } from "../api/api";
import InvoiceFilters from "../components/invoices/InvoiceFilters";
import InvoicesTable from "../components/invoices/InvoicesTable";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [markingPaidId, setMarkingPaidId] = useState<string | null>(null);

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const data = await getInvoices();
      setInvoices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // ─── Frontend filter ─────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (!statusFilter) return invoices;
    return invoices.filter((inv) => inv.status_name === statusFilter);
  }, [invoices, statusFilter]);

  // ─── Mark as Paid ────────────────────────────────────────────────────────────
  const handleMarkPaid = async (invoice: Invoice) => {
    setMarkingPaidId(invoice.invoice_id);
    try {
      await markInvoicePaid(invoice.invoice_id);
      await fetchInvoices();
    } catch (err) {
      console.error(err);
    } finally {
      setMarkingPaidId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage billing and invoices
        </p>
      </div>

      {/* Filters */}
      <InvoiceFilters status={statusFilter} onChange={setStatusFilter} />

      {/* Table */}
      <InvoicesTable
        invoices={filtered}
        loading={loading}
        markingPaidId={markingPaidId}
        onMarkPaid={handleMarkPaid}
      />
    </div>
  );
}
