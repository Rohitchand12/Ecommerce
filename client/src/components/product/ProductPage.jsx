import React from "react";
import ProductCarousel from "./ProductCarousel";
import ProductIntro from "./ProductIntro";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";

function ProductPage({ product }) {
  return (
    <>
      {/* mobile screen */}

      <div className="md:hidden">
        <ProductCarousel productImages={product[0].images} />
        <ProductIntro product={product[0]} />

        <ProductInfo product={product[0]} />
        <ProductReviews reviews={product[0].reviews} />
      </div>

      {/* bigger screens */}
      <div className="hidden md:flex md:flex-col md:justify-center md:items-center">
        <div className="flex w-full gap-8 p-10" >
          <ProductCarousel productImages={product[0].images} />
          <ProductIntro product={product[0]} />
        </div>
        <ProductInfo product={product[0]} />
        <ProductReviews reviews={product[0].reviews}/>
      </div>
    </>
  );
}

// [
//   {
//     _id: '664f4b69323082787d7e9ff0',
//     title: 'Samsung Galaxy S24 Ultra 5G AI Smartphone (Titanium Gray, 12GB, 256GB Storage)',
//     description: 'A high-end smartphone with advanced AI features, 12GB RAM, and 256GB storage, available in Titanium Gray.',
//     seller: 'Samsung Store',
//     highlights: [
//       '12GB RAM',
//       '256GB Storage',
//       'Titanium Gray color',
//       'Advanced AI features'
//     ],
//     specifications: [ [Object], [Object], [Object], [Object], [Object] ],
//     original_price: 1299.99,
//     sale_price: 1199.99,
//     coverImage: 'http://res.cloudinary.com/dea8ouoiu/image/upload/v1716472684/xbn9lrzecihzw18hqdke.jpg',
//     images: [ [Object], [Object], [Object], [Object], [Object] ],
//     brand: 'Samsung',
//     category: 'Electronics',
//     color: 'Titanium Gray',
//     ratingsAverage: 4.5,
//     ratingsQuantity: 120,
//     quantity: 50,
//     createdAt: '2024-05-23T13:58:01.909Z',
//     updatedAt: '2024-05-23T14:08:43.216Z',
//     __v: 0,
//     id: '664f4b69323082787d7e9ff0'
//   }
// ]

export default ProductPage;
