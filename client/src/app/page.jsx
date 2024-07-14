import Carousel from "@/components/Home/Carousel";
import fetchHomepage from "@/libs/fetchHomepage";
import HomeCategories from "@/components/Home/HomeCategories";
import HomeProducts from "@/components/Home/HomeProducts";
import CatCarousel from "@/components/Home/CatCarousel";
import { Suspense } from "react";

async function Home() {
   const home=  await fetchHomepage();
  const categories = home?.data.homePage[0].categories;
  const products = home?.data.homePage[0].products;
  return (
      <div className="h-full w-full flex flex-col gap-8 font-sans ">
        <Carousel />
        <Suspense fallback={<p>loading...</p>}>
          <HomeCategories categories = {categories}/>
        </Suspense>
        <CatCarousel />
        <Suspense fallback={<p>loading...</p>}>
          <HomeProducts products={products}/>
        </Suspense>
      </div>
  );
}

export default Home;
