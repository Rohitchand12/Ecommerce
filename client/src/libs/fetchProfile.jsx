import axios from 'axios'

async function fetchProfile() {
    let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
    if(process.env.NEXT_PUBLIC_NODE_ENV === "development"){
      baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
    }
    const response = await axios.get(`${baseURL}/auth/profile`,{withCredentials:true});
    return response;
}

export default fetchProfile