// import { Navigate } from "react-router-dom";

// export default function AdminRoute({ children }) {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/admin/login" replace />;
//   }

//   return children;
// }

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  const isTokenValid = () => {
    try {
      const decoded = jwtDecode(token);

      // role check
      if (decoded.role !== "admin") return false;

      // expiry check
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  if (!token || !isTokenValid()) {
    localStorage.removeItem("token");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
