import {
  Clock3,
  Plus,
  Star,
  Trash2,
} from "lucide-react";

import { useCart } from "../context/CartContext";

import "./FoodCard.css";

const fallbackImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";

function FoodCard({
  food,
  showDelete = false,
  onDelete,
}) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(food);
  };

  return (
    <article className="premium-food-card">

      <div className="premium-food-image">

        <img
          src={food.image || fallbackImage}
          alt={food.name}
          onError={(e) => {
            e.currentTarget.src =
              fallbackImage;
          }}
        />

        <span className="food-category">
          {food.category}
        </span>

        <span className="food-rating">
          <Star size={11} />
          4.9
        </span>

      </div>


      <div className="premium-food-content">

        <div className="food-name-row">

          <h3>{food.name}</h3>

          <strong>
            ₹{food.price}
          </strong>

        </div>

        <p>
          {food.description}
        </p>

        <div className="food-card-bottom">

          <span className="food-time">
            <Clock3 size={14} />
            20–30 min
          </span>


          {showDelete ? (

            <button
              className="food-delete-btn"
              onClick={() =>
                onDelete(food._id)
              }
            >
              <Trash2 size={15} />
              Delete
            </button>

          ) : (

            <button
              className="food-add-btn"
              onClick={handleAdd}
            >
              <Plus size={17} />
              Add
            </button>

          )}

        </div>

      </div>

    </article>
  );
}

export default FoodCard;