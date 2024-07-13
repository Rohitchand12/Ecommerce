import axios from "axios";
async function createPayment(amount) {
    try {
        let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
        if(process.env.NEXT_PUBLIC_NODE_ENV === "development"){
          baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
        }
        const response = await axios.post(`${baseURL}/payments`,{amount}, {
          withCredentials: true,
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log("error is ---->",error);
        throw new Error(error);
      }
}

export default createPayment