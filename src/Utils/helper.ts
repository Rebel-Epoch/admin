import cookie from "js-cookie";

export const setCookie = async (key: string, value: string) => {
  await new Promise((resolve, _) => {
    cookie.set(key, value, {
      expires: 1,
      path: "/",
    });
    resolve(true);
  });
};

export const removeCookie = async (key: string) => {
  await new Promise((resolve, _) => {
    cookie.remove(key, {
      path: "/",
    });
    resolve(true);
  });
};

export const getCookie = async (key: string) => {
  return await new Promise((resolve, _) => {
    const value = cookie.get(key);
    resolve(value);
  });
};
