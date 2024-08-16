import Image from "next/image";
import "../globals.css"
import Link from "next/link";
import { ItemWithImage } from "../types";

const ProductCard = ({ name, image, price,slug,_id }: ItemWithImage) => {
  console.log("image data image>>>",image)
  return (
    <Link
    href={`/product/${slug}`}
      className="relative flex flex-col gap-[20px] "
      
    >
      <div className="cursor-pointer">
        <div className="cursor-pointer">
          <span className="box-border block overflow-hidden w-auto h-auto bg-none relative opacity-1">
            <span className="box-border block w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-[70%_0_0_0]"></span>
            <Image
              src={image[0]}
              priority
              width={500} 
              height={500}
              quality={100}
              alt={name}
              className="absolute hover:scale-2 inset-0 box-border p-0 border-none m-auto block  min-w-full max-w-full min-h-full max-h-full hover:scale-110 transition-all duration-[600ms] ease-custom"
            />
          </span>
        </div>
        <div className="px-5 mb-4 bg-transparent flex flex-col gap-2 h-full w-full items-center justify-start">
          <h3 className="uppercase font-medium text-center text-[rgb(89,84,120)] tracking-wide text-[16px] leading-5 mt-2 mb-0 truncate-overflow">
            {name}
          </h3>
          <p className=" font-medium text-center text-custom-gray-600 tracking-wide text-[16px] leading-5 mt-1 mb-0 overflow-hidden">
            {" "}
            from <strong>{price}Rs</strong>
          </p>
          <p className="inline-block w-auto mx-0 px-0 text-custom-gray-600 text-center leading-relaxed uppercase-normal no-underline text-xs font-normal">
            dispatch in 2 days
          </p>
          <div className="px-6 py-1 mx-0 text-white bg-button text-center leading-relaxed flex justify-center items-center w-full text-base rounded-md z-0 font-extrabold transition-all duration-400 ease-in-out tracking-wide uppercase cursor-pointer">
            View Product
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
