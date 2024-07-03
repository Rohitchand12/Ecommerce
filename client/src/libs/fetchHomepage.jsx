
async function fetchHomepage() {
  try{
    const response = await fetch(
      "http://localhost:3000/api/v1/products/homepage",
      {cache:"no-cache"}
    );

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
