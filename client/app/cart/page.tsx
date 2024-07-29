"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { incrementQuantity, decrementQuantity, removeFromCart, CartItem } from '../reducer/cartReducer';
import Image from 'next/image';
import DeleteSVG from '../svg/deleSVG';
import Link from 'next/link';
import "../globals.css"
const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state?.cart);


  const handleIncrement = (id: string) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrement = (id: string) => {
    dispatch(decrementQuantity({ id }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <div className=" max-w-screen-xl mx-auto px-4 py-8 flex gap-6 flex-col md:flex-row lg:flex-row">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cart?.items?.length > 0 ? (
          <div>
            <ul className="space-y-4 border border-[#ea7633] rounded-lg">
              {cart?.items?.map((item:CartItem,index:number) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-[#ea7633] rounded-lg"
                >
                  <Image
                    height={1000}
                    width={1000}
                    quality={100}
                    priority
                    src={item?.image}
                    alt={item?.name}
                    className="w-16 h-16 object-cover"
                  />
                  <span className="flex-1 ml-4">{item?.name}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecrement(item?.id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item?.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item?.id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                  <span className="ml-4">₹{item?.price}</span>
                  <i
                    onClick={() => handleRemove(item?.id)}
                    className="ml-4 cursor-pointer px-2 py-1  text-white rounded"
                  >
                    <DeleteSVG height={25} width={25} fill={"#d52020"} />
                  </i>
                  {/* <button
                  onClick={() => handleRemove(item.id)}
                  className="ml-4 px-2 py-1 bg-red-500  text-white rounded"
                >
                  Remove
                </button> */}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h2 className="text-xl font-bold">
                Total Price: ₹{cart?.totalPrice.toFixed(2)}
              </h2>
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      {cart?.items?.length > 0 && (
        <div className="  w- full min-w-[300px] p-3  border border-[#a6a5a5] rounded-[7px]">
          <h3 className="text-[20px] font-[600] p-1 bg-footer-custome rounded-[5px] text-center text-[#f8f8f8]">
            BAG TOTAL
          </h3>
          <div className="p-3 flex flex-row justify-between border-b border-gray-200">
            <p>Sub-Total</p>
            <p>₹{cart?.totalPrice}</p>
          </div>
          <div className=" p-3 flex flex-row justify-between ">
            <p>Total</p>
            <p>₹{cart?.totalPrice}</p>
          </div>
          <Link
            href="/checkout"
            className="w-full  text-center font-[600] text-[#272525]  "
          >
          <div className='bg-button rounded-[7px] p-2 w-full'>
         
            PROCEED TO CHECKOUT
      
          </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
