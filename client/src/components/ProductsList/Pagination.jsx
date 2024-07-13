"use client";
import ButtonFilled from "@/ui/ButtonFilled";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

function Pagination({ totalPages }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page"), 10) : 1;
  function handlePagination(nextPage) {
    const params = new URLSearchParams(searchParams);
    params.set("page", nextPage);
    router.replace( `${path}${path.includes("?") ? "&" : "?"}${params.toString()}`);
  }

  return (
    <div className="center gap-8">
      <ButtonFilled
        className="disabled:bg-ylight"
        disabled={currentPage == 1}
        onClick={() => handlePagination(currentPage - 1)}
      >
        prev
      </ButtonFilled>
      <h1>{`${currentPage}/${totalPages}`}</h1>
      <ButtonFilled
        className="disabled:bg-ylight"
        disabled={currentPage == totalPages}
        onClick={() => handlePagination(currentPage + 1)}
      >
        next
      </ButtonFilled>
    </div>
  );
}

export default Pagination;
