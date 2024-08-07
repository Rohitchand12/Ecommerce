async function fetchProducts(query) {
  let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
    if(process.env.NEXT_PUBLIC_NODE_ENV === "development"){
      baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
    }
  const sort = query.sort || "sale_price";
  const page = query.page || "1";
  const limit = query.limit || "10";

  const filtered = Object.keys(query).filter((el) => {
    return el !== "sort" && el !== "page" && el != "limit";
  });

  const filterObj = filtered.map((el) => {
    return `${el}=${query[el]}`;
  });

  const finalFilter = filterObj.join("&");

  const filter = finalFilter || "ratingsAverage[gte]=0";
  try {
    const response = await fetch(
      `${baseURL}/products?${filter}&sort=${sort}&page=${page}&limit=${limit}`
    ,{
      cache:"no-cache"
    });
    // const response = await fetch(
    //   `http://localhost:3000/api/v1/products?${filter}&sort=${sort}&page=${page}&limit=${limit}`
    // ,{
    //   cache:"no-cache"
    // });
    if (!response.ok) {
      throw new Error("unable to fetch all products");
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export default fetchProducts;
