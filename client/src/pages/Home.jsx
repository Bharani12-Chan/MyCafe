import {
  ArrowRight,
  Clock3,
  Leaf,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import "./Home.css";

const popularFoods = [
  {
    name: "Smoky Chicken Burger",
    category: "Burger",
    price: 199,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Italian Margherita",
    category: "Pizza",
    price: 299,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Garden Fresh Bowl",
    category: "Healthy",
    price: 249,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85",
  },
];

function Home() {
  const navigate = useNavigate();

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

  const exploreMenu = () => {
    if (!token) {
      navigate("/register");
      return;
    }

    navigate(
      user?.role === "admin"
        ? "/admin"
        : "/dashboard"
    );
  };

  return (
    <>
      <Navbar />

      <main className="home-page">

        {/* HERO */}

        <section className="hero">

          <div className="hero-content">

            <div className="hero-badge">
              <Sparkles size={15} />
              Fresh food, delivered fast
            </div>

            <h1>
              Good food.
              <br />

              <span>
                Better moments.
              </span>
            </h1>

            <p>
              Discover delicious dishes
              made fresh and delivered
              straight to your door.
              FoodRush makes every meal
              feel special.
            </p>

            <div className="hero-actions">

              <button
                className="primary-hero-btn"
                onClick={exploreMenu}
              >
                Explore Menu
                <ArrowRight size={18} />
              </button>

              {!token && (
                <Link
                  to="/login"
                  className="secondary-hero-btn"
                >
                  Sign In
                </Link>
              )}

            </div>

            <div className="hero-trust">

              <div className="avatar-stack">
                <span>A</span>
                <span>K</span>
                <span>R</span>
                <span>S</span>
              </div>

              <div>
                <div className="hero-stars">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>

                <small>
                  Loved by 2,000+ food
                  lovers
                </small>
              </div>

            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-image-frame">

              <img
                src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1100&q=90"
                alt="Fresh delicious food"
              />

            </div>

            <div className="floating-card delivery-card">
              <span>
                <Truck size={19} />
              </span>

              <div>
                <strong>
                  Fast Delivery
                </strong>

                <small>
                  20-30 minutes
                </small>
              </div>
            </div>

            <div className="floating-card rating-card">
              <span>
                <Star
                  size={18}
                  fill="currentColor"
                />
              </span>

              <div>
                <strong>
                  4.9 Rating
                </strong>

                <small>
                  Excellent food
                </small>
              </div>
            </div>

          </div>

        </section>


        {/* BENEFITS */}

        <section className="home-benefits">

          <div>
            <span>
              <Clock3 />
            </span>

            <section>
              <strong>
                Quick Delivery
              </strong>

              <small>
                Hot food at your door
              </small>
            </section>
          </div>

          <div>
            <span>
              <Leaf />
            </span>

            <section>
              <strong>
                Fresh Ingredients
              </strong>

              <small>
                Quality in every bite
              </small>
            </section>
          </div>

          <div>
            <span>
              <ShieldCheck />
            </span>

            <section>
              <strong>
                Easy Ordering
              </strong>

              <small>
                Simple & secure
              </small>
            </section>
          </div>

        </section>


        {/* POPULAR */}

        <section className="popular-section">

          <div className="home-section-heading">

            <div>
              <span>
                CUSTOMER FAVOURITES
              </span>

              <h2>
                Popular right now
              </h2>
            </div>

            <button
              onClick={exploreMenu}
            >
              View full menu
              <ArrowRight size={17} />
            </button>

          </div>

          <div className="popular-grid">

            {popularFoods.map(
              (food) => (

                <article
                  className="popular-card"
                  key={food.name}
                >

                  <div className="popular-image">

                    <img
                      src={food.image}
                      alt={food.name}
                    />

                    <span>
                      <Star
                        size={14}
                        fill="currentColor"
                      />
                      {food.rating}
                    </span>

                  </div>

                  <div className="popular-info">

                    <small>
                      {food.category}
                    </small>

                    <div>
                      <h3>
                        {food.name}
                      </h3>

                      <strong>
                        ₹{food.price}
                      </strong>
                    </div>

                  </div>

                </article>

              )
            )}

          </div>

        </section>


        {/* CTA */}

        <section className="home-cta">

          <div>

            <span>
              READY WHEN YOU ARE
            </span>

            <h2>
              Your next favourite meal
              is one click away.
            </h2>

            <p>
              Fresh flavours. Easy ordering.
              Happiness delivered.
            </p>

          </div>

          <button
            onClick={exploreMenu}
          >
            Order Something Delicious
            <ArrowRight size={18} />
          </button>

        </section>

      </main>


      <footer className="home-footer">

        <div className="footer-inner">

          <div>
            <strong>
              Food<span>Rush</span>
            </strong>

            <p>
              Great food. Better moments.
            </p>
          </div>

          <small>
            © 2026 FoodRush.
            Made with passion for food.
          </small>

        </div>

      </footer>

    </>
  );
}

export default Home;