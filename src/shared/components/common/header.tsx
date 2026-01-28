import { useState } from "react";
import { useNavigate } from "react-router";
import { CiBellOn } from "react-icons/ci";
import { TiArrowSortedDown } from "react-icons/ti";
import { FiMenu } from "react-icons/fi";

import lendsqrLogo from "../../../../public/icons/union.svg";

import "./styles/header.scss";

export default function Header({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header__mobileToggle">
        <button className="header__hamburger" onClick={onToggleSidebar}>
          <FiMenu />
        </button>
      </div>

      <div className="header__logo" onClick={() => navigate("/login")}>
        <span className="header__logoIcon">
          <img
            className="login__illustrationImg"
            src={lendsqrLogo}
            alt="lendsqr logo"
          />
        </span>
        <span className="header__logoText">Lendsqr</span>
      </div>

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
            <CiBellOn />
          </span>
        </button>

        <div className="header__user">
          <img
            src="../../../../public/profilePic.svg"
            alt="User"
            className="header__userAvatar"
          />
          <div className="header__userDetails">
            <span className="header__userName">Adedeji</span>
            <button className="header__userToggle">
              <TiArrowSortedDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
