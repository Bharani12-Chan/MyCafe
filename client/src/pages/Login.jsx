import { useState } from "react";
import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  UtensilsCrossed,
} from "lucide-react";

import "./Auth.css";


function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
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

      // Same-domain API
      // No localhost required

      const { data } = await axios.post(
        "/api/auth/login",
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


      // Role-based dashboard

      if (data.user.role === "admin") {

        navigate("/admin");

      } else {

        navigate("/dashboard");

      }


    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Login failed."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="auth-layout">


      <div className="auth-art login-art">

        <UtensilsCrossed size={60} />

        <span>
          WELCOME BACK
        </span>

        <h1>
          Delicious discoveries await.
        </h1>

        <p>
          Sign in and explore the newest
          additions to our menu.
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
            SIGN IN
          </span>


          <h2>
            Welcome back.
          </h2>


          <p>
            Enter your credentials to continue.
          </p>


          {error && (

            <div className="auth-error">
              {error}
            </div>

          )}


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
              placeholder="Your password"
              value={form.password}
              onChange={change}
              required
            />

          </label>


          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Signing in..."
              : "Sign In"}

          </button>


          <div className="auth-change">

            Don't have an account?{" "}

            <Link to="/register">
              Create one
            </Link>

          </div>


        </form>

      </div>

    </div>

  );

}


export default Login;