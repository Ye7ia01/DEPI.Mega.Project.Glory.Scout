import React, { useState } from "react";
import { AuthenticatedNavBar } from "../AuthenticatedNavBar";
import { AuthenticatedSideBar } from "../AuthenticatedSideBar";
import { Outlet } from "react-router";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="d-flex flex-column">
      {/* Navbar */}
      <AuthenticatedNavBar  collapsed={collapsed} setCollapsed={setCollapsed}/>
      
      <div className="d-flex">
        {/* Sidebar */}
        <AuthenticatedSideBar />
        
        {/* Main Content */}
        <div className="flex-grow-1 p-4 ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Layout;
