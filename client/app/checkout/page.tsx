"use client";
import { FC, useState, ChangeEvent, FormEvent } from "react";
import { validateForm } from "../utils/validationSchema";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { CartItem } from "../reducer/cartReducer";
import "../globals.css"
const CheckoutPage: FC = () => {
  const cart = useSelector((state: RootState) => state?.cart);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    privacyPolicy: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form values:", formValues);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>     <h1 className=" bg-[#f7e4d9] text-3xl font-bold text-center p-4 border-b border-[#ea7633] mb-3">Checkout</h1>
  
    <div className="flex flex-col justify-between gap-5 md:flex-row lg:flex-row max-w-screen-xl mx-auto ">
    
      <form onSubmit={handleSubmit} className="p-8 w-full shadow-md rounded-lg bg-[#e38f5e49] space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            className="outline-none mt-1 block w-full  rounded-md shadow-sm border border-[#ea7633] focus:border-[#ea7633] focus:ring focus:ring-[#ea7633] focus:ring-opacity-50"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="mt-1 block w-full  rounded-md shadow-sm outline-none border border-[#ea7633] focus:border-[#ea7633] focus:ring focus:ring-[#ea7633] focus:ring-opacity-50"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md shadow-sm outline-none border border-[#ea7633] focus:border-[#ea7633] focus:ring focus:ring-[#ea7633] focus:ring-opacity-50"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formValues.address}
            onChange={handleChange}
            className="mt-1 block w-full  rounded-md shadow-sm outline-none border border-[#ea7633] focus:border-[#ea7633] focus:ring focus:ring-[#ea7633] focus:ring-opacity-50"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formValues.city}
            onChange={handleChange}
            className="mt-1 block w-full  rounded-md shadow-sm outline-none border border-[#ea7633] focus:border-[#ea7633] focus:ring focus:ring-[#ea7633] focus:ring-opacity-50"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formValues.state}
            onChange={handleChange}
            className="mt-1 block w-full  rounded-md shadow-sm outline-none border border-[#ea7633] focus:border-[#ea7633] focus:ring focus:ring-[#ea7633] focus:ring-opacity-50"
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="pincode"
            className="block text-sm font-medium text-gray-700"
          >
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formValues.pincode}
            onChange={handleChange}
            className="mt-1 block w-full  rounded-md shadow-sm outline-none border border-[#ea7633] focus:border-[#ea7633] focus:ring focus:ring-[#ea7633] focus:ring-opacity-50"
          />
          {errors.pincode && (
            <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
          )}
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="privacyPolicy"
            name="privacyPolicy"
            checked={formValues.privacyPolicy}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <label htmlFor="privacyPolicy" className="ml-2 text-lg">
            I agree to the Privacy Policy
          </label>
          {errors.privacyPolicy && (
            <p className="text-red-500 text-sm mt-1">{errors.privacyPolicy}</p>
          )}
        </div>
        <button
        disabled={!formValues?.privacyPolicy}
          type="submit"
          className={`w-full py-3  ${formValues?.privacyPolicy?"bg-button hover:shadow-2xl":"bg-[#838181] "} text-white font-semibold rounded-lg transition duration-200`}
        >
          Submit
        </button>
      </form>

   
      <div className="bg-[#e38f5e49] shadow-md rounded-md p-6 w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4 text-white">My Bag have <span className="text-blue-600">{cart?.items?.length}</span> item(s)</h1>
      <div className=" flex flex-col gap-5 border border-[#ea7633] rounded-md">
        {cart?.items?.map((item:CartItem,index:number)=>{

          return(
            <div className="border-b border-[#ea7633]   p-4" key={index}>
            <h2 className="font-semibold">{item?.name}</h2>
            <p><strong>Quantity</strong> {item?.quantity}</p>
            <p><strong>Price</strong> ₹{item?.price}</p>
            <div className="mt-2 pt-2 flex justify-between items-center border-t border-dashed border-[#ea7633]">
              <span className="font-semibold">Total</span>
              <span className="text-md font-semibold ">₹{item?.price} X {item?.quantity} = ₹{(item?.price*item?.quantity).toFixed(2)} </span>
            </div>
          </div>
          )
        })}
       </div>
        
        <div className="border border-[#ea7633] rounded-md p-4 my-4 text-center">
          <p>
            <span className="text-blue-600 cursor-pointer">Have a coupon?</span> Click here to enter your code
          </p>
        </div>
        
        <div className="border border-[#ea7633] rounded-md p-4">
          <h2 className="font-semibold mb-2">Price Summary</h2>
          <div className="flex justify-between">
            <span>Item Subtotal (NET)</span>
            <span>₹59.17</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (GST 20%)</span>
            <span>₹11.83</span>
          </div>
          <div className="flex justify-between font-semibold border-t border-[#ea7633] pt-2 mt-2">
            <span>Order Total (Included GST)</span>
            <span>₹71.00</span>
          </div>
        </div>
      </div>
   
    </div>
    </>
  );
};

export default CheckoutPage;
