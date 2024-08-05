import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientHeaderFooter from "./layoutComponent/adminsidebar";
import ClientProvider from "./lib/ClientProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
     
        <ClientProvider>
        <ToastContainer/>
        <ClientHeaderFooter>{children}</ClientHeaderFooter>
        </ClientProvider>
      </body>
    </html>
  );
}
