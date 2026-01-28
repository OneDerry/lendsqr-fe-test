import { useNavigate } from "react-router";
import { FaHome } from "react-icons/fa";

import "./styles/not_found.scss";
import lendsqrLogo from "/icons/union.svg?url";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found">
      <div className="not-found__container">
        <div className="not-found__logo">
          <span className="not-found__logoMark">
            <img src={lendsqrLogo} alt="lendsqr logo" />
          </span>
          <span>lendsqr</span>
        </div>

        <div className="not-found__content">
          <div className="not-found__illustration">
            <div className="not-found__code">404</div>
            <div className="not-found__circles">
              <div className="not-found__circle not-found__circle--1"></div>
              <div className="not-found__circle not-found__circle--2"></div>
              <div className="not-found__circle not-found__circle--3"></div>
            </div>
          </div>

          <h1 className="not-found__title">Page Not Found</h1>
          <p className="not-found__subtitle">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <button className="not-found__button" onClick={handleGoHome}>
            <FaHome />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
