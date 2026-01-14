import { AdminPrivateLayout, AdminPublicLayout } from "../../layouts";
import publicRoutes from "./public.route";
import privateRoutes from "./private.route";
import { type RouteObject } from "react-router";

export const adminRoutes = (): RouteObject[] => {
  return [
    {
      element: <AdminPublicLayout />,
      children: [...publicRoutes()],
    },
    {
      element: <AdminPrivateLayout />,
      children: [...privateRoutes()],
    },
  ];
};
