import {
  useEffect,
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

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );


  const [foods, setFoods] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ========================================
  // FETCH FOODS
  // ========================================

  const fetchFoods = async () => {

    try {

      setError("");


      const { data } = await axios.get(
        "/api/foods"
      );


      setFoods(data);


    } catch (error) {

      console.error(
        "Unable to load foods:",
        error
      );


      setError(
        "Unable to load food items."
      );


    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchFoods();

  }, []);


  // ========================================
  // SEARCH
  // ========================================

  const filtered = foods.filter(
    (food) =>

      `${food.name} ${food.category}`
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

  );


  return (

    <>

      <Navbar />


      <main className="user-page">


        <section className="user-welcome">


          <div>

            <span className="dashboard-label">
              YOUR FOOD DASHBOARD
            </span>


            <h1>
              Welcome back,{" "}
              {user.name || "Food Lover"} 👋
            </h1>


            <p>
              Discover the newest dishes
              added to FoodRush.
            </p>

          </div>


          <div className="welcome-icon">

            <Sparkles />

          </div>


        </section>


        <div className="search-box">

          <Search size={19} />


          <input
            type="text"
            placeholder="Search food or category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <section className="latest">


          <div className="latest-heading">


            <div>

              <span>
                FRESH FROM THE KITCHEN
              </span>

              <h2>
                Latest additions
              </h2>

            </div>


            <strong>
              {filtered.length} dishes
            </strong>


          </div>


          {loading ? (

            <div className="loading">

              Loading delicious food...

            </div>

          ) : error ? (

            <div className="empty-state">

              {error}

            </div>

          ) : filtered.length === 0 ? (

            <div className="empty-state">

              No food found.
              Try another search.

            </div>

          ) : (

            <div className="dashboard-grid">


              {filtered.map((food) => (

                <FoodCard
                  food={food}
                  key={food._id}
                />

              ))}


            </div>

          )}


        </section>


      </main>

    </>

  );

}


export default UserDashboard;