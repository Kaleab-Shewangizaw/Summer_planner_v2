import {
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";

export default function ChosenBySection() {
  return (
    <div>
      <p className="text-md font-bold text-center mt-10 text-[#d3d3d3] ">
        Has been chosen by industry leaders.
      </p>
      <div className="flex items-center justify-around bg-[#0f161e] my-3 py-3 text-4xl text-gray-400">
        <FaGoogle />
        <FaLinkedin />
        <FaInstagram />
        <FaPinterestP />
        <FaXTwitter />
      </div>
    </div>
  );
}
