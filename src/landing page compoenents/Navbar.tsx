import Logo from "@/componenets/Logo";
import NavLinks from "./NavLinks";
import Button from "@/componenets/Button";

export default function LandingNavbar() {
  return (
    <div className=" md:w-[90%] lg:w-[75%] mt-5 z-100 min-w-fit mx-auto flex p-2 px-4 gap-4 items-center justify-between ">
      <div className="">
        <Logo />
      </div>
      <div className=" hidden lg:block md:block min-w-fit">
        <NavLinks />
      </div>
      <div className="flex   justify-end min-w-fit">
        <Button text={"Get Started"} fill={true} size="" bold="" />
      </div>
    </div>
  );
}
