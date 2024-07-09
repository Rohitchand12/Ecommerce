import ButtonFilled from "@/ui/ButtonFilled";

function Checkout(total) {
  console.log("total from checkout -- >", total.total);
  if (total.total === "cart empty") return <div>Cart is empty</div>;
  return (
    <section className="col-span-4 h-72 w-full center flex-col gap-5 p-8 bg-ylighter rounded-md">
      <h1 className="text-2xl font-bold h-1/2 w-full center">Cart total</h1>
      <div className="center gap-5">
        <h1 className=" text-xl font-semibold">Total</h1>
        <h1 className="text-xl font-semibold text-ydark">Rs. {total.total || "Cart empty"}</h1>
      </div>
      <div className="w-full center">
        <ButtonFilled className="w-3/4 rounded-md">Checkout</ButtonFilled>
      </div>
    </section>
  );
}

export default Checkout;
