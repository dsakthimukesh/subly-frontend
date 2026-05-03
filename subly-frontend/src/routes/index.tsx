import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import SignupPage from "../components/Signup";
import ProtectedRoute from "./ProtectedRoutes";
import AppLayout from "../layouts/AppLayout";
import DashboardPage from "../pages/Dashboard";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
   {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
]);
