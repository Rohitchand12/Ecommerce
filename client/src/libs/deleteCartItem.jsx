import axios from "axios";
async function deleteCartItem(itemId) {
    let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
    if(process.env.NEXT_PUBLIC_NODE_ENV === "development"){
      baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
    }
    try{
        const response = await axios.post(`${baseURL}/cart/deleteItem`,{itemId},{
            withCredentials: true,
        })
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
    }
    
}

export default deleteCartItem

/*
item data  format => 
{
    product: "product-id",
    quantity: 1,
}

*/