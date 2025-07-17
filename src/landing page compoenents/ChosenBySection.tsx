import Image from "next/image";

export default function ChosenBySection() {
  return (
    <div>
      <p className="text-md font-bold text-center mt-10 text-[#d3d3d3] ">
        Has been chosen by industry leaders.
      </p>
      <div className="flex items-center justify-around bg-[#0f161e] my-3 py-2">
        <Image src={"./file.svg"} width={40} height={40} alt="company" />
        <Image src={"./globe.svg"} width={40} height={40} alt="company" />
        <Image src={"./next.svg"} width={40} height={40} alt="company" />
        <Image src={"./vercel.svg"} width={40} height={40} alt="company" />
        <Image src={"./window.svg"} width={40} height={40} alt="company" />
      </div>
    </div>
  );
}
