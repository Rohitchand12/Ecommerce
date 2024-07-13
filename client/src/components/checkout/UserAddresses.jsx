"use client"
import { useState ,useEffect} from "react";
import { useAddressStore } from "@/store/store";
import ButtonFilled from "@/ui/ButtonFilled";
import RadioButtons from "@/ui/RadioButtons";
import AddressForm from "./AddressForm";

function UserAddresses({ addresses }) {
    const [isAdding, setIsAdding] = useState(false)
    const updateAddress = useAddressStore(state=>state.updateAddress);
    const address = useAddressStore(state=>state.address);
    console.log("address is --> ",address);
    useEffect(()=>{
      updateAddress(null);
    },[])
    function handleUpdateAddress(address){
        updateAddress(address);
    }

  return (
    <div className="col-span-12 md:col-span-5 h-full w-full center flex-col gap-8">
        <h1 className="text-2xl font-bold">Addresses</h1>
      {(!isAdding && addresses.shipments.length > 0) && addresses.shipments.map((shipment, index) => (
        <RadioButtons key={shipment._id} id = {shipment._id} checked = {address !== null && JSON.stringify(address) === JSON.stringify(shipment.address)} address={shipment.address} name="address" onChange={handleUpdateAddress}/>
      ))}
      {isAdding && <AddressForm onSuccess={()=>setIsAdding(false)}/>}
      <ButtonFilled onClick ={()=>setIsAdding((prev)=>!prev)}>{isAdding ? "Back" : "Add address"}</ButtonFilled>
    </div>
  );
}

export default UserAddresses;
