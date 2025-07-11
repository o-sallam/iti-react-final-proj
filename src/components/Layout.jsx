import React, { useState } from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';

const Layout = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBar sidebarToggle={sidebarToggle} />
      
      {/* Main Content */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Navbar */}
        <NavBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 