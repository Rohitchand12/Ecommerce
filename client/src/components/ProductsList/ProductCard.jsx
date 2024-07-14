"use client"
import ButtonFilled from "@/ui/ButtonFilled";
import Image from "next/image";
import star from "../../../public/star.png";
import Link from "next/link";
import addToCart from "@/libs/addToCart";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUserStore } from "@/store/store";

function ProductCard({ product }) {
  const user = useUserStore(state=>state.user);
  const [isAdding , setIsAdding] = useState(false);
  async function handleAddToCart(){
    if(!user){
      toast.error("Please login to add items to cart.");
      return;
    }
    setIsAdding(true);
    try{
      const response = await addToCart({
        item:{
          product: product._id,
          quantity: 1,
        }
      })
      if(response.data && response.data.message){
        toast.success(response.data.message);
      }else{
        toast.success("Added to cart!");
      }
    }catch(e){
      console.log(e);
    }finally{
      setIsAdding(false);
    }
  }
  return (
    <div className="flex flex-col h-full col-span-6 md:col-span-4 lg:col-span-3 text-xs shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <Link href={`products/${product._id}`} className="center flex-col gap-8">
        <div className="relative h-44 lg:h-64 w-full">
          <Image
            src={product.coverImage}
            alt="product image"
            fill={true}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col w-full px-4 gap-2 py-5">
          <h1 className="font-semibold">{`${product.title.substring(
            0,
            30
          )}...`}</h1>
          <p className="text-gray-400">{`${product.description.substring(
            0,
            30
          )}...`}</p>
          <div className="flex justify-between">
            <h1 className="font-semibold text-fcolor">{`Rs. ${product.sale_price}`}</h1>
            <div className="center gap-2">
              <Image
                src={star}
                sizes="50%"
                className="h-[10px] w-[10px]"
                alt="ratings image"
              />
              <p>{`${product.ratingsAverage} (${product.ratingsQuantity})`}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="w-full center mt-auto">
        <ButtonFilled
         loading={isAdding}
         disabled={isAdding}
          className={`w-full disabled:bg-ylight`}
          onClick={handleAddToCart}
        >
          Add to cart
        </ButtonFilled>
      </div>
    </div>
  );
}

export default ProductCard;
