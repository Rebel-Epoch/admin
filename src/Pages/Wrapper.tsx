import React, { useState, Suspense } from "react";
import Sidebar from "../Components/Sidebar";
import { CgSpinnerAlt } from "react-icons/cg";
import { SidebarTrigger } from "@/Components/ui/sidebar.tsx";

const Wrapper = () => {
  const [tab, setTab] = useState<string>("");

  const LazyLoad = (componentName: string) => {
    switch (componentName) {
      case "Dashboard":
        return React.lazy(() => import("./Dashboard.tsx"));
      case "User Management":
        return React.lazy(() => import("./UserManagement/UserManagement.tsx"));
      case "Orders":
        return React.lazy(() => import("./Orders.tsx"));
      case "ProductReview":
        return React.lazy(() => import("./Review/ProductReviews.tsx"));
      case "Products":
        return React.lazy(() => import("./Products.tsx"));
      case "Categories":
        return React.lazy(() => import("./Categories/Categories.tsx"));
      case "ProductAttributes":
        return React.lazy(() => import("./Product/ProductAttributes.tsx"));
      case "ProductInfo":
        return React.lazy(() => import("./Product/ProductInfo.tsx"));
      case "Coupons":
        return React.lazy(() => import("./Coupons/Coupons.tsx"));
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

  );
};

export default Wrapper;
