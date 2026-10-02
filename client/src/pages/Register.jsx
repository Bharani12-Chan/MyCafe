import { useState } from "react";
import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  ChefHat,
} from "lucide-react";

import "./Auth.css";


function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const change = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  const submit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      // Same-domain API.
      // Works locally after production build
      // and also works on Render.

      const { data } = await axios.post(
        "/api/auth/register",
        form
      );


      localStorage.setItem(
        "token",
        data.token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      // Role-based redirect

      if (data.user.role === "admin") {

        navigate("/admin");

      } else {

        navigate("/dashboard");

      }


    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Registration failed."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="auth-layout">


      <div className="auth-art">

        <ChefHat size={60} />

        <span>
          FOODRUSH
        </span>

        <h1>
          Your food journey starts here.
        </h1>

        <p>
          Join FoodRush and discover delicious
          new dishes whenever they're added.
        </p>

      </div>


      <div className="auth-right">


        <Link
          to="/"
          className="back"
        >

          <ArrowLeft size={17} />

          Home

        </Link>


        <form
          className="auth-box"
          onSubmit={submit}
        >


          <span className="section-label">
            CREATE ACCOUNT
          </span>


          <h2>
            Join FoodRush.
          </h2>


          <p>
            Fill in your details to get started.
          </p>


          {error && (

            <div className="auth-error">
              {error}
            </div>

          )}


          <label>

            Full Name

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={change}
              required
            />

          </label>


          <label>

            Email Address

            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={change}
              required
            />

          </label>


          <label>

            Password

            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={change}
              minLength="6"
              required
            />

          </label>


          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>


          <div className="auth-change">

            Already have an account?{" "}

            <Link to="/login">
              Sign in
            </Link>

          </div>


        </form>

      </div>

    </div>

  );

}


export default Register;