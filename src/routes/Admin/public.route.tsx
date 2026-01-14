
import { type RouteObject } from "react-router";

export default function route(): RouteObject[] {
  return [
    {
      path: "*",
      element:<h2>Not Found</h2>,
    }
  ];
}
