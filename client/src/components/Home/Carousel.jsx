"use client";
import Image from "next/image";
import banner1 from "../../../public/banner2.jpg";
import banner2 from "../../../public/banner3.jpg";
import banner3 from "../../../public/banner4.jpg";
import banner4 from "../../../public/banner5.jpg"
import { useEffect, useState } from "react";

const banners = [banner1, banner2, banner3, banner4];

function Carousel() {
  const [current, setCurrent] = useState(0);
  useEffect(()=>{
    const interval = setInterval(()=>{
      setCurrent(prev=> prev === banners.length-1 ? 0 : prev+1);
    },5000)

    return ()=>{
      clearInterval(interval);
    }
  },[])
  return (
    <div className="relative md:h-[calc(100vh-80px)] w-full overflow-hidden bg-ylight py-4">
      <div
        className="w-full h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {banners.map((banner, index) => {
          return (
            <div key= {index} className="relative flex-shrink-0 w-screen h-80 md:h-[calc(100vh-80px)] flex bg-ylight">
              <Image
                alt="banners"
                src={banner}
                fill={true}
                className="object-contain h-full w-full"
              />
            </div>
          );
        })}
      </div>
      <div className="absolute left-1/2  transform -translate-x-1/2  bottom-5 md:bottom-8 flex gap-4">
        {banners.map((banner, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 ring-1 ring-gray-600 center rounded-full cursor-pointer ${
              current === index ? "scale-150" : ""
            }`}
          >
            {current === index && (
              <div className="h-[6px] w-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
