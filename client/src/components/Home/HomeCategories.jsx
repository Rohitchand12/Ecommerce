import fetchHomepage from "@/libs/fetchHomepage";
import Image from "next/image";

function HomeCategories({categories}) {
  
  return (
    <section className="min-h-[60vh] my-10 px-5 md:px-14 center flex-col gap-14">
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-wide">
          Browse the collection
        </h1>
        <p>Explore sports, clothing, electronics, and many more</p>
      </div>

      <div className="h-full w-full grid grid-cols-12 gap-2 md:gap-8">
        {categories.map((category) => {
          return (
            <div
              className="center flex-col p-8 h-full gap-4 col-span-6 lg:col-span-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              key={category._id}
            >
              <h1 className="text-xl font-semibold">{category._id}</h1>
              <div className="relative h-40 w-full">
                <Image
                  className="object-contain"
                  src={category.image}
                  sizes="50%"
                  alt="category image"
                  fill={true}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HomeCategories;
