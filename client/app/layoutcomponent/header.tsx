
"use client"
import Image from 'next/image';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Header = () => {

  const cart = useSelector((state: RootState) => state.cart);
 
  const HandleChangeLanguage=(language:string)=>{

  }
 
  return (
    <header className="bg-[#f7e4d9] shadow sticky top-0 z-50">
      <div className=" w-auto  container mx-auto px-4 lg:px-[100px] py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <FaPhone className="h-5 w-5 text-gray-600" />
          <a href="tel:01902405535" className="text-gray-600">
            0123456789
          </a>
          <FaEnvelope className="h-5 w-5 text-gray-600" />
          <a href="mailto:info@bedsdivans.co.uk" className="text-gray-600">
            info@shrishuddha.co.uk
          </a>
        </div>
        <Link href="/" className="text-2xl font-bold text-gray-800">
          <Image
            quality={100}
            width={200}
            height={100}
            className="w-[200px] h-[100px]"
            src="/logo.png"
            alt="logo"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search For Products"
              className="pl-10 pr-4 py-2 border rounded-full focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
          <Link href={"/cart"} className="relative cursor-pointer">
            <FaShoppingCart className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full px-1">
              {cart?.items?.length}
            </span>
          </Link>

          <div className='flex flex-row gap-2'>
            <label >Language:</label>
            <select className='p-1 rounded-[5px] outline-none border border-[#9a9797]'>
              <option value={"en"}>English</option>
              <option value={"ma"}>Malyali</option>
            </select>
          </div>
        </div>
      </div>
      <nav className="bg-[#ea7633]">
        <div className="container mx-auto px-4 py-2 justify-center flex gap-[4rem] items-center">
          <Link href="/" className="text-gray-800">
            Home
          </Link>
          <Link href="/" className="text-gray-800">
            Vibhuti
          </Link>
          <Link href="/" className="text-gray-800">
            Sindoor
          </Link>
          <Link href="/" className="text-gray-800">
            Dhoopam
          </Link>
          <Link href="/" className="text-gray-800">
            Ghee
          </Link>
          <Link href="/" className="text-gray-800">
            Ashtagandha
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
