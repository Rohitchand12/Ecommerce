import ButtonBordered from "@/ui/ButtonBordered";
import Image from "next/image";
function Usercart(cart) {
  console.log("from user cart --> ", cart?.cart?.items);
  return (
    <div className="col-span-12 md:col-span-8">
      <div className="grid grid-cols-12 p-5 font-semibold bg-ylighter place-items-center">
        <h1 className="col-span-6 h-full w-full center">Product</h1>
        <h1 className="col-span-2 h-full w-full center">Price</h1>
        <h1 className="col-span-2 h-full w-full center">Quantity</h1>
        <h1 className="col-span-2 h-full w-full center">Subtotal</h1>
      </div>
      <section>
        {cart?.cart?.items?.map((item, index) => (
          <div
            className="grid grid-cols-12 place-items-center text-sm "
            key={index}
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
              <div className="text-gray-400 h-full w-full center">{item.product.title}</div>
            </div>
            <h1 className="col-span-2 h-full w-full center">{item.product.sale_price}</h1>
            <div className="center gap-4 col-span-2 h-full w-full center">
              <ButtonBordered className="hover:bg-ydark hover:text-white">-</ButtonBordered>
              <h1>{item.quantity}</h1>
              <ButtonBordered className="hover:bg-ydark hover:text-white">+</ButtonBordered>
            </div>
            <h1 className="col-span-2 h-full w-full center">
              {item.product.sale_price * item.quantity}
            </h1>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Usercart;
