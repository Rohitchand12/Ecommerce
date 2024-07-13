import React from 'react'

function RadioButtons({address,name,onChange,id,checked}) {
  return (
    <div className='h-full w-full center gap-2'>
        <input
        type="radio"
        name = {name}
        checked={checked}
        value={JSON.stringify(address)}
        id = {id}
        onChange={(e)=>onChange(JSON.parse(e.target.value))}
        />
        <label className='flex flex-col gap-2 border-2 border-gray-300 rounded-md h-full w-full p-5' htmlFor={id}>
            <div><span className='font-bold'>City: </span>{address.city}</div>
            {address.street && <div><span className='font-bold'>Street: </span>{address.street}</div>}
            <div><span className='font-bold'>Location: </span>{address.location}</div>
            <div><span className='font-bold'>Pincode: </span>{address.pinCode}</div>
            <div><span className='font-bold'>Country: </span>{address.country}</div>
        </label>
    </div>
  )
}

export default RadioButtons