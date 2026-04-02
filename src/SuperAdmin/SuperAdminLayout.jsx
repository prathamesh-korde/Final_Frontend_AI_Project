import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "./Component/SuperAdminSidebar";
import SuperAdminHeader from "./Component/SuperAdminHeader";

const SuperAdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="h-screen w-full flex relative overflow-hidden bg-[#F8F9FE]">
            <SuperAdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

            <div className="hidden lg:block w-[268px] flex-shrink-0" />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <SuperAdminHeader onMenuToggle={toggleSidebar} />

                <main className="p-0 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout;