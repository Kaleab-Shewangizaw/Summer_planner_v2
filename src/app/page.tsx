import ChosenBySection from "@/landing page compoenents/ChosenBySection";
import FeaturesSection from "@/landing page compoenents/FeaturesSection";
import HeroSection from "@/landing page compoenents/HeroSection";
import LandingNavbar from "@/landing page compoenents/Navbar";

export default function Home() {
  return (
    <div className="w-full relative">
      <LandingNavbar />
      <HeroSection />
      <ChosenBySection />
      <FeaturesSection />
      <div className=" w-0  rounded-full shadow-[0px_0px_300px_100px_#1447e6] absolute top-70 right-50 "></div>
      <div className=" w-0  rounded-full shadow-[0px_0px_150px_50px_#1447e6] absolute top-50 left-20 "></div>
      <div className=" w-0  rounded-full shadow-[0px_0px_200px_80px_#1447e6] absolute top-180 left-100 z-[-1]"></div>
      <div className=" w-0  rounded-full shadow-[0px_0px_200px_80px_#1447e6] absolute top-300 left-100 z-[-1]"></div>
      <div className=" w-0  rounded-full shadow-[0px_0px_240px_100px_#1447e6] absolute top-320 left-300 z-[-1]"></div>
      <div className=" w-0  rounded-full shadow-[0px_0px_200px_80px_#1447e6] absolute top-390 left-350 z-[-1]"></div>
    </div>
  );
}
