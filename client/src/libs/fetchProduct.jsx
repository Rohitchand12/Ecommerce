async function fetchProduct(productId){
   console.log(process.env.NEXT_PUBLIC_NODE_ENV);
   let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
    if(process.env.NEXT_PUBLIC_NODE_ENV === "development"){
      baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
    }
   const response = await fetch(`${baseURL}/products/${productId}`,{cache:"no-cache"});
   // const response = await fetch(`http://localhost:3000/api/v1/products/${productId}`,{cache:"no-cache"});
   if(!response.ok){
    const errorRes = await response.json();
    throw new Error(errorRes.message);
   }
   else{
    return response.json();
   }
}
export default fetchProduct;