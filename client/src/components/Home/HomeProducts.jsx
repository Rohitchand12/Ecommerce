
import ButtonBordered from "@/ui/ButtonBordered";
import Button from "@/ui/ButtonBordered";
import Image from "next/image";
import React from "react";

function HomeProducts({products}) {

  return (
    <section className="min-h-screen center flex-col gap-5 md:gap-10 my-10 px-5 md:px-20">
      <h1 className="text-3xl font-bold tracking-wide">Our products</h1>
      <div className="grid grid-cols-12 gap-5 h-full w-full">
        {products.map((product) => {
          return (
            <div
              className="col-span-6 md:col-span-4 lg:col-span-3  flex flex-col gap-5 h-full w-full p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              key={product._id}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={product.coverImage}
                  fill={true}
                  sizes="100%"
                  alt="product image"
                  className="object-contain"
                />
              </div>
              <div className="text-gray-500  flex flex-col gap-3">
                <p className="text-black font-semibold">{product.title}</p>
                <div className="flex gap-2">
                  <p>{`Rs.${product.sale_price}`}</p>
                  <p className="line-through ">
                    {`Rs.${product.original_price}`}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <button className="px-6 py-2 border border-ydark bg-transparent text-ydark font-semibold">Show more</button> */}
      <ButtonBordered>Show more</ButtonBordered>
    </section>
  );
}

export default HomeProducts;
