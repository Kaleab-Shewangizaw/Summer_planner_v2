import Logo from "@/componenets/Logo";
import NavLinks from "./NavLinks";
import Button from "@/componenets/Button";

export default function LandingNavbar() {
  return (
    <div className=" md:w-[90%] lg:w-[90%] sticky top-5 z-100 min-w-fit w-full mx-auto  flex p-2 px-4 gap-4 rounded-xl items-center justify-between border-gray-600">
      <div className="w-1/3 ">
        <Logo />
      </div>
      <div className="w-1/3 hidden lg:block md:block min-w-fit">
        <NavLinks />
      </div>
      <div className="flex gap-4 w-1/3 justify-end min-w-fit">
        <Button text={"Get Started"} fill={true} size="" bold="" />
      </div>
    </div>
  );
}
