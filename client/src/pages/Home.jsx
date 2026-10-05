import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import FoodCarousel from "../components/FoodCarousel";
import FoodShowcase from "../components/FoodShowcase";
import MovingGallery from "../components/MovingGallery";

import "./Home.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "reveal-visible"
            );
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    const elements =
      document.querySelectorAll(".reveal");

    elements.forEach((el) =>
      observer.observe(el)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <main className="premium-home">

      <Navbar />

      <Hero />

      <Marquee />

      <FoodCarousel />

      <FoodShowcase />

      <MovingGallery />


      <section className="experience-section">

        <div className="experience-title reveal">

          <span>
            WHY FOODRUSH?
          </span>

          <h2>
            Built around
            <br />
            your <em>cravings.</em>
          </h2>

        </div>


        <div className="experience-grid">

          <div className="experience-card reveal">
            <strong>20–30</strong>
            <span>MINUTES</span>
            <p>
              Fast delivery without
              sacrificing food quality.
            </p>
          </div>

          <div className="experience-card reveal">
            <strong>100+</strong>
            <span>FOOD PICKS</span>
            <p>
              Something delicious for
              every kind of craving.
            </p>
          </div>

          <div className="experience-card reveal">
            <strong>4.9</strong>
            <span>RATING</span>
            <p>
              A food experience designed
              to keep people coming back.
            </p>
          </div>

          <div className="experience-card reveal">
            <strong>100%</strong>
            <span>FRESH FEEL</span>
            <p>
              Better ingredients, better
              presentation and better mood.
            </p>
          </div>

        </div>

      </section>


      <section className="final-home-cta">

        <div className="final-cta-copy reveal">

          <span>
            READY WHEN YOU ARE.
          </span>

          <h2>
            Your next favourite
            <br />
            meal is waiting.
          </h2>

          <p>
            Join FoodRush and discover
            something worth craving.
          </p>

          <button
            onClick={() =>
              navigate("/register")
            }
          >
            Start Ordering
            <ArrowUpRight size={18} />
          </button>

        </div>

        <div className="final-cta-word">
          FOOD
          <br />
          RUSH
        </div>

      </section>


      <footer className="premium-footer">

        <div>
          <strong>
            Food<span>Rush</span>
          </strong>

          <p>
            Great food. Better moments.
          </p>
        </div>

        <small>
          © 2026 FoodRush • Demo Project
        </small>

      </footer>

    </main>
  );
}

export default Home;