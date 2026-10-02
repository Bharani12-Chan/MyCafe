import { Clock3, Star, Trash2 } from "lucide-react";
import "./FoodCard.css";

const FALLBACK =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";

function FoodCard({
  food,
  showDelete = false,
  onDelete,
}) {
  const handleError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK;
  };

  return (
    <article className="food-card">

      <div className="food-img-container">
        <img
          src={food.image || FALLBACK}
          alt={food.name}
          onError={handleError}
        />

        <span className="category-pill">
          {food.category}
        </span>
      </div>

      <div className="food-body">

        <div className="food-heading">
          <h3>{food.name}</h3>

          <span className="rating">
            <Star
              size={13}
              fill="currentColor"
            />
            4.8
          </span>
        </div>

        <p>
          {food.description}
        </p>

        <div className="food-bottom">
          <span>
            <Clock3 size={15} />
            20-30 min
          </span>

          <strong>
            ₹{Number(food.price).toFixed(0)}
          </strong>
        </div>

        {showDelete && (
          <button
            className="food-delete"
            onClick={() => onDelete(food._id)}
          >
            <Trash2 size={16} />
            Delete
          </button>
        )}

      </div>
    </article>
  );
}

export default FoodCard;