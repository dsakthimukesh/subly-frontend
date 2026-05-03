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
