
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import '@stream-io/video-react-sdk/dist/css/styles.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YOOM",
  description: " Video Calling app",
  icons:{
    icon: "../public/icons/logo.svg"
  }
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
