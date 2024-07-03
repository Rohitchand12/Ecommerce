import fetchCart from "@/libs/fetchCart"
async function Cart() {
  const cart = await fetchCart();
  console.log(cart);
  return (
    <div>
      Cart
    </div>
  )
}

export default Cart