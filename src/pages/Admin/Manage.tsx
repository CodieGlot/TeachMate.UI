import React, { useRef, useState } from "react";
import { AdminDashboard } from "./AdminDashboard";
import { ManageAccount } from "./ManageAccount";

export function Manage() {

  const sidebarRef = useRef<HTMLDivElement>(null); // Specify HTMLDivElement type
  const mainContentRef = useRef<HTMLDivElement>(null); // Specify HTMLDivElement type
  const [selectedTab, setSelectedTab] = useState<string>('dashboard');
  
  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>, tab: string) => {
    highlightSidebarItem(e.currentTarget);
    setSelectedTab(tab);
  };

  const expandSidebar = () => {
    const sidebar = sidebarRef.current;
    const mainContent = mainContentRef.current;

    if (sidebar && mainContent) {
      if (sidebar.style.width === "16rem") {
        sidebar.style.width = "4rem";
        mainContent.style.marginLeft = "4rem";
        sidebar.classList.remove("text-left", "px-6");
        sidebar.classList.add("text-center", "px-0");
      } else {
        sidebar.style.width = "16rem";
        mainContent.style.marginLeft = "16rem";
        sidebar.classList.add("text-left", "px-6");
        sidebar.classList.remove("text-center", "px-0");
      }

      const labels = sidebar.querySelectorAll("span");
      labels.forEach((label) => label.classList.toggle("opacity-0"));
    }
  };

  const highlightSidebarItem = (element: HTMLButtonElement) => {
    const buttons = sidebarRef.current?.querySelectorAll("button");
    if (buttons) {
      buttons.forEach((btn) => {
        btn.classList.remove("bg-gradient-to-r", "from-cyan-400", "to-cyan-500", "text-white", "w-48", "ml-0");
        const icon = btn.querySelector("i");
        if (icon) {
          icon.classList.remove("text-white");
        }
      });
    }
    element.classList.add("bg-gradient-to-r", "from-cyan-400", "to-cyan-500", "w-56", "h-10", "ml-0");
    const icon = element.querySelector("i");
    if (icon) {
      icon.classList.add("text-white");
    }
  };

  return (
    <body>
      <nav className="bg-white border-b border-gray-300">
        <div className="flex justify-between items-center px-6">
          {/* Icon Menu */}
          <button id="menu-button" onClick={expandSidebar}>
            <i className="fas fa-bars text-cyan-500 text-lg"></i>
          </button>
          {/* Logo */}
          <div className="gradient-to-r to-indigo-600 from-sky-400">
            <img src="src/assets/Group.svg" alt="logo" className="h-12 w-20" style={{ margin: '10px' }}/>
          </div>
          {/* Notfication */}
          <div className="space-x-4">
            <button>
              <i className="fas fa-bell text-cyan-500 text-lg"></i>
            </button>
            {/* Profile */}
            <button>
              <i className="fas fa-user text-cyan-500 text-lg"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu */}
      <div ref={sidebarRef} className="w-28 bg-white h-screen fixed rounded-none border-none transition-all duration-200 ease-in-out overflow-hidden">
        {/* Items */}
        <div className="p-2 space-y-4">
          {/* Dashboard */}
          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={(e) => handleTabClick(e, 'dashboard')}

          >
            <i className="fas fa-home text-lg"></i>
            <span className="font-medium transition-all duration-200 opacity-0">Dashboard</span>
          </button>

          {/* Manage Account */}
          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={(e) => handleTabClick(e, 'account')}
          >
            <i className="fas fa-users"></i>
            <span className="font-medium transition-all duration-200 opacity-0">Manage Account</span>
          </button>

          {/* Manage Revenue */}
          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={(e) => highlightSidebarItem(e.currentTarget)}
          >
            <i className="fas fa-money-check-alt"></i>
            <span className="font-medium transition-all duration-200 opacity-0">Manage Revenue</span>
          </button>

          {/* System Activities */}
          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={(e) => highlightSidebarItem(e.currentTarget)}
          >
            <i className="fas fa-cogs"></i>
            <span className="font-medium transition-all duration-200 opacity-0">System Activities</span>
          </button>

          {/* Notifications */}
          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={(e) => highlightSidebarItem(e.currentTarget)}
          >
            <i className="fas fa-bell"></i>
            <span className="font-medium transition-all duration-200 opacity-0">Notifications</span>
          </button>

          {/* Reported System Issues */}
          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={(e) => highlightSidebarItem(e.currentTarget)}
          >
            <i className="fas fa-exclamation-triangle"></i>
            <span className="font-medium transition-all duration-200 opacity-0">Reported System</span>
          </button>

          {/* Reported User Issues */}
          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={(e) => highlightSidebarItem(e.currentTarget)}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span className="font-medium transition-all duration-200 opacity-0">Reported User</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div ref={mainContentRef} className="ml-16 bg-gray-100 h-screen fixed w-full  transition-all duration-200 ease-in-out">
        {selectedTab === 'dashboard' && (
          <AdminDashboard />
        )}
        {selectedTab === 'account' && (
          <ManageAccount />
        )}

      </div>
    </body>
  );

}