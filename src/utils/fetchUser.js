// utils/fetchUser.js
export const fetchUser = () => {
  return Promise.resolve(
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
};

export const userAccessToken = () => {
  return Promise.resolve(
    localStorage.getItem("accessToken") !== "undefined"
      ? JSON.parse(localStorage.getItem("accessToken"))
      : null
  );
};
