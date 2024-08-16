"use client"
import Banner from "./components/banner";
import { DummyData } from "./data";
import ProductCard from "./components/productcard";
import { NextArrow ,PrevArrow} from "./helpers/sliderhelper";
import './globals.css';
import { useGetBanner, useGetProduct } from "./api-request/quaries";
import Loader from "./components/loader";
import { BannerGetType, ProductGetType } from "./api-request/types";


export default function Home() {

  const {data, isLoading,isError}=useGetBanner();
  const{data:product,isLoading:loading,isError:err}=useGetProduct();

  console.log("data banner>>>",product);
 
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  if (isLoading||loading) return <Loader/>;
  if (isError||err) return <p>Error occurred</p>;
  return (
    <main className=" bg-custom-image"  >
   <Banner banners={data ?? []} settings={settings}/>
   <div className="m-auto max-w-[1200px] flex mx-auto flex-col p-5 gap-8 relative">
        <h2 className="m-0 leading-tight text-center no-underline z-0 text-custom-purple normal-case font-light tracking-normal text-2xl">
          Products
        </h2>
        <div className="gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {product?.map((item:ProductGetType, index:number) => {
            return (
              <div key={index}className="bg-[#f7e4d9] rounded-[5px]">
                <ProductCard
                  name={item?.name}
                  image={item?.images}
                  price={item?.price}
                  slug={item?.slug}
                  _id={item?._id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
