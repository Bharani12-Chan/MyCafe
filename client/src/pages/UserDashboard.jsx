import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import CategoryFilter from "../components/CategoryFilter";

import {
  useCart,
} from "../context/CartContext";

import "./UserDashboard.css";

function UserDashboard() {
  const user = JSON.parse(
    localStorage.getItem("user") ||
      "{}"
  );

  const {
    cartCount,
    setCartOpen,
  } = useCart();

  const [foods, setFoods] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchFoods = async () => {
    try {
      setError("");

      const { data } =
        await axios.get(
          "/api/foods"
        );

      setFoods(data);

    } catch (error) {
      console.error(
        "Unable to load foods:",
        error
      );

      setError(
        "Unable to load the menu."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const filteredFoods =
    useMemo(() => {
      return foods.filter(
        (food) => {
          const searchMatch =
            `${food.name} ${food.category} ${food.description}`
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const categoryMatch =
            selectedCategory ===
              "All" ||
            food.category
              ?.toLowerCase()
              .includes(
                selectedCategory
                  .toLowerCase()
              );

          return (
            searchMatch &&
            categoryMatch
          );
        }
      );
    }, [
      foods,
      search,
      selectedCategory,
    ]);

  return (
    <>
      <Navbar />

      <main className="menu-page">

        <section className="menu-hero">

          <div>

            <div className="menu-welcome">
              <Sparkles size={15} />
              WELCOME BACK,
              {user.name?.toUpperCase() ||
                "FOOD LOVER"}
            </div>

            <h1>
              What are you
              <br />
              craving <span>today?</span>
            </h1>

            <p>
              Fresh flavours, exciting
              dishes and something
              delicious for every mood.
            </p>

          </div>

          <button
            className="mobile-cart-card"
            onClick={() =>
              setCartOpen(true)
            }
          >

            <ShoppingBag />

            <div>
              <small>
                YOUR CART
              </small>

              <strong>
                {cartCount} items
              </strong>
            </div>

          </button>

        </section>


        <section className="menu-tools">

          <div className="menu-search">

            <Search size={19} />

            <input
              type="text"
              placeholder="Search burgers, pizza, biryani..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          <CategoryFilter
            selected={
              selectedCategory
            }
            onSelect={
              setSelectedCategory
            }
          />

        </section>


        <section className="food-menu">

          <div className="menu-heading">

            <div>
              <span>
                FRESH FROM THE KITCHEN
              </span>

              <h2>
                Explore our menu
              </h2>

              <p>
                Hand-picked favourites,
                freshly prepared for you.
              </p>
            </div>

            <strong>
              {filteredFoods.length}
              {" "}
              {filteredFoods.length === 1
                ? "dish"
                : "dishes"}
            </strong>

          </div>


          {loading ? (

            <div className="loading">
              Preparing the menu...
            </div>

          ) : error ? (

            <div className="empty-state">
              {error}
            </div>

          ) :
          filteredFoods.length ===
          0 ? (

            <div className="empty-state">
              No dishes match your
              search. Try another
              category.
            </div>

          ) : (

            <div className="food-grid">

              {filteredFoods.map(
                (food) => (

                  <FoodCard
                    food={food}
                    key={food._id}
                  />

                )
              )}

            </div>

          )}

        </section>


        <section className="menu-bottom-banner">

          <div>

            <span>
              MADE FRESH. DELIVERED FAST.
            </span>

            <h2>
              Happiness is just one
              order away.
            </h2>

          </div>

          <button
            onClick={() =>
              setCartOpen(true)
            }
          >
            <ShoppingBag size={18} />
            View Cart
            {cartCount > 0 &&
              ` (${cartCount})`}
          </button>

        </section>

      </main>
    </>
  );
}

export default UserDashboard;