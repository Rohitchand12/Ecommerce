import Catalog from "@/components/ProductsList/Catalog";
import Filter from "@/components/ProductsList/Filter";
// import fetchCategories from "@/libs/fetchCategories";
import fetchProducts from "@/libs/fetchProducts";
import fetchCategories from "@/libs/fetchCategories";
import Pagination from "@/components/ProductsList/Pagination";

async function Products({ searchParams }) {
  console.log("search params = ", searchParams);
  const products = fetchProducts(searchParams);
  const categories = fetchCategories();

  const [productsData,categoriesData] = await Promise.all([products,categories]);

  console.log("categories data = ",categoriesData);
  const allProducts = productsData?.data.products;
  const allCategories = categoriesData?.data.categories;
  const totalPages = Math.ceil(productsData?.totalCount/10);

  return (
      <main className="h-full w-full pb-10">
        <Filter total = {productsData?.totalCount} categories = {allCategories}/>
        <Catalog products = {allProducts}/>
        <Pagination totalPages = {totalPages}/>
      </main>
  );
}

export default Products;
