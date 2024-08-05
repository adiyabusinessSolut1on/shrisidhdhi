
import React from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import BlogICONSVG from "../SVG/postDetails";
import CategoryICONSVG from "../SVG/categoryICON";
import AwareNessSVG from "../SVG/arenessICON";
import UserSVG from "../SVG/userICON";
import DailytaskICON from "../SVG/dailytaskICON";
import RepostSVG from "../SVG/reportICON";
import Link from "next/link";
import "../../globals.css";
import { useRouter } from 'next/router';
import { usePathname } from "next/navigation";
import Image from "next/image";

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ width: number; height: number; fill: string }>;
}

const sidebarData: SidebarItem[] = [
  {
    name: "Report",
    path: "/report",
    icon: RepostSVG,
  },
  {
    name: "Products",
    path: "/products",
    icon: BlogICONSVG,
 
  },
  {
    name: "Category",
    path: "/category",
    icon: CategoryICONSVG,
  },
  {
    name: "Blogs",
    path: "/blogs",
    icon: CategoryICONSVG,
  },

  {
    name: "Reviws",
    path: "/reviews",
    icon: AwareNessSVG,
  },

  {
    name: "Users",
    path: "/users",
    icon: UserSVG,
  },

  {
    name: "Banner",
    path: "/banner",
    icon: DailytaskICON,
  },
  


];

interface subProps {
  large: boolean;
  small: boolean;
}

interface Props {
  isOpen: subProps;
  onToggleSidebarLarge: () => void;
  onToggleSidebarSmall: () => void;
}
const SideBar = ({
  isOpen,
  onToggleSidebarLarge,
  onToggleSidebarSmall,
}: Props) => {

  const pathname = usePathname();
  return (<>
    <section
      className={` h-screen bg-footer-custome border-r  border-gray-200  ${
        isOpen.small
          ? "fixed inset-0 bg-black/60 flex z-30 "
          : ` md:inline-block hidden  transition-all duration-500 ${
              isOpen.large ? "w-24" : "w-60"
            }`
      }  transition-all duration-500   cursor-pointer`}
    >
      <section
        className={`
    cursor-default h-full  shadow-md overflow-clip   ${
      isOpen.small ? "w-full sm:w-64" : ""
    }`}
      >
        <div
          className={` ${
            isOpen.large ? "justify-center" : isOpen.small ? "" : "pl-6"
          } flex w-full gap-2 px-3  pt-6 `}
        >
          <button
            onClick={onToggleSidebarLarge}
            className={`${isOpen.small ? "hidden" : ""}`}
          >
            {!isOpen.large ? (
              <RxHamburgerMenu className="w-6 h-6 text-gray-600" />
            ) : (
              <RxCross1 className="w-6 h-6 text-gray-600" />
            )}
          </button>

          <div className={`w-full ml-4 ${isOpen.large ? "hidden" : ""}`}>
          
            <p className="flex items-center gap-1 text-3xl font-semibold text-gray-900 ">  
              <Image src="/logo.png" priority quality={100} width={800} height={800} className=" mx-w-15 mx-h-15 lg:max-w-30 lg:h-22" alt="Logo"/>
            </p>
          </div>
         
        </div>

        <div
          className={`w-full h-[calc(100vh-6rem)] mt-2 ${
            isOpen.large ? "p-4" : "  p-2 pt-4 pl-4 "
          }  overflow-y-auto  [&::-webkit-scrollbar]:hidden `}
        >
           {sidebarData.map((sideData) => {
        const isActive = pathname.includes(sideData.path);

        return (
          <Link
            key={sideData.path}
            href={sideData.path}
            className={`relative group rounded-md border-l-4 transition-all duration-500 flex font-medium items-center
              ${
                isOpen.large
                  ? "m-0 p-1 justify-center"
                  : "m-1 p-2 w-[95%]"
              } h-[2.7rem] ${isActive 
                ? "border-blue-800 bg-blue-200 text-blue-800 font-semibold" 
                : "hover:bg-blue-200 hover:text-gray-800 text-gray-900 border-transparent"
              }`}
          >
            <sideData.icon
              width={20}
              height={20}
              fill={isActive ? "blue" : "#242424"}
            />
            <span
              className={`mx-1 p-1 text-sm  font-montserrat ${
                isOpen.large ? "hidden" : ""
              }`}
            >
              {sideData.name}
            </span>
          </Link>
        );
      })}
        </div>
      </section>
      <button
        onClick={onToggleSidebarSmall}
        className={`absolute top-6 right-4 z-50 p-1 bg-white rounded-md text-black hover:text-rose-400 ${
          isOpen.small ? "" : "hidden"
        }`}
      >
        <RxCross1 className="w-6 h-6 font-bold" />
      </button>
      {/* </section> */}
    </section>
    </>
  );
};

export default SideBar;
