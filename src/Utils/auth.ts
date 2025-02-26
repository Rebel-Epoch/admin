import useAuth from "./useAuth";

const KEYS = {
  admin_token: "__ADMIN_TOKEN",
};

const getAuthStateFromStorage = (): Pick<useAuth, "isLoggedIn" | "token"> => {
  if (typeof localStorage === "undefined") {
    return {
      isLoggedIn: false,
      token: null,
    };
  }
  const token = localStorage.getItem(KEYS.admin_token);

  if (token) {
    return {
      isLoggedIn: true,
      token,
    };
  }
  return {
    isLoggedIn: false,
    token: null,
  };
};

const syncTokenToStorage = (token: string) => {
  localStorage.setItem(KEYS.admin_token, token);
};

const removeTokenFromStorage = () => {
  localStorage.removeItem(KEYS.admin_token);
};

export { getAuthStateFromStorage, syncTokenToStorage, removeTokenFromStorage };
