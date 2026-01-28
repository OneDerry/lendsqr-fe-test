import { useState } from "react";
import { Outlet } from "react-router";
import "./styles/rootlayout.scss";

import Sidenav from "../common/sidenav";
import Header from "../common/header";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="root-layout">
      <div
        className={`root-layout__sidenav ${isSidebarOpen ? "root-layout__sidenav--open" : ""}`}
      >
        <Sidenav />
      </div>
      <div className="root-layout__main">
        <div className="root-layout__header">
          <Header onToggleSidebar={toggleSidebar} />
        </div>
        <main className="root-layout__content">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div className="root-layout__overlay" onClick={toggleSidebar} />
      )}
    </div>
  );
};

export default RootLayout;
