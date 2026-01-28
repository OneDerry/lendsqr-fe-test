import { useState } from "react";
import { useNavigate } from "react-router";
import "./styles/sidenav.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuUserRoundCog } from "react-icons/lu";

export default function Sidenav() {
  const [activeItem, setActiveItem] = useState("users");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const mainItem = [
    {
      id: "dashboard",
      icon: "/icons/home.svg",
      label: "Dashboard",
      path: "/dashboard",
    },
  ];

  const customerItems = [
    {
      id: "users",
      icon: "/icons/user-friends.svg",
      label: "Users",
      path: "/users",
    },
    {
      id: "guarantors",
      icon: "/icons/users.svg",
      label: "Guarantors",
      path: "/guarantors",
    },
    { id: "loans", icon: "/icons/sack.svg", label: "Loans", path: "/loans" },
    {
      id: "decision-models",
      icon: "/icons/handshake.svg",
      label: "Decision Models",
      path: "/decision-models",
    },
    {
      id: "savings",
      icon: "/icons/piggy.svg",
      label: "Savings",
      path: "/savings",
    },
    {
      id: "loan-requests",
      icon: "/icons/loan_products_icon.svg",
      label: "Loan Requests",
      path: "/loan-requests",
    },
    {
      id: "whitelist",
      icon: "/icons/user-check.svg",
      label: "Whitelist",
      path: "/whitelist",
    },
    {
      id: "karma",
      icon: "/icons/user-times.svg",
      label: "Karma",
      path: "/karma",
    },
  ];

  const organizationItems = [
    {
      id: "organization",
      icon: "/icons/briefcase.svg",
      label: "Organization",
      path: "/organization",
    },
    {
      id: "loan-products",
      icon: "/icons/loan_products_icon.svg",
      label: "Loan Products",
      path: "/loan-products",
    },
    {
      id: "savings-products",
      icon: "/icons/bank.svg",
      label: "Savings Products",
      path: "/savings-products",
    },
    {
      id: "fees-charges",
      icon: "/icons/coins.svg",
      label: "Fees and Charges",
      path: "/fees-charges",
    },
    {
      id: "transactions",
      icon: "/icons/transactions.svg",
      label: "Transactions",
      path: "/transactions",
    },
    {
      id: "services",
      icon: "/icons/galaxy.svg",
      label: "Services",
      path: "/services",
    },
    {
      id: "service-account",
      icon: "/icons/user-cog.svg",
      label: "Service Account",
      path: "/service-account",
    },
    {
      id: "settlements",
      icon: "/icons/scroll.svg",
      label: "Settlements",
      path: "/settlements",
    },
    {
      id: "reports",
      icon: "/icons/chart.svg",
      label: "Reports",
      path: "/reports",
    },
  ];

  const settingsItems = [
    {
      id: "preferences",
      icon: "/icons/sliders.svg",
      label: "Preferences",
      path: "/preferences",
    },
    {
      id: "fees-pricing",
      icon: "/icons/badge.svg",
      label: "Fees and Pricing",
      path: "/fees-pricing",
    },
    {
      id: "audit-logs",
      icon: "/icons/clipboard.svg",
      label: "Audit Logs",
      path: "/audit-logs",
    },
    {
      id: "systems-messages",
      icon: "/icons/system.svg",
      label: "Systems Messages",
      path: "/systems-messages",
    },
  ];

  const logoutItem = [
    {
      id: "Log out",
      icon: "/icons/logout.svg",
      label: "Log out",
      path: "/",
    },
  ];

  const handleNavigation = (item: { id: string; path: string }) => {
    setActiveItem(item.id);
    navigate(item.path);
  };

  return (
    <div className="sidenav">
      <nav className="sidenav__nav">
        <div className="sidenav__accordion">
          <button className="sidenav__item" onClick={() => setIsOpen(!isOpen)}>
            <img
              src="/icons/briefcase.svg"
              alt="Switch Organisation"
              className="sidenav__itemIcon"
            />
            <span className="sidenav__itemLabel">Switch Organisation</span>
            <span className="sidenav__accordionIcon">
              {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </span>
          </button>
          {isOpen && (
            <div className="sidenav__accordionContent">
              <div className="sidenav__accordionTextandIcon">
                <LuUserRoundCog />
                User Mode
              </div>
            </div>
          )}
        </div>
        <div>
          {mainItem.map((item) => (
            <button
              key={item.id}
              className={`sidenav__item ${activeItem === item.id ? "sidenav__item--active" : ""}`}
              onClick={() => handleNavigation(item)}
            >
              {item.icon.includes(".svg") ? (
                <img
                  src={item.icon}
                  alt={item.label}
                  className="sidenav__itemIcon"
                />
              ) : (
                <span className="sidenav__itemIcon">{item.icon}</span>
              )}
              <span className="sidenav__itemLabel">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="sidenav__section">
          <div className="sidenav__sectionTitle">CUSTOMERS</div>
          {customerItems.map((item) => (
            <button
              key={item.id}
              className={`sidenav__item ${activeItem === item.id ? "sidenav__item--active" : ""}`}
              onClick={() => handleNavigation(item)}
            >
              {item.icon.includes(".svg") ? (
                <img
                  src={item.icon}
                  alt={item.label}
                  className="sidenav__itemIcon"
                />
              ) : (
                <span className="sidenav__itemIcon">{item.icon}</span>
              )}
              <span className="sidenav__itemLabel">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="sidenav__section">
          <div className="sidenav__sectionTitle">BUSINESSES</div>
          {organizationItems.map((item) => (
            <button
              key={item.id}
              className={`sidenav__item ${activeItem === item.id ? "sidenav__item--active" : ""}`}
              onClick={() => handleNavigation(item)}
            >
              {item.icon.includes(".svg") ? (
                <img
                  src={item.icon}
                  alt={item.label}
                  className="sidenav__itemIcon"
                />
              ) : (
                <span className="sidenav__itemIcon">{item.icon}</span>
              )}
              <span className="sidenav__itemLabel">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="sidenav__section">
          <div className="sidenav__sectionTitle">SETTINGS</div>
          {settingsItems.map((item) => (
            <button
              key={item.id}
              className={`sidenav__item ${activeItem === item.id ? "sidenav__item--active" : ""}`}
              onClick={() => handleNavigation(item)}
            >
              {item.icon.includes(".svg") ? (
                <img
                  src={item.icon}
                  alt={item.label}
                  className="sidenav__itemIcon"
                />
              ) : (
                <span className="sidenav__itemIcon">{item.icon}</span>
              )}
              <span className="sidenav__itemLabel">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="view-user__separator view-user__separator--horizontal" />

        <div>
          {logoutItem.map((item) => (
            <button
              key={item.id}
              className={`sidenav__item ${activeItem === item.id ? "sidenav__item--active" : ""}`}
              onClick={() => navigate("/login")}
            >
              {item.icon.includes(".svg") ? (
                <img
                  src={item.icon}
                  alt={item.label}
                  className="sidenav__itemIcon"
                />
              ) : (
                <span className="sidenav__itemIcon">{item.icon}</span>
              )}
              <span className="sidenav__itemLabel">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
