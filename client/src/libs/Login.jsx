import axios from "axios";

async function Login(credentials) {
  try {
    let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
    if(process.env.NEXT_PUBLIC_NODE_ENV === "development"){
      baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
    }
    const response = await axios.post(
      `${baseURL}/auth/login`,
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
