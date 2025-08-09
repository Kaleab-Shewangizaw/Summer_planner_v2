import { BiCheckCircle } from "react-icons/bi";
import { BsClock } from "react-icons/bs";

export default function TeamsCard() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-sm border w-90 border-gray-600 cursor-pointer  px-2 py-1 rounded-md">
      <h1 className="text-lg font-bold my-3">Team Name</h1>
      <div className="flex gap-2">
        <div className="w-10 h-10 border border-gray-600 rounded-full"></div>
        <div className="w-10 h-10 border border-gray-600 rounded-full"></div>
        <div className="w-10 h-10 border border-gray-600 rounded-full"></div>
        <div className="w-10 h-10 border border-gray-600 rounded-full"></div>
        <div className="w-10 h-10 border border-gray-600 rounded-full"></div>
      </div>
      <p className="my-3 text-gray-500">+3 members</p>
      <div className="flex  w-full px-3 justify-between mb-3">
        <p className="flex items-center gap-2">
          <BsClock className="text-md text-amber-600" /> 2 Active projects
        </p>
        <p className="flex items-center gap-2">
          <BiCheckCircle className="text-lg text-green-600" /> 3 Completed
          projects
        </p>
      </div>
    </div>
  );
}
