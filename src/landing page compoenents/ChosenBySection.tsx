import Image from "next/image";
import Image1 from "../../public/google.png";
import Image2 from "../../public/linkedin.png";
import Image3 from "../../public/insta.webp";
import Image4 from "../../public/pinterest.png";
import Image5 from "../../public/twitterx.png";

export default function ChosenBySection() {
  return (
    <div>
      <p className="text-md font-bold text-center mt-10 text-[#d3d3d3] ">
        Has been chosen by industry leaders.
      </p>
      <div className="flex items-center justify-around bg-[#0f161e] my-3 py-2">
        <Image src={Image1} width={80} height={40} alt="company" />
        <Image src={Image2} width={50} height={40} alt="company" />
        <Image src={Image3} width={50} height={40} alt="company" />
        <Image src={Image4} width={50} height={40} alt="company" />
        <Image src={Image5} width={50} height={40} alt="company" />
      </div>
    </div>
  );
}
