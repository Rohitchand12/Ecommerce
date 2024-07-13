"use client";
import { useEffect } from "react";
import ButtonBordered from "@/ui/ButtonBordered";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import deleteCartItem from "@/libs/deleteCartItem";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import updateCartItem from "@/libs/updateItemQuantity";
import ButtonFilled from "@/ui/ButtonFilled";

function Usercart({ cart }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [isDecreasing, setIsDecreasing] = useState(false);

  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  async function handleDeleteCartItem(itemId) {
    setIsDeleting(true);
    try {
      const response = await deleteCartItem(itemId);
      toast.success("Item deleted successfully !");
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleIncreaseQuantity(itemId, quantity) {
    try {
      console.log("item id -- >", typeof itemId);
      setIsIncreasing(true);
      await updateCartItem({ itemId, quantity: quantity + 1 });
      router.refresh();
    } catch (error) {
      toast.error("something went wrong!");
    } finally {
      setIsIncreasing(false);
    }
  }
  async function handleDecreaseQuantity(itemId, quantity) {
    try {
      setIsDecreasing(true);
      await updateCartItem({ itemId, quantity: quantity - 1 });
      router.refresh();
    } catch (error) {
      toast.error("something went wrong!");
    } finally {
      setIsDecreasing(false);
    }
  }
  return (
    <div className="col-span-12 md:col-span-8">
      <div className="hidden md:grid grid-cols-12 p-5 font-semibold bg-ylighter place-items-center">
        <h1 className="col-span-6 h-full w-full center">Product</h1>
        <h1 className="col-span-2 h-full w-full center">Price</h1>
        <h1 className="col-span-2 h-full w-full center">Quantity</h1>
        <h1 className="col-span-2 h-full w-full center">Subtotal</h1>
      </div>
      <section>
        {cart?.items?.map((item, index) => (
          <div
            className="grid grid-cols-12 place-items-center text-sm my-10 md:my-0"
            key={item.product._id}
          >
            <div className="col-span-6 center gap-4 h-full w-full">
              <div className="relative h-32 w-32">
                <Image
                  src={item.product.coverImage}
                  alt="product image"
                  fill={true}
                  className="object-contain h-full w-full"
                />
              </div>
              <div className="text-gray-400 h-full w-full center">
                {item.product.title}
              </div>
            </div>
            {/* mobile screen */}
            <div className="flex md:hidden flex-col col-span-6 gap-2">
              <h1 className="col-span-2 h-full w-full center">
                {`Price : ${item.product.sale_price}`}
              </h1>
              <div className="col-span-2 h-full w-full center gap-2">
                <h1>{`Subtotal : ${
                  item.product.sale_price * item.quantity
                }`}</h1>
                
              </div>
              <div className="center gap-4 col-span-2 h-full w-full center">
                <ButtonBordered
                  disabled={isDecreasing}
                  onClick={() =>
                    handleDecreaseQuantity(item.product._id, item.quantity)
                  }
                  className="hover:bg-ydark hover:text-white border-ylight"
                >
                  -
                </ButtonBordered>
                <h1>{item.quantity}</h1>
                <ButtonBordered
                  disabled={isIncreasing}
                  onClick={() =>
                    handleIncreaseQuantity(item.product._id, item.quantity)
                  }
                  className="hover:bg-ydark hover:text-white border-ylight"
                >
                  +
                </ButtonBordered>
              </div>
              <ButtonFilled
                  disabled={isDeleting}
                  className="text-xs hover:text-red-500 disabled:text-gray-400"
                  onClick={() => handleDeleteCartItem(item.product._id)}
                >
                  Delete item
                </ButtonFilled>
            </div>
            {/* bigger screens */}
            <h1 className="col-span-2 h-full w-full md:flex justify-center items-center hidden">
              {item.product.sale_price}
            </h1>
            <div className=" gap-4 col-span-2 h-full w-full md:flex justify-center items-center hidden">
              <ButtonBordered
                disabled={isDecreasing}
                onClick={() =>
                  handleDecreaseQuantity(item.product._id, item.quantity)
                }
                className="hover:bg-ydark hover:text-white border-ylight"
              >
                -
              </ButtonBordered>
              <h1>{item.quantity}</h1>
              <ButtonBordered
                disabled={isIncreasing}
                onClick={() =>
                  handleIncreaseQuantity(item.product._id, item.quantity)
                }
                className="hover:bg-ydark hover:text-white border-ylight"
              >
                +
              </ButtonBordered>
            </div>
            <div className="col-span-2 h-full w-full md:flex justify-center items-center hidden gap-2">
              <h1>{item.product.sale_price * item.quantity}</h1>
              <button
                disabled={isDeleting}
                className="text-ydark hover:text-red-500 disabled:text-gray-400 text-xl"
                onClick={() => handleDeleteCartItem(item.product._id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Usercart;
