import {
  Clock3,
  Plus,
  ShoppingBag,
  Star,
  Trash2,
} from "lucide-react";

import {
  useCart,
} from "../context/CartContext";

import "./FoodCard.css";

const fallbackImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80";

function FoodCard({
  food,
  showDelete = false,
  onDelete,
}) {
  const {
    addToCart,
    cart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const cartItem = cart.find(
    (item) => item._id === food._id
  );

  return (
    <article className="food-card">

      <div className="food-image-wrap">

        <img
          src={
            food.image ||
            fallbackImage
          }
          alt={food.name}
          className="food-image"
          onError={(e) => {
            e.currentTarget.src =
              fallbackImage;
          }}
        />

        <span className="food-category">
          {food.category}
        </span>

        <div className="food-rating">
          <Star
            size={14}
            fill="currentColor"
          />
          4.8
        </div>

      </div>

      <div className="food-content">

        <div className="food-title-row">

          <h3>
            {food.name}
          </h3>

          <strong>
            ₹{food.price}
          </strong>

        </div>

        <p>
          {food.description}
        </p>

        <div className="food-meta">

          <span>
            <Clock3 size={15} />
            20-30 min
          </span>

          <span>
            Freshly prepared
          </span>

        </div>

        {showDelete ? (

          <button
            className="delete-food-btn"
            onClick={() =>
              onDelete(food._id)
            }
          >
            <Trash2 size={17} />
            Delete Item
          </button>

        ) : cartItem ? (

          <div className="card-quantity">

            <button
              onClick={() =>
                decreaseQuantity(
                  food._id
                )
              }
            >
              −
            </button>

            <span>
              {cartItem.quantity}
            </span>

            <button
              onClick={() =>
                increaseQuantity(
                  food._id
                )
              }
            >
              +
            </button>

            <span className="added-text">
              In cart
            </span>

          </div>

        ) : (

          <button
            className="add-cart-btn"
            onClick={() =>
              addToCart(food)
            }
          >

            <ShoppingBag size={17} />

            Add to Cart

            <Plus
              size={17}
              className="add-plus"
            />

          </button>

        )}

      </div>

    </article>
  );
}

export default FoodCard;