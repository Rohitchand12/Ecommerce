async function fetchProduct(productId){
   const response = await fetch(`https://api.mystickart.online/api/v1/products/${productId}`,{cache:"no-cache"});
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