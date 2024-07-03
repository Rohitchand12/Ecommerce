import React from "react";

function ProductInfo({ product }) {
  return (
    <section className="flex flex-col md:flex-row md:gap-10 justify-center items-start p-8 w-full text-sm gap-4">
      <div className="flex justify-center items-start flex-col gap-4 w-full">
        {/* product highlights */}
        <h1 className="text-xl font-semibold">Product highlights</h1>
        <ul className="list-disc list-inside">
          {product?.highlights.map((spec,index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      </div>

      {/* specs table */}
      <div className="center flex-col w-full">
        <h1 className="text-xl font-semibold mb-4">Specifications</h1>
        <table className="w-full">
          {product?.specifications.map((spec,index) => (
            <tr key={index} className="odd:bg-ylight">
              <th className="p-2 text-left">
                {spec.title}
              </th>
              <td className="p-2">{spec.description}</td>
            </tr>
          ))}
        </table>
      </div>
    </section>
  );
}

export default ProductInfo;

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
