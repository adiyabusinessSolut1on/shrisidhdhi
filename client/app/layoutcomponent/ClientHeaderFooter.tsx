
'use client'; 

import { usePathname } from 'next/navigation';
import Header from './header';
import Footer from './footer';


const ClientHeaderFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const hideHeaderFooterRoutes = ['/checkout']; 

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(pathname);

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      {children}
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

export default ClientHeaderFooter;
