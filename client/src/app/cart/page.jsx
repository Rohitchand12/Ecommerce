import fetchCart from "@/libs/fetchCart";
import bgimage from "../../../public/gym.jpg";
import Image from "next/image";
import brand from "../../../public/brand.svg";
import Usercart from "@/components/cart/Usercart";
import Checkout from "@/components/cart/Checkout";
async function Cart() {
  const cart = await fetchCart();
  console.log("cart items are -- >", cart);
  return (
    <section className="pb-5">
      <div className="relative h-28 md:h-48 w-full">
        <div
          style={{ backgroundImage: `url(${bgimage.src})` }}
          className="absolute inset-0 center bg-cover opacity-50"
        >
          {/* background image*/}
        </div>
        <div className="relative  center h-full">
          <div className="center flex-col gap-2">
            <Image src={brand} alt="Brand image" height={32} width={50} />
            <h1 className="text-2xl font-semibold">Cart</h1>
          </div>
        </div>
      </div>
      <section className="grid grid-cols-12 px-4 md:px-10 py-5 gap-5">
        {/* cart */}
        <Usercart cart = {cart.data.cart}/>
        {/* cart subtotal and checkoout */}
        <Checkout total = {cart.data?.cart?.totalPrice || "cart empty"}/>
      </section>
    </section>
  );
}

export default Cart;
