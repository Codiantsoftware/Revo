
import { AdminHeader } from "@/components/Admin";
import { Outlet } from "react-router-dom";

function AdminPrivateLayout() {

  return (
    <>
      <div className={`mainWrapper flex flex-col min-h-screen transition-all duration-300`}>
        <AdminHeader
        />
        <main className={`mt-[100px] flex-1 3xl:px-[66px] 3xl:py-[15px] px-5 py-3 bg-[#F6F5F2]`}>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AdminPrivateLayout;
