import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { TiArrowSortedDown } from "react-icons/ti";
import { FiMenu } from "react-icons/fi";

import lendsqrLogo from "/icons/union.svg?url";
import notification from "/icons/notification.svg?url";

import "./styles/header.scss";
import "../../../domain/auth/styles/login.scss";

export default function Header({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignout = () => {
    setShowSignoutModal(true);
    setShowUserDropdown(false);
  };

  const confirmSignout = () => {
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="header__mobileToggle">
        <span>
          <button className="header__hamburger" onClick={onToggleSidebar}>
            <FiMenu />
          </button>
          <span className="header__hamburgerLogoIcon">
            <img
              className="login__hamburgerIllustrationImg"
              src={lendsqrLogo}
              alt="lendsqr logo"
            />
          </span>
        </span>
      </div>

      <div className="header__logo">
        <span className="header__logoIcon">
          <img
            className="login__illustrationImg"
            src={lendsqrLogo}
            alt="lendsqr logo"
          />
        </span>
        <span className="header__logoText">Lendsqr</span>
      </div>

      <div className="header__searchActions">
        <div className="header__search">
          <input
            type="text"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="header__searchInput"
          />
          <button className="header__searchBtn">🔍</button>
        </div>

        <div className="header__actions">
          <button className="header__link">Docs</button>

          <button className="header__bell">
            <span className="header__bellIcon">
              <img
                className="__illustrationImg"
                src={notification}
                alt="lendsqr logo"
              />
            </span>
          </button>

          <div
            className="header__user"
            ref={dropdownRef}
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <img
              src="/profile_pic.svg"
              alt="User"
              className="header__userAvatar"
            />
            <div className="header__userDetails">
              <span className="header__userName">Adedeji</span>
              <button className="header__userToggle">
                <TiArrowSortedDown />
              </button>
            </div>
            {showUserDropdown && (
              <div className="header__userDropdown">
                <button onClick={handleSignout}>Sign Out</button>
              </div>
            )}
          </div>
        </div>

        {showSignoutModal && (
          <div className="signoutModal">
            <div
              className="signoutModal__overlay"
              onClick={() => setShowSignoutModal(false)}
            />
            <div className="signoutModal__content">
              <h2>Sign Out</h2>
              <p>Are you sure you want to sign out?</p>
              <div className="signoutModal__actions">
                <button
                  className="signoutModal__btn signoutModal__btn--cancel"
                  onClick={() => setShowSignoutModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="signoutModal__btn signoutModal__btn--confirm"
                  onClick={confirmSignout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
