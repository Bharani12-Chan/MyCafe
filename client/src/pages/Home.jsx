import {
  ArrowRight,
  Bike,
  Leaf,
  ShieldCheck,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import "./Home.css";

const foods = [
  {
    title: "Craft Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Italian Pizza",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Healthy Bowls",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80",
  },
];

function Home() {
  return (
    <>
      <Navbar />

      <main>

        <section className="hero">

          <div className="hero-text">

            <div className="hero-badge">
              <Star size={15} fill="currentColor" />
              Loved by food lovers
            </div>

            <h1>
              Great food.
              <br />
              <span>Delivered fresh.</span>
            </h1>

            <p>
              Discover delicious meals, exciting new
              dishes and fresh flavours prepared for
              every craving.
            </p>

            <div className="hero-buttons">
              <Link
                to="/register"
                className="hero-primary"
              >
                Explore Menu
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="hero-secondary"
              >
                Sign In
              </Link>
            </div>

            <div className="mini-features">
              <span>
                <Bike />
                Fast Delivery
              </span>

              <span>
                <Leaf />
                Fresh Food
              </span>

              <span>
                <ShieldCheck />
                Secure
              </span>
            </div>

          </div>

          <div className="hero-image">

            <div className="orange-shape"></div>

            <img
              src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1000&q=85"
              alt="Fresh delicious food"
            />

            <div className="hero-floating">
              <span>🔥</span>

              <div>
                <small>Trending today</small>
                <strong>Fresh & Tasty</strong>
              </div>
            </div>

          </div>

        </section>


        <section className="popular">

          <div className="popular-title">
            <div>
              <span className="section-label">
                POPULAR CHOICES
              </span>

              <h2>
                Made for every craving.
              </h2>
            </div>

            <p>
              From comfort food to healthy favourites,
              discover something you'll love.
            </p>
          </div>

          <div className="home-food-grid">

            {foods.map((food) => (
              <div
                className="home-food"
                key={food.title}
              >
                <img
                  src={food.image}
                  alt={food.title}
                />

                <div>
                  <h3>{food.title}</h3>
                  <span>Discover →</span>
                </div>
              </div>
            ))}

          </div>

        </section>


        <section className="home-cta">

          <div>
            <span>YOUR NEXT MEAL AWAITS</span>

            <h2>
              Hungry for something amazing?
            </h2>

            <p>
              Create your account and discover
              our latest food additions.
            </p>
          </div>

          <Link to="/register">
            Start Exploring
            <ArrowRight size={18} />
          </Link>

        </section>

      </main>

      <footer className="footer">

        <div className="footer-brand">
          Food<span>Rush</span>
        </div>

        <p>
          Fresh food. Fast delivery. Happy moments.
        </p>

        <small>
          © 2026 FoodRush. All rights reserved.
        </small>

      </footer>
    </>
  );
}

export default Home;