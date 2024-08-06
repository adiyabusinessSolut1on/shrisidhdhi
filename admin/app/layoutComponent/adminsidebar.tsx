"use client";

import { usePathname } from "next/navigation";
import SideBar from "../components/layoutcomponent/sidebar";
import Header from "../components/layoutcomponent/header";
import { useState } from "react";

const ClientHeaderFooter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState({
    large: false,
    small: false,
  });
  const toggleSidebarLarge = () => {
    setSidebarOpen((prev) => ({
      ...prev,
      large: !prev.large,
    }));
  };
  const toggleSidebarSmall = () => {
    setSidebarOpen((prev) => ({
      ...prev,
      small: !prev.small,
    }));
  };
  const pathname = usePathname();
  const hideHeaderFooterRoutes = ["/login"];

  const hide = hideHeaderFooterRoutes.includes(pathname);

  return (
    <>
      <main className={`relative flex   min-h-screen `}>
        {!hide && (
          <SideBar
            isOpen={isSidebarOpen}
            onToggleSidebarLarge={toggleSidebarLarge}
            onToggleSidebarSmall={toggleSidebarSmall}
          />
        )}
        <div className="relative  flex-1 overflow-x-hidden [&::-webkit-scrollbar]:hidden bg-[#FAFAFA]">
          {!hide && (
            <Header
              onToggleSidebarSmall={toggleSidebarSmall}
              isOpen={isSidebarOpen}
            />
          )}
          <div className=" mt-20  h-[calc(100vh-5rem)] ">{children}</div>
        </div>
      </main>
    </>
  );
};

export default ClientHeaderFooter;
