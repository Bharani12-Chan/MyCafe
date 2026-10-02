import {
  Navigate,
} from "react-router-dom";


function ProtectedRoute({
  children,
  adminOnly = false,
}) {


  const token =
    localStorage.getItem("token");


  let user = null;


  try {

    user = JSON.parse(
      localStorage.getItem("user")
    );

  } catch {

    user = null;

  }


  // ========================================
  // NOT LOGGED IN
  // ========================================

  if (!token || !user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // ========================================
  // ADMIN ROUTE PROTECTION
  // ========================================

  if (
    adminOnly &&
    user.role !== "admin"
  ) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }


  return children;

}


export default ProtectedRoute;