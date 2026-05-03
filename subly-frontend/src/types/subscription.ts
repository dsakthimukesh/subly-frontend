export type SubscriptionStatus = "ACTIVE" | "EXPIRED" | "CANCELLED";

export interface Subscription {
  subscription_id: string;
  customer_id: string;
  customer_name: string;
  plan_id: string;
  plan_name: string;
  start_date: string;
  end_date: string;
  status_name: SubscriptionStatus;
}
