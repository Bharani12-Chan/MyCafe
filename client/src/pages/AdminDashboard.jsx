import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  LayoutGrid,
  Plus,
  Utensils,
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


  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });


  const token =
    localStorage.getItem("token");


  // ========================================
  // FETCH FOODS
  // ========================================

  const fetchFoods = async () => {

    try {

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


    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchFoods();

  }, []);


  // ========================================
  // INPUT CHANGE
  // ========================================

  const change = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  // ========================================
  // ADD FOOD
  // ========================================

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
        "Food added successfully!"
      );


      await fetchFoods();


    } catch (error) {

      console.error(
        "Add Food Error:",
        error
      );


      setMessage(
        error.response?.data?.message ||
        "Unable to add food."
      );

    }

  };


  // ========================================
  // DELETE FOOD
  // ========================================

  const deleteFood = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this food item?"
      );


    if (!confirmed) {

      return;

    }


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
        "Food deleted successfully!"
      );


      await fetchFoods();


    } catch (error) {

      console.error(
        "Delete Food Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Unable to delete food."
      );

    }

  };


  // ========================================
  // CATEGORY COUNT
  // ========================================

  const categories =
    new Set(
      foods.map(
        (food) => food.category
      )
    ).size;


  return (

    <>

      <Navbar />


      <main className="admin-page">


        <div className="admin-header">


          <span>
            ADMIN CONTROL CENTER
          </span>


          <h1>
            Food Management
          </h1>


          <p>
            Add new dishes and manage
            your FoodRush menu.
          </p>


        </div>


        {/* =================================
            STATS
        ================================= */}


        <section className="stats">


          <div className="stat">


            <span>
              <Utensils />
            </span>


            <div>

              <small>
                Total Foods
              </small>

              <strong>
                {foods.length}
              </strong>

            </div>


          </div>


          <div className="stat">


            <span>
              <LayoutGrid />
            </span>


            <div>

              <small>
                Categories
              </small>

              <strong>
                {categories}
              </strong>

            </div>


          </div>


          <div className="stat">


            <span>
              <Plus />
            </span>


            <div>

              <small>
                Latest Item
              </small>

              <strong className="latest-name">

                {foods[0]?.name || "None"}

              </strong>

            </div>


          </div>


        </section>


        {/* =================================
            ADMIN WORKSPACE
        ================================= */}


        <section className="admin-workspace">


          {/* ADD FOOD */}


          <div className="add-panel">


            <div className="panel-heading">


              <span>
                +
              </span>


              <div>

                <h2>
                  Add New Food
                </h2>

                <p>
                  Create a new menu item.
                </p>

              </div>


            </div>


            {message && (

              <div className="admin-message">

                {message}

              </div>

            )}


            <form onSubmit={addFood}>


              <label>

                Food Name

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={change}
                  placeholder="e.g. Chicken Burger"
                  required
                />

              </label>


              <div className="two-fields">


                <label>

                  Category

                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={change}
                    placeholder="e.g. Burger"
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
                  value={form.description}
                  onChange={change}
                  placeholder="Describe this delicious dish..."
                  rows="4"
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
                  placeholder="Optional — leave empty for default"
                />


                <small>
                  Paste an online image URL
                  or leave this field empty.
                </small>

              </label>


              <button
                type="submit"
                className="add-food-btn"
              >

                <Plus size={18} />

                Add Food

              </button>


            </form>


          </div>


          {/* CURRENT MENU */}


          <div className="menu-panel">


            <div className="menu-panel-title">


              <div>

                <h2>
                  Current Menu
                </h2>

                <p>
                  {foods.length} items available
                </p>

              </div>


            </div>


            {loading ? (

              <div className="loading">

                Loading menu...

              </div>

            ) : foods.length === 0 ? (

              <div className="empty-state">

                No food added yet.

              </div>

            ) : (

              <div className="admin-food-grid">


                {foods.map((food) => (

                  <FoodCard
                    key={food._id}
                    food={food}
                    showDelete={true}
                    onDelete={deleteFood}
                  />

                ))}


              </div>

            )}


          </div>


        </section>


      </main>

    </>

  );

}


export default AdminDashboard;