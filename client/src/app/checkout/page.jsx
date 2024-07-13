import bgimage from "../../../public/gym.jpg";
import Image from "next/image";
import brand from "../../../public/brand.svg";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import fetchAddress from "@/libs/fetchAddress";
import UserAddresses from "@/components/checkout/UserAddresses";
import fetchCart from "@/libs/fetchCart";

async function Checkout() {
  const addresses = await fetchAddress();
  const cart = await fetchCart();
  
  return (
    <section className="pb-5 h-full w-full">
      <div className="relative h-28 md:h-48 w-full">
        <div
          style={{ backgroundImage: `url(${bgimage.src})` }}
          className="absolute inset-0 center bg-cover opacity-50"
        >
          {/* background image*/}
        </div>
        <div className="relative center h-full">
          <div className="center flex-col gap-2">
            <Image src={brand} alt="Brand image" height={32} width={50} />
            <h1 className="text-2xl font-semibold">Checkout</h1>
          </div>
        </div>
      </div>
      <section className="grid grid-cols-12 px-4 md:px-20 py-10 md:py-20 md:gap-20">
        {/* user addresses */}
       <UserAddresses addresses = {addresses}/>
        <CheckoutSummary cart = {cart} />
      </section>
    </section>
  )
}

export default Checkout