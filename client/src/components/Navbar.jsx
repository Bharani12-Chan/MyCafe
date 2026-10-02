import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingBag,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setOpen(false);
    navigate("/");
  };

  return (
    <header className="nav-wrapper">
      <nav className="navbar">

        <Link
          to="/"
          className="brand"
          onClick={() => setOpen(false)}
        >
          <span className="brand-icon">
            <ShoppingBag size={20} />
          </span>

          Food<span>Rush</span>
        </Link>

        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>

        <div className={`nav-menu ${open ? "show" : ""}`}>

          <Link
            to="/"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          {user?.role === "user" && (
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard size={17} />
              Dashboard
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard size={17} />
              Admin
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="nav-cta"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </>
          ) : (
            <button
              className="logout"
              onClick={logout}
            >
              <LogOut size={16} />
              Logout
            </button>
          )}

        </div>
      </nav>
    </header>
  );
}

export default Navbar;