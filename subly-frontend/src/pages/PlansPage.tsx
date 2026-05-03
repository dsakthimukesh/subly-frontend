import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import type { Plan } from "../types/plan";
import { getPlans } from "../api/api";
import PlansTable from "../components/plans/PlansTable";
import AddEditPlanModal from "../components/plans/AddEditPlanModal";

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const data = await getPlans();
      setPlans(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const openCreate = () => {
    setSelectedPlan(null);
    setModalOpen(true);
  };

  const openEdit = (plan: Plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Plans Management
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Create and manage subscription plans
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          Create Plan
        </button>
      </div>

      {/* Table */}
      <PlansTable
        plans={plans}
        loading={loading}
        onEdit={openEdit}
      />

      {/* Add / Edit modal */}
      {modalOpen && (
        <AddEditPlanModal
          plan={selectedPlan}
          onClose={closeModal}
          onSuccess={fetchPlans}
        />
      )}
    </div>
  );
}
