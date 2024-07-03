import ButtonFilled from "@/ui/ButtonFilled";
import star from "../../../public/star.png";
import Image from "next/image";

function ProductIntro({ product }) {
  return (
    <section className="w-full center flex-col items-start my-8 p-4 gap-4 text-sm md:self-start">
      {/* title */}
      <h1 className="font-semibold text-base self-start md:text-xl md:font-bold">{product?.title}</h1>

      {/*price and ratings one flex*/}
      <div className="center gap-2 self-start w-full">
        <h2 className="text-xl">Rs.{product?.sale_price}</h2>
        <h2 className="line-through text-gray-400 text-sm">
          {product?.original_price}
        </h2>
        <div className="ml-auto center gap-2 text-sm">
          <p>{product?.ratingsAverage}</p>
          <div className="relative h-5 w-5">
            <Image
              src={star}
              alt="star"
              fill={true}
              className="object-contain"
            />
          </div>
          <p>{`(${product?.ratingsQuantity})`}</p>
        </div>

      </div>

      {/* description */}
      <p className="text-gray-500 mt-8">{product?.description}</p>

      {/* add to cart button */}
      <div className="flex-col flex md:flex-row gap-2 w-full mt-4">
        <ButtonFilled className="w-full">Add to cart</ButtonFilled>
        <ButtonFilled className="w-full">Buy now</ButtonFilled>
      </div>
    </section>
  );
}

export default ProductIntro;

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
