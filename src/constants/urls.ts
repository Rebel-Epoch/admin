const URLS = {
  noauth: {
    login: "/api/v1/admin/login",
    register: "/auth/register",
  },
  auth: {
    user: {
      get: "api/v1/admin/users",
      create: "/api/v1/user/register",
    },
    logout: "/auth/logout",
    orders: {
      viewAll: "/api/v1/admin/orders",
      viewSingle: "/api/v1/admin/order",
      update: "/api/v1/admin/update-order",
      delete: "/api/v1/admin/delete-order",
    },
    coupons: {
      viewAll: "/api/v1/admin/coupons",
      delete: "/api/v1/admin/delete-coupon",
      create: "/api/v1/admin/add-coupon",
      update: "/api/v1/admin/update-coupon",
    },
    products: {
      viewAll: "/api/v1/products/fetch",
      delete: "/api/v1/admin/delete-product",
      create: "/api/v1/admin/add-product",
    },
    sotm: {
      viewAll: "/api/v1/admin/sotm",
      create: "/api/v1/admin/add-sotm",
      delete: "/api/v1/admin/delete-sotm",
    },
  },
};

export default URLS;
