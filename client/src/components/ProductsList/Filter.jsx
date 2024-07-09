"use client"

import { ImEqualizer } from "react-icons/im";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import star from "../../../public/star.png";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import PriceSlider from "./PriceSlider";

function Filter({categories}) {
  
  //states
  const [dropDown, setDropDown] = useState({
    price: false,
    ratings: false,
  });
  const [filterOpen, setFilterOpen] = useState(false);
  
  
  //hooks 
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  
  //handlers
  function handleSearch(s) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", s);
    router.replace(
      `${path}${path.includes("?") ? "&" : "?"}${params.toString()}`
    );
    console.log("from filterr = ",searchParams)
  }

  function handleRatingsFilter(rating) {
    const params = new URLSearchParams(searchParams);
    params.set("ratingsAverage[gte]", rating);
    router.replace(
      `${path}${path.includes("?") ? "&" : "?"}${params.toString()}`
    );
  }
  return (
    <section
      className={`sticky top-16 left-0 z-10 font-sans text-xs md:text-sm h-12 w-full bg-ylighter`}
    >
      <div className="h-full w-full grid grid-cols-12 place-content-center place-items-center">
        {/* left  */}
        <div className="w-full h-full col-span-4 md:col-span-6 center gap-8 ">
          <div className="center gap-2">
            <button onClick={() => setFilterOpen((prev) => !prev)}>
              <ImEqualizer />
            </button>
            <h1>Filter</h1>
          </div>
          <BiSolidCategoryAlt />

          <div className="hidden md:block h-full w-[1px] bg-gray-400"></div>

          <p className="hidden md:block">Showing 10 out of 20 results</p>
        </div>
        {/* right  */}
        <div className="w-full h-full col-span-8 md:col-span-6 center gap-5">
          <div className="center gap-2">
            <p>Sort by</p>
            <select
              className="outline-none px-4 py-2"
              onChange={(e) => handleSearch(e.target.selectedOptions[0].id)}
            >
              <option id="createdAt">Latest</option>
              <option id="sale_price">Price : low to high </option>
              <option id="-sale_price">Price : high to low</option>
              <option id="-ratingsAverage">Ratings : high to low</option>
              <option id="ratingsAverage">Ratings : low to high</option>
            </select>
          </div>
        </div>
      </div>

      {/* filter options */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
          initial={{x:-30, opacity:0}}
          animate={{x:0,opacity:1}}
          exit={{x:-30,opacity:0}}
          className="fixed top-28 left-0 w-52 md:w-72 h-[calc(100vh-112px)] overflow-y-scroll bg-white z-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="mt-10 w-full center flex-col">
              <div
                onClick={() => router.replace("/products")}
                className="center h-10 w-full cursor-pointer hover:bg-gray-200"
              >
                {" "}
                All Products{" "}
              </div>
              <div className="cursor-pointer hover:bg-gray-200 w-full h-14 center">
                Categories
              </div>{" "}
              {/*side popup*/}
              <div
                onClick={() => {
                  setDropDown((prev) => {
                    return {
                      ...prev,
                      ratings: !prev.ratings,
                    };
                  });
                }}
                className="cursor-pointer hover:bg-gray-200 w-full h-14 center"
              >
                <div className="flex-grow text-center">Customer Ratings</div>
                <motion.div>
                  {dropDown.ratings ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                </motion.div>
              </div>{" "}
              {/*drop down*/}
              {dropDown.ratings && (
                <div className="w-full py-5 center flex-col bg-gray-100">
                  {[1, 2, 3, 4].map((rating,index) => (
                    <div
                      key={index}
                      onClick={() => handleRatingsFilter(rating)}
                      className="center h-10 w-full cursor-pointer hover:bg-gray-200"
                    >
                      <p className="center">
                        {rating}{" "}
                        <Image
                          alt="rating"
                          src={star}
                          sizes="50%"
                          className="h-[10px] w-[10px] mx-2"
                        />{" "}
                        and above{" "}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="cursor-pointer hover:bg-gray-200 w-full h-14 center">
                Brand
              </div>{" "}
              {/*side popup*/}
              <div
                onClick={() => {
                  setDropDown((prev) => {
                    return {
                      ...prev,
                      price: !prev.price,
                    };
                  });
                }}
                className="cursor-pointer hover:bg-gray-200 w-full h-14 center"
              >
                <div className="flex-grow text-center">Price Range</div>
                <div>
                  {dropDown.price ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                </div>
              </div>{" "}
              {/* drop down*/}
              {dropDown.price && (
                <div className="w-full center py-7 bg-gray-100">
                 <PriceSlider/>
                </div>
              )}
              <div className="cursor-pointer hover:bg-gray-200 w-full h-14 center">
                New arrivals
              </div>{" "}
              {/* no options*/}
              <div className="cursor-pointer hover:bg-gray-200 w-full h-14 center">
                Availability
              </div>{" "}
              {/* no options*/}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Filter;
