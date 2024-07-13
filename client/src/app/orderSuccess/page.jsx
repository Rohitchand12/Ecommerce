"use client"
import { useSearchParams } from "next/navigation"


function OrderSuccess() {
 
  const search = useSearchParams();
  const referenceid = search.get('referenceid');
  return (
    <div className='h-screen w-screen center flex-col gap-1'>
        <div className="text-3xl font-bold">
            Order Successful!
        </div>
        <div className="text-xs">{`Reference no. ${referenceid}`}</div>
    </div>
  )
}

export default OrderSuccess