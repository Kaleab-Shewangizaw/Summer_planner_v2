export default function PreviewSection() {
  return (
    <div className="lg:w-[75%] md:w-[90%] mx-auto my-20   h-150">
      <div className="flex items-end justify-center">
        <span className="font-bold text-5xl md:text-7xl h-25 w-25 md:h-45 md:w-45 rounded-md bg-red-500  p-2 pb-0 inline-flex items-end justify-center cursor-pointer">
          SP
        </span>
        <span className="text-5xl md:text-7xl font-bold">Summer Planner</span>
      </div>

      <div className="  hover:scale-101 transition-all ease-in duration-200 flex flex-col items-center justify-center transform mt-[-20px]">
        <div className="border-2 border-b-0 bg-black border-gray-400 w-85 md:w-150 lg:w-180 h-70 md:h-90 lg:h-100 rounded-lg p-2 pb-5">
          {/* moitor */}
          <div className="w-full h-full bg-amber-700 rounded-md flex justify-center items-center relative">
            <div className="bg-black w-30 h-3 absolute rounded-md top-[-5px] flex justify-center items-center">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
            </div>
            demo goes here
          </div>
        </div>
        <div className="w-95 md:w-160 lg:w-190  h-3 md:h-5 bg-[#2c2c2c] rounded-b-2xl rounded-t-sm overflow-clip flex justify-between">
          {/* keyboard */}
          <div className="w-3 h-full bg-gray-700/80"></div>
          <div className="w-30 rounded-xl bg-gray-500 h-2 "></div>
          <div className="w-3 h-full bg-gray-700/80"></div>
        </div>
      </div>
    </div>
  );
}
