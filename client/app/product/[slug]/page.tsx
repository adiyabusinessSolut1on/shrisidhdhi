"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import TabsContent from "../tabs";
import MinusSVG from "../../svg/minussvg";
import PlusSVG from "../../svg/plussvg";
import { useDispatch,useSelector  } from "react-redux";
import { addToCart } from "../../reducer/cartReducer";
import "../../globals.css"
import { useGetSinglProduct } from "@/app/api-request/quaries";
import Loader from "@/app/components/loader";
import ImageCarousel from "../image-caresel";


const ProductPage = ({ params }: { params: { slug: string } }) => {
  const dispatch = useDispatch();
  // const cart = useSelector((state: RootState) => state.cart.items);
  const {data,isLoading,isError}=useGetSinglProduct({slug:params.slug})

const [productdat,setProductData]=useState({
  id:"" as string,
  name:"" as string,
  slug:"" as string,
  price:0 as number,
  discription:"" as string,
  quantity:1,
  category:"" as string,
  images:[] as string[],
})
const[currentimage,setCurrentImage]=useState("")

useEffect(()=>{
  setProductData({
    id:data?._id||"",
    name:data?.name||"",
  slug:data?.slug||"",
  price:data?.price||0,
  quantity:1,
  discription:data?.discription||"",
  category:data?.category||"",
  images:data?.images||[],
  })
  setCurrentImage(data?.images[0]?data?.images[0]:"")
},[data])
console.log("data in single Product>>>",productdat);
  const [prod, setData]=useState({
    id: "hgg467373b",
    quantity:1,
    price: 567,
    image: "/banner/img10.jpg",
    name: "loren ipsum comet gracias",
  })

  const handleAddToCart = () => {
    const cartpayload={
      id:productdat?.id,
      quantity:productdat?.quantity,
      price:productdat?.price,
      image:productdat?.images[0],
      name:productdat?.name
    }
    dispatch(addToCart(cartpayload));
  };



  const discount = "103.80Rs";
  const couponCode = "EXTRA 20";
  const rating = "4.2";
const [activeTab,setActiveTab]=useState("Description")

const HandleIncreament=()=>{
  
  setProductData({...productdat,quantity:productdat?.quantity+1})
}
const HandleDecrease = () => {
  if (productdat?.quantity > 1) {
    setProductData({ ...productdat, quantity: productdat?.quantity - 1 });
  }
};
if (isLoading) return <Loader/>;
if (isError) return <p>Error occurred</p>;
  return (
    <div className="bg-custom-image">
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <Image src={currentimage} priority alt={productdat?.name} width={1000} height={1000} quality={100} className="w-full max-w-[500px] max-h-[400px]" />
         <ImageCarousel
          selected={(value: any) => setCurrentImage(value)}
          imagesArray={productdat?.images as any}
         />
          {/* <div className="flex gap-2 mt-4">
            {productdat?.images?.map((img:string,inde:number)=>{
              return <Image key={inde} onClick={()=>setCurrentImage(img)} src={img} width={100} priority height={100} quality={100} alt="thumbnail" className="w-24 h-24 object-cover cursor-pointer" />
            })}
    
          </div> */}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-serif text-[#595478]">{productdat?.name}</h1>
          <div className="text-xl text-[#464260] font-semibold">Price: {productdat?.price}Rs</div>
          <div className="text-green-600">Save: {discount} even more with extra 20%</div>
          <div className="text-red-500">Get 20% OFF use Coupon code {couponCode}</div>
          <div className="flex items-center mt-4">
            <div className="text-green-600">{`Great ${rating} out of 5`}</div>
            <div className="ml-2 text-xs text-gray-400">Goole Analytics</div>
          </div>
          <div className="mt-4">
            <label className="block font-semibold">200grm</label>
          </div>
          <div className="mt-4 font-semibold">
           For Whole Sale <Link className="text-blue-600 " href={"/about-us"}>Contact use</Link>
          </div>
         <div className="flex flex-row items-center gap-3 py-3">
          <label>Quantity :</label>
          <div className="flex flex-row items-center gap-2  border border-gray-300 p-1 rounded-[5px]">
            <i onClick={HandleDecrease} className="cursor-pointer"><MinusSVG fill={"#000"} height={20} width={20}/></i>
            <p className="p-1">{productdat?.quantity}</p>
            <i onClick={HandleIncreament} className="cursor-pointer"><PlusSVG fill={"#000"} height={20} width={20}/></i>
          </div>
         </div>
          <div className="mt-4">
            <button onClick={handleAddToCart} className="w-full py-3 bg-button text-white font-bold rounded">ADD TO BASKET</button>
          </div>
        </div>
      </div>

      
    </div>
    <div className="p-4 mt-10 bg-[#f7e4d9] ">
        <div className="flex gap-8 justify-center max-w-screen-lg mx-auto">
      {Tabs?.map((tabName:string,index:number)=>{
        return(
          <div key={index} className={`gap-4 cursor-pointer p-1 rounded-[3px] text-[20px] font-[500] ${tabName === activeTab? "border-b-2 text-[#747373]  border-[#747373] font-[600]" : "text-[#1e1d1d]"}`} onClick={()=>setActiveTab(tabName)}>
            {tabName}
            </div>
        )
      })}
      </div>
      <TabsContent productName={productdat?.name} tab={activeTab} description={productdat?.discription}  productId={productdat?.id}/>
      </div>
    </div>
  );
};

export default ProductPage;

const Tabs=[
  "Description","Reviews","Return Policy","Delivery Policy"
]