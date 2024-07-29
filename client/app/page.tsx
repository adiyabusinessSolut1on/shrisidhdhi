
import Banner from "./components/banner";
import { DummyData } from "./data";
import ProductCard from "./components/productcard";
import { NextArrow ,PrevArrow} from "./helpers/sliderhelper";
import './globals.css';
interface Banner {
  image: string;
  title: string;
  link: string;
}
export default function Home() {
  const banners:Banner[] = [
    {
      image: "/banner/img1.jpg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      link: "#",
    },
    {
      image: "/banner/img2.jpg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      link: "#",
    },
    {
      image: "/banner/img3.jpg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      link: "#",
    },
    {
      image: "/banner/img4.jpg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      link: "#",
    },
    {
      image: "/banner/img5.jpg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      link: "#",
    },
    {
      image: "/banner/img6.jpg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      link: "#",
    },
    {
      image: "/banner/img7.jpg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      link: "#",
    },
    {
      image: "/banner/img8.jpg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      link: "#",
    },
    {
      image: "/banner/img9.jpg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      link: "#",
    },
    {
      image: "/banner/img10.jpg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      link: "#",
    },
  ];
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
  return (
    <main className=" bg-custom-image"  >
   <Banner banners={banners} settings={settings}/>
   <div className="m-auto max-w-[1200px] flex mx-auto flex-col p-5 gap-8 relative">
        <h2 className="m-0 leading-tight text-center no-underline z-0 text-custom-purple normal-case font-light tracking-normal text-2xl">
          Products
        </h2>
        <div className="gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {DummyData?.map((item, index) => {
            return (
              <div key={index}className="bg-[#f7e4d9] rounded-[5px]">
                <ProductCard
                  name={item?.name}
                  image={item?.image}
                  price={item?.price}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
