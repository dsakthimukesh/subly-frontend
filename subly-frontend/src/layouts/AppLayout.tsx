import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { sidebarItems } from "../config/sidebar";
import { useAuth } from "../context/AuthContext";

export default function AppLayout() {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Brand */}
            <div className="px-6 pt-6 pb-4">
                <h1 className="text-xl font-semibold">Subly</h1>
                <p className="text-sm text-gray-500">TechCorp India</p>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition text-sm
                                ${isActive
                                    ? "bg-blue-50 text-blue-600 font-medium"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </div>
                    );
                })}
            </nav>

            {/* Logout — pinned to bottom */}
            <div className="px-4 py-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}
