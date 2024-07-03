import ProductPage from "@/components/product/ProductPage";
import fetchProduct from "@/libs/fetchProduct";

async function product({params}) {
  
  const productData = await fetchProduct(params.productId)
  
  return (
    <ProductPage product = {productData.product}/>
  );
}

export default product;
