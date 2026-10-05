import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  Search,
  Sparkles,
} from "lucide-react";

import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";

import "./UserDashboard.css";

function UserDashboard() {
  const [foods, setFoods] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const user = JSON.parse(
    localStorage.getItem("user") ||
    "null"
  );


  const getFoods = async () => {
    try {
      const { data } =
        await axios.get(
          "/api/foods"
        );

      setFoods(data);
    } catch (error) {
      console.error(
        "Unable to load foods",
        error
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getFoods();
  }, []);


  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        foods
          .map((food) =>
            food.category?.trim()
          )
          .filter(Boolean)
      ),
    ];
  }, [foods]);


  const filteredFoods =
    useMemo(() => {

      return foods.filter((food) => {

        const searchable =
          `${food.name} ${food.category} ${food.description}`
            .toLowerCase();

        const searchMatch =
          searchable.includes(
            search.toLowerCase()
          );

        const categoryMatch =
          category === "All" ||
          food.category === category;

        return (
          searchMatch &&
          categoryMatch
        );

      });

    }, [
      foods,
      search,
      category,
    ]);


  return (
    <main className="menu-page">

      <Navbar />


      <section className="menu-hero">

        <div>

          <span>
            <Sparkles size={14} />
            FOODRUSH MENU
          </span>

          <h1>
            Hey{" "}
            {user?.name
              ? user.name.split(" ")[0]
              : "Foodie"}
            ,
            <br />

            <em>
              what are you craving?
            </em>
          </h1>

          <p>
            Fresh picks, comfort food and
            everyday favourites — ready
            when you are.
          </p>

        </div>

        <div className="menu-hero-image">

          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1100&q=90"
            alt="Food menu"
          />

        </div>

      </section>


      <section className="menu-content">

        <div className="menu-toolbar">

          <div className="menu-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search food, category..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>


          <div className="category-scroll">

            {categories.map(
              (item) => (

                <button
                  key={item}
                  className={
                    category === item
                      ? "category-pill active"
                      : "category-pill"
                  }
                  onClick={() =>
                    setCategory(item)
                  }
                >
                  {item}
                </button>

              )
            )}

          </div>

        </div>


        <div className="menu-heading">

          <div>

            <span>
              DISCOVER
            </span>

            <h2>
              Fresh on the menu.
            </h2>

          </div>

          <p>
            {filteredFoods.length}
            {" "}
            delicious picks
          </p>

        </div>


        {loading ? (

          <div className="loading">
            Loading something
            delicious...
          </div>

        ) : filteredFoods.length === 0 ? (

          <div className="empty-state">
            No food matches your search.
          </div>

        ) : (

          <div className="menu-food-grid">

            {filteredFoods.map(
              (food) => (

                <FoodCard
                  key={food._id}
                  food={food}
                />

              )
            )}

          </div>

        )}

      </section>

    </main>
  );
}

export default UserDashboard;