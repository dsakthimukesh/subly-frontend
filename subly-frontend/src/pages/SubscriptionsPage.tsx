import { useEffect, useMemo, useState } from "react";
import type { Subscription } from "../types/subscription";
import { getSubscriptions, cancelSubscription } from "../api/api";
import SubscriptionFilters from "../components/subscriptions/SubscriptionFilters";
import SubscriptionsTable from "../components/subscriptions/SubscriptionsTable";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const data = await getSubscriptions();
      setSubscriptions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // ─── Frontend filter ─────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (!statusFilter) return subscriptions;
    return subscriptions.filter((s) => s.status_name === statusFilter);
  }, [subscriptions, statusFilter]);

  // ─── Cancel handler ──────────────────────────────────────────────────────────
  const handleCancel = async (subscription: Subscription) => {
    setCancellingId(subscription.subscription_id);
    try {
      await cancelSubscription(subscription.subscription_id);
      await fetchSubscriptions();
    } catch (err) {
      console.error(err);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Subscriptions</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          View and manage all subscriptions
        </p>
      </div>

      {/* Filters */}
      <SubscriptionFilters status={statusFilter} onChange={setStatusFilter} />

      {/* Table */}
      <SubscriptionsTable
        subscriptions={filtered}
        loading={loading}
        cancellingId={cancellingId}
        onCancel={handleCancel}
      />
    </div>
  );
}
