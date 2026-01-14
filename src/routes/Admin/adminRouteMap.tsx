import { baseRoutes } from "../../helpers/baseRoutes";

type RouteInfo = {
  path: string;
}

const adminRouteMap: Record<string, RouteInfo> = {
  DASHBOARD: { path: `${baseRoutes.adminBaseRoutes}`},
};

export default adminRouteMap;
