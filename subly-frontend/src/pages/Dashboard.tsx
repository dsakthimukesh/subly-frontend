import { useEffect, useState } from "react";
import { getStats } from "../api/api";
import { CreditCard, TrendingUp, AlertCircle, FileWarning } from "lucide-react";

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await getStats();
            setStats(res);
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
                            <th className="text-left pb-3 font-medium text-gray-500 w-1/5">Status</th>
                            <th className="text-right pb-3 font-medium text-gray-500">Amount</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {dummyData.map((item, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3.5 text-gray-800 font-medium">{item.customer}</td>
                                <td className="py-3.5 text-gray-600">{item.plan}</td>
                                <td className="py-3.5 text-gray-600">{item.date}</td>
                                <td className="py-3.5">
                                    <span className="inline-flex items-center bg-green-50 text-green-600 border border-green-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
                                        Active
                                    </span>
                                </td>
                                <td className="py-3.5 text-right text-gray-800 font-medium">{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

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

const dummyData = [
    {
        customer: "Reliance Digital",
        plan: "Enterprise",
        date: "2025-01-10",
        amount: "₹50,000",
    },
    {
        customer: "Tata Motors",
        plan: "Professional",
        date: "2025-01-09",
        amount: "₹25,000",
    },
    {
        customer: "Infosys Ltd",
        plan: "Enterprise",
        date: "2025-01-08",
        amount: "₹50,000",
    },
    {
        customer: "Wipro Technologies",
        plan: "Basic",
        date: "2025-01-07",
        amount: "₹10,000",
    },
    {
        customer: "Mahindra & Mahindra",
        plan: "Professional",
        date: "2025-01-06",
        amount: "₹25,000",
    },
];