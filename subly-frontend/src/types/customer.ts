export type CustomerStatus = "Active" | "Expired" | "Cancelled";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  plan: string;
  status: CustomerStatus;
}

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  plan: string;
  status: CustomerStatus;
}
