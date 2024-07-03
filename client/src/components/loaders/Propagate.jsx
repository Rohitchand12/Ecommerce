"use client"
import { PropagateLoader } from 'react-spinners'

function Propagate() {
  return (
    <PropagateLoader
    className='text-ydark bg-ydark'
    size={20}
    color="#B88E2F"
    speedMultiplier={1.5}
    />
  )
}

export default Propagate