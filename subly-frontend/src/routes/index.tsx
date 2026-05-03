import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import SignupPage from "../components/Signup";
import ProtectedRoute from "./ProtectedRoutes";
import AppLayout from "../layouts/AppLayout";
import DashboardPage from "../pages/Dashboard";
import CustomersPage from "../pages/CustomersPage";
import PlansPage from "../pages/PlansPage";
import SubscriptionsPage from "../pages/SubscriptionsPage";
import InvoicesPage from "../pages/InvoicesPage";
import SettingsPage from "../pages/SettingsPage";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <SignupPage /> },
  {
    path: "/dashboard",
    element: (<ProtectedRoute><AppLayout /></ProtectedRoute>),
    children: [{ index: true, element: <DashboardPage /> }],
  },
  {
    path: "/customers",
    element: (<ProtectedRoute><AppLayout /></ProtectedRoute>),
    children: [{ index: true, element: <CustomersPage /> }],
  },
  {
    path: "/plans",
    element: (<ProtectedRoute><AppLayout /></ProtectedRoute>),
    children: [{ index: true, element: <PlansPage /> }],
  },
  {
    path: "/subscriptions",
    element: (<ProtectedRoute><AppLayout /></ProtectedRoute>),
    children: [{ index: true, element: <SubscriptionsPage /> }],
  },
  {
    path: "/invoices",
    element: (<ProtectedRoute><AppLayout /></ProtectedRoute>),
    children: [{ index: true, element: <InvoicesPage /> }],
  },
  {
    path: "/settings",
    element: (<ProtectedRoute><AppLayout /></ProtectedRoute>),
    children: [{ index: true, element: <SettingsPage /> }],
  },
]);
