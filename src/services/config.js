function authConfig() {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  };
  return config;
}
export default authConfig;
