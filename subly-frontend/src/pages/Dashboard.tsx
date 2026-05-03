import { useEffect, useState } from "react";
import { getStats, getSubscriptions } from "../api/api";
import { CreditCard, TrendingUp, AlertCircle, FileWarning } from "lucide-react";
import type { Subscription } from "../types/subscription";

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [recentSubs, setRecentSubs] = useState<Subscription[]>([]);

    useEffect(() => {
        fetchStats();
        fetchRecentSubscriptions();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await getStats();
            setStats(res);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchRecentSubscriptions = async () => {
        try {
            const data = await getSubscriptions();
            const list: Subscription[] = Array.isArray(data) ? data : [];
            // Sort by start_date descending, take top 5
            const sorted = [...list].sort(
                (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
            );
            setRecentSubs(sorted.slice(0, 5));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {/* Title */}
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-gray-500 mb-6">
                Welcome back! Here's an overview of your subscription business.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <StatCard
                    title="Active Subscriptions"
                    value={stats?.active || 0}
                    icon={CreditCard}
                    color="bg-blue-100 text-blue-600"
                />
                <StatCard
                    title="Monthly Revenue"
                    value={`₹${stats?.revenue || 0}`}
                    icon={TrendingUp}
                    color="bg-green-100 text-green-600"
                />
                <StatCard
                    title="Expiring Subscriptions"
                    value={stats?.expiring || 0}
                    icon={AlertCircle}
                    color="bg-orange-100 text-orange-600"
                />
                <StatCard
                    title="Unpaid Invoices"
                    value={stats?.unpaid || 0}
                    icon={FileWarning}
                    color="bg-red-100 text-red-600"
                />
            </div>

            {/* Recent Subscriptions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
                <h2 className="text-base font-semibold text-gray-900 mb-5">
                    Recent Subscriptions
                </h2>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left pb-3 font-medium text-gray-500 w-1/4">Customer</th>
                            <th className="text-left pb-3 font-medium text-gray-500 w-1/5">Plan</th>
                            <th className="text-left pb-3 font-medium text-gray-500 w-1/5">Start Date</th>
                            <th className="text-left pb-3 font-medium text-gray-500">Status</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {recentSubs.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-6 text-center text-gray-400 text-sm">
                                    No subscriptions found.
                                </td>
                            </tr>
                        ) : (
                            recentSubs.map((sub) => (
                                <tr key={sub.subscription_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3.5 text-gray-800 font-medium">{sub.customer_name}</td>
                                    <td className="py-3.5 text-gray-600">{sub.plan_name}</td>
                                    <td className="py-3.5 text-gray-600">
                                        {new Date(sub.start_date).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="py-3.5">
                                        <StatusBadge status={sub.status_name} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        ACTIVE:    "bg-green-50 text-green-600 border-green-200",
        EXPIRED:   "bg-red-50 text-red-600 border-red-200",
        CANCELLED: "bg-gray-100 text-gray-500 border-gray-200",
    };
    const labels: Record<string, string> = {
        ACTIVE: "Active", EXPIRED: "Expired", CANCELLED: "Cancelled",
    };
    const cls = styles[status] ?? styles["CANCELLED"];
    return (
        <span className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
            {labels[status] ?? status}
        </span>
    );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, color }: any) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex justify-between items-center">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-semibold mt-2">{value}</p>
            </div>
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon size={18} />
            </div>
        </div>
    );
}
