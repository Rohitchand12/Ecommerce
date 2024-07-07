import axios from "axios";

async function Logout() {
  let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
  if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
    baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
  }
  const response = await axios.post(
    `${baseURL}/auth/logout`,
    {},
    { withCredentials: true }
  );
  return response.data.message;
}

export default Logout;
