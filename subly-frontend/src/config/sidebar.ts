import {
  LayoutDashboard,
  Package,
  Users,
  RefreshCcw,
  FileText,
  Settings,
} from "lucide-react";

export const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Plans", icon: Package, path: "/plans" },
  { label: "Customers", icon: Users, path: "/customers" },
  { label: "Subscriptions", icon: RefreshCcw, path: "/subscriptions" },
  { label: "Invoices", icon: FileText, path: "/invoices" },
  { label: "Settings", icon: Settings, path: "/settings" },
];