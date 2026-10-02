import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (

    <Routes>


      {/* HOME */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* LOGIN */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* REGISTER */}

      <Route
        path="/register"
        element={<Register />}
      />


      {/* USER DASHBOARD */}

      <Route
        path="/dashboard"
        element={

          <ProtectedRoute>

            <UserDashboard />

          </ProtectedRoute>

        }
      />


      {/* ADMIN DASHBOARD */}

      <Route
        path="/admin"
        element={

          <ProtectedRoute adminOnly>

            <AdminDashboard />

          </ProtectedRoute>

        }
      />


      {/* UNKNOWN URL */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />


    </Routes>

  );

}


export default App;