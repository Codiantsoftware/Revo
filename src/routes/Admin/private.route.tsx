import adminRouteMap from "./adminRouteMap";
import { AdminDashboard } from "../../pages";
import { type RouteObject } from "react-router";

export default function route(): RouteObject[] {
  return [
    {
      path: adminRouteMap.DASHBOARD.path,
      element:<AdminDashboard />,
    }
  ];
}
