import axios from "axios";

async function Signup(userData) {
  try {
    let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
    if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
      baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
    }
    const response = await axios.post(
        `${baseURL}/auth/signup`,
        userData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    const data = response.data.data.user;
    return data;
  } catch (error) {
    throw error;
  }
}

export default Signup;
