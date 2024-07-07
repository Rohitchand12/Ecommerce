async function fetchCategories() {
  try {
    let baseURL = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
    if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
      baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
    }
    // const response = await fetch("http://localhost:3000/api/v1/products/categories");
    const response = await fetch(
      `${baseURL}/products/categories`
    );
    if (!response.ok) {
      throw new Error("unable to fetch categories");
    }
    return await response.json();
  } catch (e) {
    console.log(e);
  }
}

export default fetchCategories;
