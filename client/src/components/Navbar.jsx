import {
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingBag,
  UtensilsCrossed,
  X,
} from "lucide-react";

import {
  useCart,
} from "../context/CartContext";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    cartCount,
    setCartOpen,
  } = useCart();

  const token =
    localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("user")
    );
  } catch {
    user = null;
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMenuOpen(false);

    navigate("/");
  };

  const closeMenu = () =>
    setMenuOpen(false);

  const dashboardPath =
    user?.role === "admin"
      ? "/admin"
      : "/dashboard";

  return (
    <header className="main-navbar">

      <div className="navbar-inner">

        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
        >

          <span className="brand-icon">
            <UtensilsCrossed size={20} />
          </span>

          <span>
            Food<span>Rush</span>
          </span>

        </Link>

        <nav
          className={
            menuOpen
              ? "nav-links nav-open"
              : "nav-links"
          }
        >

          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "active"
                : ""
            }
            onClick={closeMenu}
          >
            Home
          </Link>

          {token && user && (
            <Link
              to={dashboardPath}
              className={
                location.pathname ===
                dashboardPath
                  ? "active"
                  : ""
              }
              onClick={closeMenu}
            >
              {user.role === "admin"
                ? "Admin"
                : "Menu"}
            </Link>
          )}

          {!token ? (
            <div className="nav-auth">

              <Link
                to="/login"
                className="login-link"
                onClick={closeMenu}
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="nav-cta"
                onClick={closeMenu}
              >
                Get Started
              </Link>

            </div>
          ) : (
            <div className="nav-user-actions">

              <Link
                to={dashboardPath}
                className="dashboard-icon"
                onClick={closeMenu}
                title="Dashboard"
              >
                <LayoutDashboard
                  size={19}
                />
              </Link>

              {user?.role !== "admin" && (
                <button
                  className="cart-nav-btn"
                  onClick={() => {
                    setCartOpen(true);
                    closeMenu();
                  }}
                >
                  <ShoppingBag
                    size={19}
                  />

                  <span>Cart</span>

                  {cartCount > 0 && (
                    <strong>
                      {cartCount}
                    </strong>
                  )}
                </button>
              )}

              <button
                className="logout-btn"
                onClick={logout}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>

            </div>
          )}

        </nav>

        <button
          className="mobile-menu"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Open menu"
        >
          {menuOpen ? (
            <X />
          ) : (
            <Menu />
          )}
        </button>

      </div>

    </header>
  );
}

export default Navbar;