import { ArrowRight, Star } from "lucide-react";

import "./FoodCarousel.css";

const foods = [
  {
    name: "Smoky House Burger",
    category: "BURGERS",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Italian Stone Pizza",
    category: "PIZZA",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Garden Fresh Bowl",
    category: "HEALTHY",
    price: 229,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Creamy Pasta",
    category: "PASTA",
    price: 279,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=85",
  },
];

function FoodCarousel() {
  const allFoods = [...foods, ...foods];

  return (
    <section className="carousel-section">

      <div className="carousel-heading">

        <div>
          <span>TRENDING NOW</span>

          <h2>
            Food worth
            <br />
            craving.
          </h2>
        </div>

        <p>
          Swipe through the favourites everyone
          keeps coming back for.
          <ArrowRight size={17} />
        </p>

      </div>

      <div className="carousel-viewport">

        <div className="carousel-track">

          {allFoods.map((food, index) => (

            <article
              className="carousel-card"
              key={index}
            >

              <div className="carousel-image">

                <img
                  src={food.image}
                  alt={food.name}
                />

                <span>
                  <Star size={11} />
                  4.9
                </span>

              </div>

              <div className="carousel-info">

                <small>
                  {food.category}
                </small>

                <div>
                  <h3>{food.name}</h3>

                  <strong>
                    ₹{food.price}
                  </strong>
                </div>

              </div>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FoodCarousel;