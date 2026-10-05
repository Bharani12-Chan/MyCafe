import {
  Menu,
  ShoppingBag,
  UserRound,
  X,
  LogOut,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const { cartCount, setCartOpen } =
    useCart();

  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMobileOpen(false);

    navigate("/");
  };

  const dashboardPath =
    user?.role === "admin"
      ? "/admin"
      : "/dashboard";

  return (
    <header className="luxury-navbar">

      <Link
        to="/"
        className="luxury-brand"
      >
        FOODRUSH
      </Link>

      <button
        className="luxury-mobile-toggle"
        onClick={() =>
          setMobileOpen(!mobileOpen)
        }
        aria-label="Open navigation"
      >
        {mobileOpen ? <X /> : <Menu />}
      </button>


      <nav
        className={
          mobileOpen
            ? "luxury-nav-links open"
            : "luxury-nav-links"
        }
      >

        <Link
          to="/"
          onClick={() =>
            setMobileOpen(false)
          }
        >
          HOME
        </Link>

        <a
          href="#about"
          onClick={() =>
            setMobileOpen(false)
          }
        >
          ABOUT
        </a>

        <Link
          to={
            token
              ? dashboardPath
              : "/login"
          }
          onClick={() =>
            setMobileOpen(false)
          }
        >
          MENU
        </Link>

        <a
          href="#experience"
          onClick={() =>
            setMobileOpen(false)
          }
        >
          EXPERIENCE
        </a>

        <a
          href="#contact"
          onClick={() =>
            setMobileOpen(false)
          }
        >
          CONTACT
        </a>

      </nav>


      <div className="luxury-nav-actions">

        {token && user ? (
          <>
            {user.role !== "admin" && (
              <button
                className="luxury-cart-icon"
                onClick={() =>
                  setCartOpen(true)
                }
                aria-label="Open cart"
              >
                <ShoppingBag size={17} />

                {cartCount > 0 && (
                  <span>
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            <Link
              className="luxury-user-icon"
              to={dashboardPath}
              aria-label="Dashboard"
            >
              <UserRound size={17} />
            </Link>

            <button
              className="luxury-logout"
              onClick={logout}
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>
          </>
        ) : (
          <Link
            className="luxury-order-button"
            to="/register"
          >
            ORDER NOW
          </Link>
        )}

      </div>

    </header>
  );
}

export default Navbar;