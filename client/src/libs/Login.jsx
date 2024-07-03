import axios from "axios";

async function Login(credentials) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/login",
      credentials,
      { withCredentials: true }
    );
    const data = response.data.data.user;
    return data;
  } catch (error) {
   throw (error)
  }
}

export default Login;
