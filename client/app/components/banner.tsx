"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Image from 'next/image';


interface Banner {
  title: string;
  image: string;
  link: string;
}

interface CustomSliderProps {
  banners: Banner[];
  settings: {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    arrows?: boolean;
    autoplay?: boolean;
    autoplaySpeed?: number;
    nextArrow?: React.ReactNode;
    prevArrow?: React.ReactNode;
  };
}

const CustomSlider: React.FC<CustomSliderProps> = ({ banners, settings }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideCount = banners.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (settings.autoplay) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
      }, settings.autoplaySpeed || 3000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [settings.autoplay, settings.autoplaySpeed, slideCount]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
  };

  const { transform } = useSpring({
    transform: `translateX(-${(currentIndex / (settings.slidesToShow || 1)) * 100}%)`,
    config: { tension: 280, friction: 60 },
  });

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative w-full">
        <animated.div
          style={{ transform }}
          className="flex transition-transform duration-500"
        >
          {banners.map((banner,index) => (
            <div key={index} className={`relative w-full flex-shrink-0 ${settings.slidesToShow ? `w-${100 / settings.slidesToShow}%` : 'w-full'}`}>
              <div className="relative w-full h-[33rem]">
                <Image
                  src={banner.image}
                  alt={`Banner ${index}`}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50">
                  <h1 className="text-3xl font-bold md:text-5xl">{banner.title}</h1>
                  <a
                    href={banner.link}
                    className="mt-4 px-6 py-2 text-lg font-medium text-white bg-purple-600 rounded hover:bg-purple-700"
                  >
                    Check Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </animated.div>
        {settings.arrows && (
          <>
            {settings.prevArrow && (
              <div
                className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={handlePrev}
              >
                {settings.prevArrow}
              </div>
            )}
            {settings.nextArrow && (
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={handleNext}
              >
                {settings.nextArrow}
              </div>
            )}
          </>
        )}
        {settings.dots && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-gray-500'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSlider;
