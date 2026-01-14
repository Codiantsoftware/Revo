import { AdminLayout } from '../layouts';
import { adminRoutes } from './Admin';
import { type RouteObject } from 'react-router';

export const routes = (): RouteObject[] => {
  return [
    {
      element: <AdminLayout />,
      children: [...adminRoutes()],
    }
  ];
};
