
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider 
    appearance={{
      layout:{
        logoImageUrl:"/icons/yoom-logo.svg",
        socialButtonsVariant:'iconButton',
      },
      variables:{
        colorText:"#fff",
        colorPrimary:"#0E78F9",
        colorBackground:"#1c1f2e",
        colorInputBackground:"#252a41",
        colorInputText:"#fff",
        colorNeutral:"#fff"
      }
    }}
    >
<html lang="en">
      <body className={` ${inter.className} bg-dark-2 text-white`}>
        {children}
        <Toaster />
      </body>
    </html>
    </ClerkProvider>

  );
}
