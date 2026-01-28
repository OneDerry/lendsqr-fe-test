import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { LuEye } from "react-icons/lu";
import { IoFilterSharp, IoEllipsisVertical } from "react-icons/io5";

import "../styles/users.scss";

import DataTable from "react-data-table-component";
import UserStats from "./user_stats";

interface User {
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: string;
}

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/data/data.json");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Using fallback data.");

      setUsers([
        {
          organization: "Lendsqr",
          username: "Adedeji",
          email: "adedeji@lendsqr.com",
          phone: "08078903721",
          dateJoined: "Aug 1, 2022",
          status: "Inactive",
        },
        {
          organization: "Irorun",
          username: "Deborah",
          email: "deborah@irorun.com",
          phone: "08078903721",
          dateJoined: "Aug 1, 2022",
          status: "Pending",
        },
        {
          organization: "Lendsqr",
          username: "Olaoluwa",
          email: "olaoluwa@lendsqr.com",
          phone: "08078903721",
          dateJoined: "Aug 1, 2022",
          status: "Active",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    phone: "",
    date: "",
    status: "",
  });

  const toggleDropdown = (userId: string) => {
    setActiveDropdown(activeDropdown === userId ? null : userId);
    setActiveFilter(null);
  };

  const toggleFilter = (filterType: string, event: React.MouseEvent) => {
    if (activeFilter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterType);
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      setFilterPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setActiveDropdown(null);
  };

  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });

  const handleAction = (action: string, user: User) => {
    if (action === "View Details") {
      navigate(`/users/${user.username}`);
    } else {
      console.log(`${action} clicked for user:`, user.username);
    }
    setActiveDropdown(null);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    setActiveFilter(null);
  };

  const resetFilters = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      phone: "",
      date: "",
      status: "",
    });
    setActiveFilter(null);
  };

  const columns = [
    {
      name: (
        <div className="users__filterContainer">
          <div className="users__tableHeader">
            <span>ORGANIZATION</span>
            <IoFilterSharp onClick={(e) => toggleFilter("organization", e)} />
          </div>
        </div>
      ),
      selector: (row: User) => row.organization,
      sortable: false,
      cell: (row: User) => (
        <div>
          <span>{row.organization}</span>
        </div>
      ),
    },
    {
      name: (
        <div className="users__filterContainer">
          <div className="users__tableHeader">
            <span>USERNAME</span>
            <IoFilterSharp onClick={(e) => toggleFilter("username", e)} />
          </div>
        </div>
      ),
      selector: (row: User) => row.username,
      sortable: false,
    },
    {
      name: (
        <div className="users__filterContainer">
          <div className="users__tableHeader">
            <span>EMAIL</span>
            <IoFilterSharp onClick={(e) => toggleFilter("email", e)} />
          </div>
        </div>
      ),
      selector: (row: User) => row.email,
      sortable: false,
    },
    {
      name: (
        <div className="users__filterContainer">
          <div className="users__tableHeader">
            <span>PHONE NUMBER</span>
            <IoFilterSharp onClick={(e) => toggleFilter("phone", e)} />
          </div>
        </div>
      ),
      selector: (row: User) => row.phone,
      sortable: false,
    },
    {
      name: (
        <div className="users__filterContainer">
          <div className="users__tableHeader">
            <span>DATE JOINED</span>
            <IoFilterSharp onClick={(e) => toggleFilter("date", e)} />
          </div>
        </div>
      ),
      selector: (row: User) => row.dateJoined,
      sortable: false,
    },
    {
      name: (
        <div className="users__filterContainer">
          <div className="users__tableHeader">
            <span>STATUS</span>
            <IoFilterSharp onClick={(e) => toggleFilter("status", e)} />
          </div>
        </div>
      ),
      selector: (row: User) => row.status,
      sortable: false,
      cell: (row: User) => (
        <span
          className={`users__status users__status--${row.status.toLowerCase()}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      sortable: false,
      cell: (row: User) => (
        <div className="users__dropdownContainer">
          <button
            className="users__actionBtn"
            onClick={() => toggleDropdown(row.username)}
          >
            <IoEllipsisVertical />
          </button>
          {activeDropdown === row.username && (
            <div className="users__dropdown">
              <button onClick={() => handleAction("View Details", row)}>
                <LuEye />
                View Details
              </button>
              <button onClick={() => handleAction("Blacklist User", row)}>
                <img src="/icons/blacklist_user.svg" alt="Blacklist" />
                Blacklist User
              </button>
              <button onClick={() => handleAction("Activate User", row)}>
                <img src="/icons/activate_user.svg" alt="Activate" />
                Activate User
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: "transparent",
      },
    },
    headRow: {
      style: {
        backgroundColor: "transparent",
        borderBottom: "1px solid #e5e7eb",
      },
    },
    headCells: {
      style: {
        fontSize: "12px",
        fontWeight: "600",
        color: "#545f7d",
        textTransform: "uppercase",
        padding: "12px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        color: "#545f7d",
        padding: "16px 12px",
        borderBottom: "1px solid #f5f5f5",
      },
    },
    rows: {
      style: {
        "&:hover": {
          backgroundColor: "#f9fafb",
        },
      },
    },
  };

  return (
    <div className="users">
      <div className="users__header">
        <h1>Users</h1>
      </div>

      <UserStats />

      <div className="users__tableContainer">
        {loading && (
          <div className="users__loading">
            <div className="users__spinner"></div>
            <p>Loading users...</p>
          </div>
        )}

        {error && (
          <div className="users__error">
            <p>{error}</p>
            <button onClick={fetchUsers} className="users__retryBtn">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <DataTable
            columns={columns}
            data={users}
            customStyles={customStyles}
            pagination
            persistTableHead
          />
        )}
      </div>

      {activeFilter && (
        <div
          className="users__filterDropdown"
          style={{ top: filterPosition.top, left: filterPosition.left }}
        >
          <div className="users__filterFields">
            <div className="users__filterField">
              <label>Organization</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
                <option value="Blacklisted">Blacklisted</option>
              </select>
            </div>

            <div className="users__filterField">
              <label>Username</label>
              <input
                type="text"
                placeholder="user"
                value={filters.username}
                onChange={(e) => handleFilterChange("username", e.target.value)}
              />
            </div>
            <div className="users__filterField">
              <label>Email</label>
              <input
                type="email"
                placeholder="email"
                value={filters.email}
                onChange={(e) => handleFilterChange("email", e.target.value)}
              />
            </div>
            <div className="users__filterField">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="phone"
                value={filters.phone}
                onChange={(e) => handleFilterChange("phone", e.target.value)}
              />
            </div>
            <div className="users__filterField">
              <label>Date Joined</label>
              <input
                type="date"
                value={filters.date}
                placeholder="date"
                onChange={(e) => handleFilterChange("date", e.target.value)}
              />
            </div>
            <div className="users__filterField">
              <label>Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
                <option value="Blacklisted">Blacklisted</option>
              </select>
            </div>
          </div>
          <div className="users__filterActions">
            <button
              className="users__filterBtn users__filterBtn--reset"
              onClick={resetFilters}
            >
              Reset
            </button>
            <button
              className="users__filterBtn users__filterBtn--apply"
              onClick={applyFilters}
            >
              Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
