
async function fetchCart() {
  try {
    const response = await fetch("https://api.mystickart.online/api/v1/cart", {
      credentials: "include",
      cache:"no-cache"
    });
    // const response = await axios.get("https://mystickart.onrender.com/api/v1/cart",{withCredentials:true});
    if (!response.ok) {
      const err = await response.json();
      console.log(err);
      throw new Error(err);
    }

    // console.log("response from axios -> ",response.data);
    // return response.data;
    const data = await response.json();
    console.log("response from fetch -> ",data);
    
  } catch (error) {
    // console.log("error is ---->",error);
  }
}

export default fetchCart;
