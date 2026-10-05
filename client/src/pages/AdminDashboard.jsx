import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Grid3X3,
  Plus,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";

import "./AdminDashboard.css";

function AdminDashboard() {
  const [foods, setFoods] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [form, setForm] =
    useState({
      name: "",
      description: "",
      category: "",
      price: "",
      image: "",
    });

  const token =
    localStorage.getItem("token");

  let user = {};

  try {
    user = JSON.parse(
      localStorage.getItem("user")
    );
  } catch {
    user = {};
  }

  const fetchFoods = async () => {
    try {
      const { data } =
        await axios.get(
          "/api/foods"
        );

      setFoods(data);

    } catch (error) {
      console.error(
        "Food Load Error:",
        error
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const addFood = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      await axios.post(
        "/api/foods",
        form,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setForm({
        name: "",
        description: "",
        category: "",
        price: "",
        image: "",
      });

      setMessage(
        "Dish published successfully!"
      );

      await fetchFoods();

    } catch (error) {
      setMessage(
        error.response?.data
          ?.message ||
          "Unable to add dish."
      );
    }
  };

  const deleteFood = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Delete this dish from the menu?"
      );

    if (!confirmed) return;

    try {
      await axios.delete(
        `/api/foods/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setMessage(
        "Dish removed successfully."
      );

      await fetchFoods();

    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Unable to delete dish."
      );
    }
  };

  const categories =
    new Set(
      foods.map(
        (food) =>
          food.category
            ?.toLowerCase()
      )
    ).size;

  return (
    <>
      <Navbar />

      <main className="admin-page">

        <section className="admin-welcome">

          <div>

            <span>
              <Sparkles size={14} />
              FOODRUSH ADMIN
            </span>

            <h1>
              Welcome,{" "}
              {user?.name ||
                "Admin"}.
            </h1>

            <p>
              Manage your live menu and
              publish delicious new
              dishes for customers.
            </p>

          </div>

          <div className="admin-live">
            <i />
            Store is Live
          </div>

        </section>


        <section className="admin-stats">

          <article>

            <span>
              <UtensilsCrossed />
            </span>

            <div>
              <small>
                TOTAL DISHES
              </small>

              <strong>
                {foods.length}
              </strong>

              <p>
                Live on your menu
              </p>
            </div>

          </article>

          <article>

            <span>
              <Grid3X3 />
            </span>

            <div>
              <small>
                CATEGORIES
              </small>

              <strong>
                {categories}
              </strong>

              <p>
                Menu collections
              </p>
            </div>

          </article>

          <article>

            <span>
              <Sparkles />
            </span>

            <div>
              <small>
                LATEST DISH
              </small>

              <strong className="admin-latest">
                {foods[0]?.name ||
                  "No dishes"}
              </strong>

              <p>
                Most recent addition
              </p>
            </div>

          </article>

        </section>


        <section className="admin-workspace">

          <aside className="admin-form-panel">

            <div className="admin-panel-heading">

              <span>
                <Plus />
              </span>

              <div>
                <small>
                  CREATE
                </small>

                <h2>
                  Add New Dish
                </h2>
              </div>

            </div>

            <p className="admin-form-intro">
              Add a dish and it will
              instantly become available
              to your customers.
            </p>

            {message && (
              <div className="admin-message">
                {message}
              </div>
            )}

            <form
              onSubmit={addFood}
              className="admin-form"
            >

              <label>
                Dish Name

                <input
                  name="name"
                  value={form.name}
                  onChange={change}
                  placeholder="Chicken Burger"
                  required
                />
              </label>

              <div className="admin-two-fields">

                <label>
                  Category

                  <input
                    name="category"
                    value={
                      form.category
                    }
                    onChange={change}
                    placeholder="Burger"
                    required
                  />
                </label>

                <label>
                  Price ₹

                  <input
                    type="number"
                    min="0"
                    name="price"
                    value={form.price}
                    onChange={change}
                    placeholder="199"
                    required
                  />
                </label>

              </div>

              <label>
                Description

                <textarea
                  name="description"
                  value={
                    form.description
                  }
                  onChange={change}
                  rows="4"
                  placeholder="Tell customers what makes this dish special..."
                  required
                />
              </label>

              <label>
                Image URL

                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={change}
                  placeholder="https://..."
                />

                <small>
                  Optional. A default food
                  image will be used if
                  empty.
                </small>
              </label>

              <button type="submit">
                <Plus size={18} />
                Publish Dish
              </button>

            </form>

          </aside>


          <section className="admin-menu-panel">

            <div className="admin-menu-heading">

              <div>
                <span>
                  LIVE MENU
                </span>

                <h2>
                  Your dishes
                </h2>

                <p>
                  Everything currently
                  visible to customers.
                </p>
              </div>

              <strong>
                {foods.length} items
              </strong>

            </div>

            {loading ? (

              <div className="loading">
                Loading your menu...
              </div>

            ) : foods.length === 0 ? (

              <div className="empty-state">
                Your menu is empty.
                Add your first dish.
              </div>

            ) : (

              <div className="admin-food-grid">

                {foods.map(
                  (food) => (

                    <FoodCard
                      key={food._id}
                      food={food}
                      showDelete
                      onDelete={
                        deleteFood
                      }
                    />

                  )
                )}

              </div>

            )}

          </section>

        </section>

      </main>
    </>
  );
}

export default AdminDashboard;