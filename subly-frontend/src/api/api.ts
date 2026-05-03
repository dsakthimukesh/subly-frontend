import axios from "axios";

// ─── Typed API Error ──────────────────────────────────────────────────────────
export interface ApiError {
  status: number;
  message: string;
}

// ─── Axios Instance ───────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: "https://subly-backend-c39j.onrender.com",
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ─── Response Interceptor — normalise errors into ApiError shape ──────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      status: error.response?.status ?? 0,
      message: error.response?.data?.message ?? "An unexpected error occurred.",
    };
    return Promise.reject(apiError);
  }
);

// ─── Auth Endpoints ───────────────────────────────────────────────────────────
export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<{ token: string }> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const signupUser = async (data: {
  company_name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}): Promise<{ message: string }> => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const getStats = async (): Promise<any> => {
  const res = await api.get("/dashboard");
  return res.data;
};

export const getCustomers = async (): Promise<any> => {
  const res = await api.get("/customers");
  return res.data;
};

export const createCustomer = async (data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  plan: string;
  status: string;
}): Promise<any> => {
  const res = await api.post("/customers", data);
  return res.data;
};

export const updateCustomer = async (
  id: string,
  data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    plan: string;
    status: string;
  }
): Promise<any> => {
  const res = await api.put(`/customers/${id}`, data);
  return res.data;
};

export const deleteCustomer = async (id: string): Promise<any> => {
  const res = await api.delete(`/customers/${id}`);
  return res.data;
};

// ─── Plans Endpoints ──────────────────────────────────────────────────────────
export const getPlans = async (): Promise<any> => {
  const res = await api.get("/plans");
  return res.data;
};

export const createPlan = async (data: {
  plan_name: string;
  price: number;
  billing_cycle_id: number;
  features: string;
}): Promise<any> => {
  const res = await api.post("/plans/create", data);
  return res.data;
};

export const updatePlan = async (
  id: string,
  data: {
    plan_name: string;
    price: number;
    billing_cycle_id: number;
    features: string;
  }
): Promise<any> => {
  const res = await api.put(`/plans/${id}`, data);
  return res.data;
};

export const togglePlanStatus = async (
  id: string,
  status: string
): Promise<any> => {
  const res = await api.patch(`/plans/${id}/status`, { status });
  return res.data;
};

// ─── Subscriptions Endpoints ──────────────────────────────────────────────────
export const getSubscriptions = async (): Promise<any> => {
  const res = await api.get("/subscriptions");
  return res.data;
};

export const cancelSubscription = async (id: string): Promise<any> => {
  const res = await api.patch(`/subscriptions/${id}/cancel`);
  return res.data;
};