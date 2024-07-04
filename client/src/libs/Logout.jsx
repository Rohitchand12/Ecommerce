import axios from "axios"

async function Logout() {
  const response = await axios.post('https://api.mystickart.online/api/v1/auth/logout',{},{withCredentials:true});
  return response.data.message;
}

export default Logout