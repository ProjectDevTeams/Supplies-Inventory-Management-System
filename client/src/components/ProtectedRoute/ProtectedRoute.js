// src/components/ProtectedRoute.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allow = [] }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else if (allow.length > 0 && !allow.includes(user.permission)) {
      navigate(-1); // 🔁 กลับหน้าก่อนหน้า
    }
  }, [user, allow, navigate]);

  if (!user || (allow.length > 0 && !allow.includes(user.permission))) {
    return null; // ยังไม่โหลด component
  }

  return children;
};

export default ProtectedRoute;
