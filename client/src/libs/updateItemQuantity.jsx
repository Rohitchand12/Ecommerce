import axios from "axios";
async function updateCartItem(updatedItem) {
    let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
    if(process.env.NEXT_PUBLIC_NODE_ENV === "development"){
      baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
    }
    try{
        console.log("updated item is -->",updatedItem)
        const response = await axios.post(`${baseURL}/cart/updateitem`,updatedItem,{
            withCredentials: true,
        })
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
    }
    
}

export default updateCartItem

/*
item data  format => 
{
    product: "product-id",
    quantity: 1,
}

*/