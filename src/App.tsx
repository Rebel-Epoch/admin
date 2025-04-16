import "./App.css";
import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import { ConfigProvider, theme } from "antd";
import { SidebarProvider, SidebarTrigger } from "./Components/ui/sidebar";
import { AppSidebar } from "./Components/app-sidebar";
import { CgSpinnerAlt } from "react-icons/cg";
import { Suspense } from "react";
import Dashboard from "./Pages/Dashboard";
import AllProducts from "./Pages/Product/AllProducts";
import Coupons from "./Pages/Coupons/Coupons";
import Orders from "./Pages/Orders/Order";
import UserManagement from "./Pages/UserManagement/UserManagement";
import useAuth from "./Utils/useAuth";
import AddProduct from "./Pages/Product/Createproduct";
import Sotm from "./Pages/Sotm/Sotm";
// import useAuth from "./Utils/useAuth";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="h-screen w-full flex">
          <div className="p-4 py-5 w-full flex justify-start flex-col bg-[#1d1d1d] overflow-y-auto">
            <h1 className="text-2xl font-bold text-white/90 mb-5 capitalize">
              <SidebarTrigger />{" "}
              {location.pathname
                .slice(1)
                .split("/")
                .map((route) => route.replace("-", " "))
                .join(">")}
            </h1>
            <Suspense
              fallback={
                <div className="h-full w-full flex items-center justify-center">
                  <CgSpinnerAlt className="text-3xl text-[#1d1d1d] animate-spin" />
                </div>
              }
            >
              <div className="h-full w-full bg-[#1d1d1d] px-2">
                <Outlet />
              </div>
            </Suspense>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <ConfigProvider
        componentSize="large"
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {},
          components: {
            Table: {
              headerBg: "#18181b",
              headerColor: "#fff",
              rowHoverBg: "#18181b",
            },
          },
        }}
      >
        <Routes>
          {isLoggedIn ? (
            <>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/coupons" element={<Coupons />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/sotm" element={<Sotm />} />
              </Route>
              <Route path="/login" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
