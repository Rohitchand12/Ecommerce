import fetchCart from "@/libs/fetchCart"
async function Cart() {
  const cart = await fetchCart();
  console.log(cart);
  return (
    <div>
      {/* {
        cart.data.cart.items.map(item=>{
          return (
            <p key = {item.product._id}>{item.product.title}</p>
          )
        })
      } */}
    </div>
  )
}

export default Cart