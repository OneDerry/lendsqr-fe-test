import { useState, useEffect, useRef } from "react";
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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
        setActiveFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
      setFilteredUsers(data);
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
      setFilteredUsers([
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
  const [dropdownDirection, setDropdownDirection] = useState<{
    [key: string]: "up" | "down";
  }>({});
  const [dropdownPosition, setDropdownPosition] = useState<{
    [key: string]: { top: number; left: number; useFixed: boolean };
  }>({});
  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    phone: "",
    date: "",
    status: "",
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const toggleDropdown = (userId: string, event: React.MouseEvent) => {
    if (activeDropdown === userId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(userId);
      setActiveFilter(null);

      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const dropdownHeight = 200;
      const dropdownWidth = 160;

      const tableContainer = document.querySelector(".users__tableContainer");
      const containerRect = tableContainer?.getBoundingClientRect();

      let useFixed = false;
      let top = rect.bottom + window.scrollY;
      let left = rect.right + window.scrollX - dropdownWidth;
      let direction: "up" | "down" = "down";

      if (containerRect) {
        const spaceBelowInContainer = containerRect.bottom - rect.bottom;
        const spaceAboveInContainer = rect.top - containerRect.top;

        if (
          spaceBelowInContainer < dropdownHeight &&
          spaceAboveInContainer > dropdownHeight
        ) {
          direction = "up";
          top = rect.top + window.scrollY - dropdownHeight;
        }

        if (
          (direction === "down" && spaceBelowInContainer < dropdownHeight) ||
          (direction === "up" && spaceAboveInContainer < dropdownHeight)
        ) {
          useFixed = true;

          const spaceBelowViewport = window.innerHeight - rect.bottom;
          const spaceAboveViewport = rect.top;

          if (
            spaceBelowViewport < dropdownHeight &&
            spaceAboveViewport > dropdownHeight
          ) {
            direction = "up";
            top = rect.top - dropdownHeight;
          } else {
            top = rect.bottom;
          }

          left = rect.right - dropdownWidth;
        }
      }

      setDropdownDirection((prev) => ({ ...prev, [userId]: direction }));
      setDropdownPosition((prev) => ({
        ...prev,
        [userId]: { top, left, useFixed },
      }));
    }
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
    let filtered = [...users];

    if (filters.organization) {
      filtered = filtered.filter((user) =>
        user.organization
          .toLowerCase()
          .includes(filters.organization.toLowerCase()),
      );
    }

    if (filters.username) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(filters.username.toLowerCase()),
      );
    }

    if (filters.email) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(filters.email.toLowerCase()),
      );
    }

    if (filters.phone) {
      filtered = filtered.filter((user) => user.phone.includes(filters.phone));
    }

    if (filters.date) {
      filtered = filtered.filter((user) =>
        user.dateJoined.includes(filters.date),
      );
    }

    if (filters.status) {
      filtered = filtered.filter(
        (user) => user.status.toLowerCase() === filters.status.toLowerCase(),
      );
    }

    setFilteredUsers(filtered);
    setActiveFilter(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [filters]);

  useEffect(() => {
    const hasActiveFilters = Object.values(debouncedFilters).some(
      (value) => value !== "",
    );

    if (hasActiveFilters) {
      applyFilters();
    } else {
      setFilteredUsers(users);
    }
  }, [debouncedFilters, users]);

  const resetFilters = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      phone: "",
      date: "",
      status: "",
    });
    setDebouncedFilters({
      organization: "",
      username: "",
      email: "",
      phone: "",
      date: "",
      status: "",
    });
    setFilteredUsers(users);
    setActiveFilter(null);
  };

  // Get unique organizations for filter dropdown
  const getUniqueOrganizations = () => {
    const orgs = [...new Set(users.map((user) => user.organization))];
    return orgs.sort();
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
            onClick={(e) => toggleDropdown(row.username, e)}
          >
            <IoEllipsisVertical />
          </button>
          {activeDropdown === row.username && (
            <div
              className={`users__dropdown ${
                dropdownDirection[row.username] === "up"
                  ? "users__dropdown--up"
                  : ""
              } ${
                dropdownPosition[row.username]?.useFixed
                  ? "users__dropdown--breakout"
                  : ""
              }`}
              style={
                dropdownPosition[row.username]?.useFixed
                  ? {
                      top: `${dropdownPosition[row.username].top}px`,
                      left: `${dropdownPosition[row.username].left}px`,
                    }
                  : undefined
              }
            >
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
    <div className="users" ref={dropdownRef}>
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
          <>
            {filteredUsers.length === 0 ? (
              <div className="users__noRecords">
                <div className="users__noRecordsContent">
                  <h3>No Records Found</h3>
                  <p>No users match your current filter criteria.</p>
                  <button onClick={resetFilters} className="users__resetBtn">
                    Reset Filters
                  </button>
                </div>
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={filteredUsers}
                customStyles={customStyles}
                pagination
                persistTableHead
              />
            )}
          </>
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
                value={filters.organization}
                onChange={(e) =>
                  handleFilterChange("organization", e.target.value)
                }
              >
                <option value="">Select</option>
                {getUniqueOrganizations().map((org) => (
                  <option key={org} value={org}>
                    {org}
                  </option>
                ))}
              </select>
            </div>

            <div className="users__filterField">
              <label>Username</label>
              <input
                type="text"
                placeholder="User"
                value={filters.username}
                onChange={(e) => handleFilterChange("username", e.target.value)}
              />
            </div>
            <div className="users__filterField">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={filters.email}
                onChange={(e) => handleFilterChange("email", e.target.value)}
              />
            </div>
            <div className="users__filterField">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Phone Number"
                value={filters.phone}
                onChange={(e) => handleFilterChange("phone", e.target.value)}
              />
            </div>
            <div className="users__filterField">
              <label>Date Joined</label>
              <input
                type="date"
                value={filters.date}
                placeholder="Date"
                onChange={(e) => handleFilterChange("date", e.target.value)}
              />
            </div>
            <div className="users__filterField">
              <label>Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">Select</option>
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
