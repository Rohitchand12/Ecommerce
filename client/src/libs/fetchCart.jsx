import axios from "axios";

async function fetchCart() {
  const response = await axios.get("http://localhost:3000/api/v1/cart",{withCredentials:true});
  console.log(response);
  return response.data;
}

export default fetchCart;
