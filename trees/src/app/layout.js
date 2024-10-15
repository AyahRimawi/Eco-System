
import "./globals.css";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { Shadows_Into_Light_Two } from "next/font/google";
import { CartProvider } from '../context/CartContext';
const shadowsIntoLightTwo = Shadows_Into_Light_Two({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-shadows-into-light-two",
});

export const metadata = {
  title: "GreenHope",
  description: "Discover the World of Trees",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={shadowsIntoLightTwo.variable}>
      <body className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white text-green-900 font-sans">
        <CartProvider>
        {/* <Navbar /> */}
        {children}
        
        {/* <Footer /> */}
        </CartProvider>
      </body>
    </html>
  );
}