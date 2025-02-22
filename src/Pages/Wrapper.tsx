import React, { useState, Suspense } from "react";
import Sidebar from "../Components/Sidebar";
import { CgSpinnerAlt } from "react-icons/cg";

const Wrapper = () => {
  const [tab, setTab] = useState<string>("");

  const LazyLoad = (componentName: string) => {
    switch (componentName) {
      case "Dashboard":
        return React.lazy(() => import("./Dashboard.tsx"));
      case "Orders":
        return React.lazy(() => import("./Orders.tsx"));
      case "Products":
        return React.lazy(() => import("./Products.tsx"));
      case "Users":
        return React.lazy(() => import("./Users.tsx"));
      case "Coupons":
        return React.lazy(() => import("./Coupons.tsx"));
      case "New Arrivals":
        return React.lazy(() => import("./NewArrivals.tsx"));
      case "Returns & Refunds":
        return React.lazy(() => import("./ReturnsAndRefunds.tsx"));
      case "Style Of The Month":
        return React.lazy(() => import("./StyleOfTheMonth.tsx"));
      default:
        return React.lazy(() => import("./Dashboard"));
    }
  };

  return (
    <div className="h-screen w-full flex">
      <div className="w-[15%] border">
        <Sidebar
          selected={(tab: string) => {
            setTab(tab);
            return tab;
          }}
        />
      </div>
      <div className="p-4 py-5 basis-[85%] flex justify-start flex-col bg-[#1d1d1d] overflow-y-auto">
        <h1 className="text-2xl font-bold text-white/90 mb-5">{tab}</h1>
        <Suspense
          fallback={
            <div className="h-full w-full flex items-center justify-center">
              <CgSpinnerAlt className="text-3xl text-[#1d1d1d] animate-spin" />
            </div>
          }
        >
          <div className="h-full w-full bg-[#1d1d1d] px-2">
            {React.createElement(LazyLoad(tab))}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Wrapper;
