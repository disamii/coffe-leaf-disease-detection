import Cookies from "js-cookie";

export const storeUserData = (userData) => {
  const today = Date.now();
  const expiry = 7 * 24 * 60 * 60 * 1000;
  localStorage.setItem(
    "userData",
    JSON.stringify({
      email: userData.email,
      role: userData.role,
      expiresIn: today + expiry,
    })
  );

  // soring token in cookie
  Cookies.set("token", userData.token, {
    expires: 7,
  });

  console.log(userData);
};

export const readUserData = (isToken) => {
  const storedData = localStorage.getItem("userData");
  if (storedData) {
    const data = JSON.parse(storedData);

    const now = Date.now();
    if (data.expiresIn > now) {
      if (isToken) {
        const token = Cookies.get("token");
        return token;
      } else {
        return data;
      }
    } else {
      localStorage.removeItem("userData");
      Cookies.remove("token");
      return null;
    }
  }
  return null;
};

export const deleteUserData = () => {
  localStorage.removeItem("userData");
  Cookies.remove('token')
};
