export type BillingCycle = "Monthly" | "Yearly";
export type PlanStatus = "Active" | "Inactive";

export const BILLING_CYCLES = [
  { id: 1, label: "Monthly" },
  { id: 2, label: "Yearly" },
] as const;

export interface Plan {
  plan_id: string;
  plan_name: string;
  price: string;
  billing_cycle_id: string;
  features: string;
}

export interface PlanFormData {
  name: string;
  price: number;
  billing_cycle_id: number;
  features: string;
}
