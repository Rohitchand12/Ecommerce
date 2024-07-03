"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import gymFit from "../../../public/clothing.jpg";
import gym from "../../../public/gym.jpg";
import clothing from "../../../public/women.jpg";
import ButtonFilled from "@/ui/ButtonFilled";

const slides = [
  {
    id: 0,
    image: clothing,
    text: "Women fashion",
  },
  {
    id: 1,
    image: gymFit,
    text: "gym wears",
  },
  {
    id: 2,
    image: gym,
    text: "Gym equipments",
  },
];

function CatCarousel() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <section className="min-h-[80vh] bg-ylighter grid grid-cols-12">
      {/* left section */}
      <div className="col-span-5 h-full w-full center flex-col">
        <div className="w-1/2 flex flex-col gap-2">
          <h1 className="text-4xl font-bold">20+ categories to explore</h1>
          <p>Get all you need, go mystic !</p>
          <ButtonFilled className="center w-1/2 mt-5">Explore now</ButtonFilled>
        </div>
      </div>
      {/* right section  */}
      <div className="w-full h-full border border-gray-300 col-span-7">
        <div className="relative h-full">
          {slides.map((slide,index) => (
            <div
              key={index}
              className={`absolute  inset-0 h-full w-full bg-ylighter transition-all duration-1000 ease-in-out ${current === index ? " opacity-100" : " opacity-0"}`}
            >
              <Image
                alt="slide image"
                src={slide.image}
                fill={true}
                className="object-cover "
                sizes="100%"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CatCarousel;
