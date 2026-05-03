export type InvoiceStatus = "PAID" | "UNPAID" | "OVERDUE";

export interface Invoice {
  invoice_id: string;
  customer_id: string;
  customer_name: string;
  subscription_id: string;
  amount: string;
  currency: string;
  due_date: string;
  status_name: InvoiceStatus;
}
