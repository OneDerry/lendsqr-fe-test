import { useState } from "react";
import { useNavigate } from "react-router";

import loginLogo from "../../../../public/left_logo.svg";
import lendsqrLogo from "../../../../public/icons/union.svg";

import "../styles/login.scss";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login">
      <div className="login__mobileLogo">
        <span className="login__logoMark" aria-hidden>
          <img
            className="login__illustrationImg"
            src={lendsqrLogo}
            alt="lendsqr logo"
          />
        </span>
        <span>lendsqr</span>
      </div>
      <div className="login__left">
        <div className="login__logo" aria-label="lendsqr">
          <span className="login__logoMark" aria-hidden>
            <img
              className="login__illustrationImg"
              src={lendsqrLogo}
              alt="lendsqr logo"
            />
          </span>
          <span>lendsqr</span>
        </div>

        <div className="login__illustration">
          <img
            className="login__illustrationImg"
            src={loginLogo}
            alt="Login illustration"
          />
        </div>
      </div>

      <div className="login__right">
        <div className="login__panel">
          <h1 className="login__title">Welcome!</h1>
          <p className="login__subtitle">Enter details to login.</p>

          <form className="login__form" onSubmit={(e) => e.preventDefault()}>
            <input
              className="login__input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <div className="login__passwordWrap">
              <input
                className="login__input"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <button
                className="login__show"
                type="button"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>

            <a className="login__forgot" href="#">
              FORGOT PASSWORD?
            </a>

            <button
              className="login__submit"
              type="submit"
              onClick={() => navigate("/users")}
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
