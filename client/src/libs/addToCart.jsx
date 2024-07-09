import axios from "axios";
async function addToCart(itemData) {
    let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
    if(process.env.NEXT_PUBLIC_NODE_ENV === "development"){
      baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
    }
    try{
        const response = await axios.post(`${baseURL}/cart`,itemData,{
            withCredentials: true,
        })
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
    }
    
}

export default addToCart

/*
item data  format => 
{
    product: "product-id",
    quantity: 1,
}

*/