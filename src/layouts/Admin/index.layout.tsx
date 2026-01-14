import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../../assets/admin/css/style.css";

function AdminLayout() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return <Outlet />;
}

export default AdminLayout;
