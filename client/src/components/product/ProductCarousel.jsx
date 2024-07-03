"use client";
import Image from "next/image";
import { Autoplay, Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/free-mode';
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
function ProductCarousel({ productImages }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex,setActiveIndex] = useState(0);
  return (
    <section className="md:w-1/2 lg:w-[60%] bg-ylight">
      <Swiper
        style={{
          '--swiper-navigation-color': '#B88E2F',
          '--swiper-pagination-color': '#B88E2F',
        }}
        navigation
        pagination={{ type: "bullets", clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs, FreeMode , Pagination]}
        onSlideChange={(swiper)=>setActiveIndex(swiper.realIndex)}
      >
        {productImages?.map((image) => (
          <SwiperSlide
            className="!flex justify-center items-center"
            key={image._id}
          >
            <div className="relative h-80 w-80">
              <Image
                src={image.url}
                alt="image"
                fill={true}
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-20 mt-10"
      >
        {productImages.map((image,index) => (
          <SwiperSlide
            className={`!flex justify-center items-center`}
            key={image._id}
          >
            <div className="relative h-80 w-80">
              <Image
                src={image.url}
                alt="image"
                fill={true}
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default ProductCarousel;
