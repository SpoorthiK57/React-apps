export const setAuthToken = (token) => {
  localStorage.setItem("authtoken", token);
};

export const getAuthToken = () => {
  return localStorage.getItem("authtoken");
};
