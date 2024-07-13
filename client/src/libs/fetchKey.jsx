import axios from "axios";
async function fetchKey() {
    try {
        let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
        if(process.env.NEXT_PUBLIC_NODE_ENV === "development"){
          baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
        }
        const response = await axios.get(`${baseURL}/getkey`, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        console.log("error is ---->",error);
        throw new Error(error);
      }
}

export default fetchKey;