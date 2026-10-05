import {
  ArrowRight,
  ChefHat,
  Leaf,
  Play,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

import "./Hero.css";


function Hero() {
  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") ||
    "null"
  );


  const openMenu = () => {
    if (!token || !user) {
      navigate("/login");
      return;
    }

    navigate(
      user.role === "admin"
        ? "/admin"
        : "/dashboard"
    );
  };


  const startOrder = () => {
    if (!token) {
      navigate("/register");
      return;
    }

    openMenu();
  };


  return (
    <section className="cinematic-home">

      <div className="cinematic-background" />

      <div className="cinematic-overlay" />


      <div className="luxury-frame">

        <Navbar />


        <div className="luxury-hero-main">

          <div className="luxury-hero-copy">

            <div className="luxury-eyebrow">
              PREMIUM FOOD • DELIVERED FRESH
            </div>

            <h1>
              Savor Every
              <br />

              <em>
                Delicious Moment
              </em>
            </h1>

            <p>
              Discover carefully prepared
              favourites, fresh ingredients
              and bold flavours — delivered
              straight to your door.
            </p>


            <div className="luxury-hero-actions">

              <button
                className="gold-menu-btn"
                onClick={openMenu}
              >
                VIEW MENU

                <ArrowRight
                  size={14}
                />
              </button>


              <button
                className="story-button"
                onClick={startOrder}
              >
                START ORDERING

                <span>
                  <Play
                    size={11}
                    fill="currentColor"
                  />
                </span>
              </button>

            </div>

          </div>


          <div className="hero-food-focus">

            <div className="hero-food-glow" />

            <div className="hero-food-label">

              <span>
                CHEF'S PICK
              </span>

              <strong>
                Made for the
                <br />
                perfect craving.
              </strong>

            </div>

          </div>

        </div>


        <div className="luxury-benefits">

          <div className="luxury-benefit">

            <div className="benefit-icon">
              <Leaf size={24} />
            </div>

            <div>
              <strong>
                FRESHLY PREPARED
              </strong>

              <p>
                Fresh ingredients and
                flavour in every order.
              </p>
            </div>

          </div>


          <div className="luxury-benefit">

            <div className="benefit-icon">
              <ChefHat size={25} />
            </div>

            <div>
              <strong>
                MADE WITH CARE
              </strong>

              <p>
                Carefully selected dishes
                made to satisfy.
              </p>
            </div>

          </div>


          <div className="luxury-benefit">

            <div className="benefit-icon">
              <Truck size={25} />
            </div>

            <div>
              <strong>
                FAST DELIVERY
              </strong>

              <p>
                Your favourites delivered
                while they are fresh.
              </p>
            </div>

          </div>

        </div>

      </div>


      <div className="outside-food-note">

        <Sparkles size={13} />

        FOODRUSH EXPERIENCE

      </div>


      <div className="outside-order-note">

        <ShoppingBag size={14} />

        MADE TO CRAVE

      </div>

    </section>
  );
}

export default Hero;