import axios from "axios";

async function fetchCart() {
  try {
    const response = await axios.get("https://api.mystickart.online/api/v1/cart", {
      withCredentials: true,
    });
    // const response = await axios.get("https://mystickart.onrender.com/api/v1/cart",{withCredentials:true});
    console.log("response from fetch -> ",response);
    return response.data;
  } catch (error) {
    console.log("error is ---->",error);
  }
}

export default fetchCart;
