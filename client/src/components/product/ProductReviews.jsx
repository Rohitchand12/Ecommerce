import Image from "next/image";
import star from "../../../public/star.png"
import ButtonFilled from "@/ui/ButtonFilled";

function ProductReviews({ reviews }) {
  return (
    <section className="text-sm p-4 w-full md:flex md:flex-col md:justify-center md:items-center md:mt-5">
      <h1 className="text-base md:text-xl font-bold mb-8">Customer reviews</h1>
      <div className="flex flex-col gap-5 justify-center items-center w-full md:p-4 ">
        {reviews.map((review) => (
          <div key={review._id} className="flex flex-col justify-center items-start gap-1 md:w-1/2">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-base font-semibold">{review.user.name}</h1>
              <div className="center gap-2">
                <h2>{review.rating}</h2>
                <Image src={star} height="10" width="10" alt="star"/>
              </div>
            </div>
            <h2 className="italic">{review.review}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductReviews;
