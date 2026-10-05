import { ArrowUpRight } from "lucide-react";
import "./FoodShowcase.css";

function FoodShowcase() {
  return (
    <section className="food-showcase">

      <div className="showcase-row reveal">

        <div className="showcase-image">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1100&q=90"
            alt="Pizza"
          />

          <span>01</span>
        </div>

        <div className="showcase-copy">

          <small>
            MADE TO CRAVE
          </small>

          <h2>
            Not just
            <br />
            fast food.
            <br />
            <em>Good food.</em>
          </h2>

          <p>
            Carefully selected flavours,
            comforting classics and meals
            that deserve your attention.
          </p>

          <button>
            Discover More
            <ArrowUpRight size={17} />
          </button>

        </div>

      </div>


      <div className="showcase-row reverse reveal">

        <div className="showcase-image">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=90"
            alt="Fresh bowl"
          />

          <span>02</span>
        </div>

        <div className="showcase-copy">

          <small>
            FRESH EVERY DAY
          </small>

          <h2>
            Colourful.
            <br />
            Fresh.
            <br />
            <em>Delicious.</em>
          </h2>

          <p>
            Fresh ingredients meet bold
            flavours for food that looks
            as good as it tastes.
          </p>

          <button>
            Taste Fresh
            <ArrowUpRight size={17} />
          </button>

        </div>

      </div>

    </section>
  );
}

export default FoodShowcase;