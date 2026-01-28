import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";

import "../styles/view_user.scss";

interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  organization: string;
  dateJoined: string;
  status: string;
  lastActive: string;
  profilePicture: string;
  education: string;
  experience: string;
  revenue: string;
  monthlyRevenue: string;
  loanRepayment: string;
}

export default function ViewUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("/data/data.json");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users: User[] = await response.json();

      // Find user by username (since the URL uses username as ID)
      const foundUser = users.find((u) => u.username === id) || null;

      // Add missing fields for display purposes
      if (foundUser) {
        const userWithDetails = {
          ...foundUser,
          lastActive: "2 hours ago",
          profilePicture: `https://picsum.photos/seed/${foundUser.username}/100/100.jpg`,
          education: "B.Sc Computer Science",
          experience: "5 years",
          revenue: "$45,000",
          monthlyRevenue: "$3,750",
          loanRepayment: "On time",
        };
        setUser(userWithDetails);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/users");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <main className="view-user">
      <div className="view-user__back" onClick={handleBack}>
        <FaArrowLeftLong />
        Back to users
      </div>

      <section className="view-user__header">
        <div>
          <h1>User Details</h1>
        </div>
        <div className="view-user__button-div">
          <button>BLACKLIST USER</button>
          <button>ACTIVATE USER</button>
        </div>
      </section>

      <section className="view-user__section">
        <div className="view-user__profile">
          <div className="view-user__profile-info">
            <div className="view-user__profile-info">
              <div className="view-user__avatar">
                <img src={user.profilePicture} alt={user.username} />
              </div>
              <div className="view-user__bank">
                <span>{user.username}</span>
                <div className="view-user__bank-info">
                  <span>{user.id}</span>
                </div>
              </div>
            </div>

            <div className="view-user__separator view-user__separator--vertical" />

            <div className="view-user__tier">
              <span>USER'S TIER</span>
              <div className="view-user__tier-stars">
                <span>⭐⭐⭐</span>
              </div>
            </div>

            <div className="view-user__separator view-user__separator--vertical" />

            <div className="view-user__bank">
              <span>{user.loanRepayment}</span>
              <div className="view-user__bank-info">
                <span>9912345678/Providus Bank</span>
              </div>
            </div>
          </div>

          <div className="view-user__tabs">
            <button
              className={`view-user__tab ${activeTab === "general" ? "view-user__tab--active" : ""}`}
              onClick={() => setActiveTab("general")}
            >
              General Details
            </button>
            <button
              className={`view-user__tab ${activeTab === "documents" ? "view-user__tab--active" : ""}`}
              onClick={() => setActiveTab("documents")}
            >
              Documents
            </button>
            <button
              className={`view-user__tab ${activeTab === "bank" ? "view-user__tab--active" : ""}`}
              onClick={() => setActiveTab("bank")}
            >
              Bank Details
            </button>
            <button
              className={`view-user__tab ${activeTab === "loans" ? "view-user__tab--active" : ""}`}
              onClick={() => setActiveTab("loans")}
            >
              Loans
            </button>
            <button
              className={`view-user__tab ${activeTab === "savings" ? "view-user__tab--active" : ""}`}
              onClick={() => setActiveTab("savings")}
            >
              Savings
            </button>
            <button
              className={`view-user__tab ${activeTab === "app" ? "view-user__tab--active" : ""}`}
              onClick={() => setActiveTab("app")}
            >
              App and System
            </button>
          </div>
        </div>
      </section>

      <section className="view-user__section view-user__section--white">
        <div className="view-user__tab-content">
          {activeTab === "general" && (
            <div>
              <div className="view-user__detail-section">
                <h3>Personal Information</h3>
                <div className="view-user__detail-section__content">
                  <div className="view-user__detail-row">
                    <span>Full Name</span>
                    <span>{user.username}</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Phone Number</span>
                    <span>{user.phone}</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Email Address</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>BVN</span>
                    <span>12345678901</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Gender</span>
                    <span>Male</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Marital Status</span>
                    <span>Single</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Children</span>
                    <span>None</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Type of Residence</span>
                    <span>Parent's Apartment</span>
                  </div>
                </div>
              </div>

              <div className="view-user__separator view-user__separator--horizontal" />

              <div className="view-user__detail-section">
                <h3>Education and Employment</h3>
                <div className="view-user__detail-section__content">
                  <div className="view-user__detail-row">
                    <span>Level of Education</span>
                    <span>{user.education}</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Employment Status</span>
                    <span>Employed</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Sector of Employment</span>
                    <span>Technology</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Duration of Employment</span>
                    <span>{user.experience}</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Office Email</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Monthly Income</span>
                    <span>{user.monthlyRevenue}</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Loan Repayment</span>
                    <span>{user.loanRepayment}</span>
                  </div>
                </div>
              </div>

              <div className="view-user__separator view-user__separator--horizontal" />

              <div className="view-user__detail-section">
                <h3>Socials</h3>
                <div className="view-user__detail-section__content">
                  <div className="view-user__detail-row">
                    <span>Twitter</span>
                    <span>@{user.username}</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Facebook</span>
                    <span>{user.username}</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Instagram</span>
                    <span>@{user.username}</span>
                  </div>
                </div>
              </div>

              <div className="view-user__separator view-user__separator--horizontal" />

              <div className="view-user__detail-section">
                <h3>Guarantor</h3>
                <div className="view-user__detail-section__content">
                  <div className="view-user__detail-row">
                    <span>Full Name</span>
                    <span>John Doe</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Phone Number</span>
                    <span>08012345678</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Email Address</span>
                    <span>johndoe@example.com</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Relationship</span>
                    <span>Brother</span>
                  </div>
                </div>
              </div>

              <div className="view-user__separator view-user__separator--horizontal" />

              <div className="view-user__detail-section">
                <div className="view-user__detail-section__content">
                  <div className="view-user__detail-row">
                    <span>Full Name</span>
                    <span>John Doe</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Phone Number</span>
                    <span>08012345678</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Email Address</span>
                    <span>johndoe@example.com</span>
                  </div>
                  <div className="view-user__detail-row">
                    <span>Relationship</span>
                    <span>Brother</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div>
              <h3>Documents</h3>
              <p>No documents available</p>
            </div>
          )}

          {activeTab === "bank" && (
            <div>
              <h3>Bank Details</h3>
              <p>No bank details available</p>
            </div>
          )}

          {activeTab === "loans" && (
            <div>
              <h3>Loans</h3>
              <p>No loan information available</p>
            </div>
          )}

          {activeTab === "savings" && (
            <div>
              <h3>Savings</h3>
              <p>No savings information available</p>
            </div>
          )}

          {activeTab === "app" && (
            <div>
              <h3>App and System</h3>
              <p>No app and system information available</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
