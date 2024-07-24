
async function fetchHomepage() {
  try{
    console.log("fetching");
    let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
    console.log(baseURL);
    if(process.env.NEXT_PUBLIC_NODE_ENV === "development"){
      baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
    }
    const response = await fetch(
      `${baseURL}/products/homepage`,
      {cache:"no-cache"}
    );
    // const response = await fetch(
    //   "http://localhost:3000/api/v1/products/homepage",
    //   {cache:"no-cache"}
    // );

    if(!response.ok){
      throw new Error("Unable to fetch data");
    }
    const data = await response.json()
    return data;

  }
  catch(e){
    console.log(e);
  }
  
}

export default fetchHomepage;
