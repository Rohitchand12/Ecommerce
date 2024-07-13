import axios from "axios";
async function createAddress(userAddress) {
    try {
        let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
        if(process.env.NEXT_PUBLIC_NODE_ENV === "development"){
          baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
        }
        const response = await axios.post(`${baseURL}/shipments`,userAddress, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        console.log("error is ---->",error);
        throw new Error(error);
      }
}

export default createAddress