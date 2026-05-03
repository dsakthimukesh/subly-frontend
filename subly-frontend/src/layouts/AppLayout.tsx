import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { sidebarItems } from "../config/sidebar";

export default function AppLayout() {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main */}
            <div className="flex-1 flex flex-col">
                <div className="p-6 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="w-64 bg-white border-r border-gray-200 p-6">
            <h1 className="text-xl font-semibold">Subly</h1>
            <p className="text-sm text-gray-500 mb-6">TechCorp India</p>

            <nav className="space-y-2">
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
        </div>
    );
}