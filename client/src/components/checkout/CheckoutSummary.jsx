"use client";
import { useEffect } from "react";
import ButtonFilled from "@/ui/ButtonFilled";
import createPayment from "@/libs/createPayment";
import fetchKey from "@/libs/fetchKey";
import brand from "../../../public/brand.svg";
import { useAddressStore, useUserStore } from "@/store/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import createOrder from "@/libs/createOrder";
import verifyPayment from "@/libs/verifyPayment";

function CheckoutSummary({ cart }) {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const address = useAddressStore((state) => state.address);
  const updateAddress = useAddressStore((state) => state.updateAddress);
  // const [isClosed, setIsClosed] = useState(false);

  console.log("cart from checkout page -- >", cart);
  async function checkoutHandler(amount) {
    if (address === null) {
      toast.error("Please select a delivery address!");
      return;
    }
    const { key } = await fetchKey();
    const {
      data: { order },
    } = await createPayment(amount);
    let redirectURL = `${process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL}/payments/verifypayment`;
    if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
      redirectURL = `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/payments/verifypayment`;
    }
    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "mystickart",
      description: "product checkout payment",
      image: brand.src,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: redirectURL,
      prefill: {
        name: user.name,
        email: user.email,
        contact: "9000090000",
      },
      handler: async function (response) {
        //handling successful payment response
        console.log("response after success -- >", response);
        const products = cart.data.cart.items.map((item) => item.product._id);
        const payment = { ...response, user: user._id };
        const shipping = { address, user: user._id };
        try{
          const verificationResponse = await verifyPayment(response)
          await createOrder({
           products,
           payment,
           shipping,
           status: "pending",
           totalAmount: cart.data.cart.totalPrice,
         });
         toast.success("order placed successfully!");
         router.replace(`/orderSuccess?referenceid=${verificationResponse.referenceid}`)
         updateAddress(null);
        }catch(error){
          toast.error("Failed to place order!")
        }

      },
      modal: {
        ondismiss: function () {
          toast.error("payment window was closed!");
          // Handle the scenario when the user closes the payment window
        },
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#B88E2F",
      },
    };
    const rzpay = new window.Razorpay(options);
    rzpay.open();
  }
  return (
    <section className="col-span-12 md:col-span-7 flex flex-col gap-5 mt-10 md:mt-0">
      <div className="col-span-12 grid grid-cols-12">
        <h1 className="col-span-6 font-semibold text-xl center">Product</h1>
        <h1 className="font-semibold text-xl col-span-6 center">Subtotal</h1>
      </div>
      <div className="grid grid-cols-12">
        {cart.data.cart.items.map((item, index) => (
          <div key={index} className="col-span-12 grid grid-cols-12 gap-8">
            <p className="col-span-6 center p-3 text-sm gap-2">
              <span className="text-gray-400">{`${item.product.title} x`}</span>{" "}
              <span>{`${item.quantity}`}</span>
            </p>
            <p className="col-span-6 center p-3 text-sm">
              Rs.{item.product.sale_price * item.quantity}
            </p>
          </div>
        ))}
      </div>
      <div className="col-span-12 grid grid-cols-12 text-sm">
        <h1 className="col-span-6 font-semibold center">Subtotal</h1>
        <h1 className="col-span-6 font-semibold center">
          Rs.{cart.data.cart.totalPrice}
        </h1>
      </div>
      <div className="col-span-12 grid grid-cols-12">
        <h1 className="col-span-6 font-semibold text-xl center">Total</h1>
        <h1 className="col-span-6 font-bold text-ydark text-2xl center">
          Rs.{cart.data.cart.totalPrice}
        </h1>
      </div>
      <hr className="text-gray h-2"></hr>
      <ButtonFilled
        disabled={!address}
        className="disabled:bg-ylight"
        onClick={() => checkoutHandler(cart.data.cart.totalPrice)}
      >
        Proceed to payment
      </ButtonFilled>
    </section>
  );
}

export default CheckoutSummary;
