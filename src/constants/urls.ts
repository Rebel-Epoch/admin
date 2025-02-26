const URLS = {
  noauth: {
    login: "/api/v1/admin/login",
    register: "/auth/register",
  },
  auth: {
    user: {
      get: "api/v1/admin/users",
    },
    logout: "/auth/logout",
  },
};

export default URLS;
