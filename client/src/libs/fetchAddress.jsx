import axios from "axios";
import { cookies } from "next/headers";
async function fetchAddress() {
    try {
        let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
        if(process.env.NEXT_PUBLIC_NODE_ENV === "development"){
          baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
        }
        const response = await axios.get(`${baseURL}/shipments`, {
          withCredentials: true,
          headers: {
             Cookie: cookies().toString() 
          },
        });
        return response.data;
      } catch (error) {
        console.log("error is ---->",error);
        throw new Error(error);
      }
}

export default fetchAddress