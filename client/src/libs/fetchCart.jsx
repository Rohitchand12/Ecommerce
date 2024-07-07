
async function fetchCart() {
  try {
    let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
    if(process.env.NEXT_PUBLIC_NODE_ENV === "development"){
      baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
    }
    const response = await fetch(`${baseURL}/cart`, {
      method:'GET',
      credentials: "include",
      cache:"no-cache"
    });
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
