// import CurvedSlider from "../components/HomeComponents/CurvedSlider";
// import EarthSection from "../components/HomeComponents/EarthSection";
// import ShopFeaturesSection from "../components/HomeComponents/ShopFeaturesSection";
// import FeatureCards from "../components/HomeComponents/FeatureCards";
// import FAQ from "../components/HomeComponents/FAQ";
// import ShopSection from "../components/HomeComponents/ShopSection";
// import Navbar from "../components/Navbar";



// export default function Home() {
//   return (
//     <main className="relative flex flex-col">
//       <Navbar textColor="text-white" bgColor="bg-transparent" />
//       <CurvedSlider />
//       <FeatureCards />
//       <EarthSection />
//       <FAQ />
//       <ShopFeaturesSection />
//       <ShopSection />
//     </main>
//   );
// }

import CurvedSlider from "../components/HomeComponents/CurvedSlider";
import EarthSection from "../components/HomeComponents/EarthSection";
import ShopFeaturesSection from "../components/HomeComponents/ShopFeaturesSection";
import FeatureCards from "../components/HomeComponents/FeatureCards";
import FAQ from "../components/HomeComponents/FAQ";
import ShopSection from "../components/HomeComponents/ShopSection";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex flex-col">
      <div className="relative">
        <Navbar
          textColor="text-white"
          bgColor="bg-transparent"
          className="absolute top-0 left-0 right-0 z-50"
        />
        <CurvedSlider />
      </div>
      <FeatureCards />
      <EarthSection />
      <FAQ />
      <ShopFeaturesSection />
      <ShopSection />
      <Footer />
    </main>
  );
}
