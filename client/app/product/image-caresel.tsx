/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import ArrowLeft from "../svg/arroeLefSVG";
import ArrowRight from "../svg/arrowRightSVG";

interface ImageTypes {
  source: string;
  [K: string]: any;
}

interface ImageCarouselProps {
  imagesArray: ImageTypes[];
  selected: (value: ImageTypes) => void;
}

const ImageCarousel = ({ imagesArray, selected }: ImageCarouselProps) => {
  const containerRef = React.useRef<HTMLUListElement>(null);
  const gapping = 10;
  const imageWidth = 100;
  const totalScroll = imageWidth + gapping;

  const scrollLeft = React.useCallback(() => {
    containerRef.current?.scrollBy({
      behavior: "smooth",
      left: -totalScroll,
    });
  }, [totalScroll]);
  const scrollRight = React.useCallback(() => {
    containerRef.current?.scrollBy({
      behavior: "smooth",
      left: totalScroll,
    });
  }, [totalScroll]);

  const onSelectImage = React.useCallback(
    (data: ImageTypes) => {
      if (selected) {
        selected(data);
      }
    },
    [selected]
  );

  return (
    <div className="flex flex-row items-center gap-2 mt-4">
      <span onClick={scrollLeft}  className="cursor-pointer">
        <ArrowLeft fill="#000" height={32} width={32} />
      </span>
      <ul ref={containerRef} className="flex gap-4">
        {imagesArray?.map((data: any, index) => (
          <li key={index} onClick={() => selected(data)} >
            <Image priority width={150} height={150} src={data} alt="image-carousel"  className=" cursor-pointer border border-[#767575e1]" />
          </li>
        ))}
      </ul>
      <span onClick={scrollRight}  className="cursor-pointer">
        <ArrowRight fill="#000" height={32} width={32}/>
      </span>
    </div>
  );
};

export default ImageCarousel;
