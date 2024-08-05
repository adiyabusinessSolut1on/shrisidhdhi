
import { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { FaUserCog } from "react-icons/fa";
import Image from "next/image";
import { IoMdNotifications } from "react-icons/io";
import { useGetMyself } from "../../network-request/queries";
import useOnClickOutside from "@/app/hooks/useClick";
import RightArrowSVG from "@/app/svg/rightarrowSVG";
import { useLogout } from "@/app/network-request/mutations";
import ConFirmModel from "../confirmModel";

interface Props {
  isOpen: {
    small: boolean;
    large: boolean;
  };
  onToggleSidebarSmall: () => void;
}
const Header = ({ onToggleSidebarSmall, isOpen }: Props) => {
  const [isLogout, setLogoutModal] = useState(false);
  const [showNotification, setNotification] = useState(false);

  const { data } = useGetMyself();
console.log("user Data>>>",data)
  const handleLogout = () => {
    setLogoutModal(true);
  };



  const handlingNotification = () => {
    setNotification((prev) => !prev);
  };


  const getDateString = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    return `${day} ${month}`;
  };

  const getTimeString = (dateString: string) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const date = new Date().toISOString();

  const time = getTimeString(date);
  const dateMonth = getDateString(date);

  const cancelLogout = () => {
    setLogoutModal(false);
  };
const [clicked,setClicked]=useState<Boolean>(false)
  const confirmLogout = () => {
    localStorage.removeItem("admin");
   
  };
  const ref = useOnClickOutside(() => setClicked(false));
  const { mutate } = useLogout();

  const HandleLogout = () => {
   
    mutate(undefined, {
      onSuccess: () => {
        console.log("hanel logout>>>>")
        window.location.href = "/login";
      },
    });
  };
  return (
    <>
      {isLogout && (
        <ConFirmModel onClose={cancelLogout} onConfirm={HandleLogout} />
      )}
 

      <header
        className={`fixed top-0 flex items-center justify-between border-b bg-[#FAFAFA] border-gray-200 w-full  ${
          !isOpen.large
            ? "md:w-[calc(100vw-15.4rem)]"
            : "lg:w-[calc(100%-5.4rem)]"
        } h-20   z-10`}
      >
        <div className="grid w-full h-full grid-cols-2 mx-4 md:grid-cols-1 md:mr-6 md:mx-0 ">
          <div className="flex items-center h-full gap-2 px-2 md:hidden">
            <button
              onClick={onToggleSidebarSmall}
              className="flex items-center"
            >
              {!isOpen.small ? (
                <RxHamburgerMenu className="w-6 h-5 text-gray-600" />
              ) : (
                <RxCross1 className="w-6 h-6 text-gray-600" />
              )}
            </button>
           
            <p className="flex items-center gap-1 text-3xl font-semibold text-gray-800 ">
            <Image src="/logo.png" priority quality={100} width={800} height={800} className=" w-20 h-10 lg:max-w-30 " alt="Logo"/>


           
            </p>
          </div>
          <div className=" text-xs md:text-sm  flex items-center justify-center"><p className="flex justify-center items-center">Welcome Back {data?.name}</p></div>
          <div className="md:w-1/2 lg:w-[30%]  items-center justify-self-end flex gap-4 lg:gap-8 justify-end  relative">
            {/* notification */}
            <div className="relative flex items-center">
              <IoMdNotifications
                className={`${
                  showNotification ? "text-blue-400" : "text-blue-300"
                } cursor-pointer w-7 h-7 hover:text-blue-400`}
                onClick={handlingNotification}
              />
              <span className="absolute flex w-2 h-2 top-1 right-1">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-700"></span>
                <span className="relative inline-flex w-2 h-2 rounded-full bg-sky-700"></span>
              </span>
            </div>
           
            <div className="flex items-center justify-start font-bold text-green-800 md:w-1/2 font-lato">
              {/* time */}
              <div className="pr-2 text-xs border-r border-green-800 md:text-sm">
                {time}
              </div>
              {/* date and month */}
              <div className="pl-2 text-xs md:text-sm ">{dateMonth}</div>
              
            </div>
            
            {/* user Profile */}
            <div 
              className={`flex relative items-center  gap-4 p-1  cursor-pointer rounded-md z-4  `}
              onClick={()=>setClicked(!clicked)}
             
            >
            {clicked&&<div ref={ref}  className={`lg:absolute min-w-[15rem] z-50 top-12 p-2 bg-blue-50 border border-gray-600 rounded-[7px] -right-0 `}>
                  <div className="text-[16px] font-600 border-b border-gray-600 py-1">
                 <strong> Welcome Back</strong> {data?.name}
                    </div>
                    <div className="flex flex-row justify-between items-center py-2">
                      <p>View Profile</p>
                      <RightArrowSVG width={30} height={30} fill={"#000"}/>
                    </div>
                    <div onClick={handleLogout} className="text-red-600 font-700 border-t p-2 hover:rounded-[5px] border-gray-600 hover:bg-blue-200 cursor cursor-pointer"> Logout</div>
             </div>}
              <div className={`flex  items-center justify-center p-1`}>
               
                <FaUserCog
                  className={` cursor-pointer w-8 h-8  text-green-800 `}
                />
              
              </div>
         
            </div>
          
          </div>
         
        </div>
      </header>
    </>
  );
};

export default Header;
