import React from "react";
//Admin
export const AdminLayout = React.lazy(() => import("./Admin/index.layout"));
export const AdminPublicLayout = React.lazy(() => import("./Admin/public.layout"));
export const AdminPrivateLayout = React.lazy(() => import("./Admin/private.layout"));
