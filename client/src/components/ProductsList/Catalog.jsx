import ProductCard from "./ProductCard";


function Catalog({total,products}) {
  return (
    <section className="min-h-screen p-1 lg:p-10" >
      <div className="grid grid-cols-12 gap-1 lg:gap-5 p-5">
        {products?.map((product) => (
          <ProductCard key = {product._id} product = {product}/>
        ))}
      
      </div>
    </section>
  );
}

export default Catalog;
