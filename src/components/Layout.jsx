import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './SideBar';

const Layout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBar sidebarToggle={sidebarToggle} />
      
      {/* Main Content */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-[#0f1827]">
        {/* Navbar */}
        <NavBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout; 