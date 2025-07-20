export default function PreviewSection() {
  return (
    <div className="lg:w-[75%] md:w-[90%] mx-auto my-20   h-150">
      <div className="flex items-end justify-center">
        <span className="font-bold text-5xl md:text-7xl h-25 w-25 md:h-45 md:w-45 rounded-md bg-red-500  p-2 pb-0 rotate-z-15 inline-flex items-end justify-center cursor-pointer">
          SP
        </span>
        <span className="text-5xl md:text-7xl font-bold rotate-z-3">
          Summer Planner
        </span>
      </div>

      <div className="   transition-all ease-in duration-200 flex flex-col items-center justify-center transform mt-[-20px] z-1000">
        <div className="border-2 border-b-0 bg-black border-gray-600 w-85 md:w-150 lg:w-180 h-70 md:h-90 lg:h-100 rounded-lg p-2 pb-5 z-1000">
          {/* moitor */}
          <div className="w-full h-full bg-amber-700 rounded-md flex justify-center items-center relative">
            <div className="bg-black w-30 h-3 absolute rounded-md top-[-7px] flex justify-center items-center">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
            </div>
            demo goes here
          </div>
        </div>
        <div className=" w-95 md:w-160 lg:w-190  h-3 md:h-5 bg-[#0c0c0ce7] border-t border-l-1 border-l-gray-600 border-r-1 border-r-gray-600 border-gray-800 rounded-b-2xl rounded-t-sm overflow-clip flex justify-between">
          {/* keyboard */}
          <div className=" h-full bg-gradient-to-r shadow-[0px_0px_10px_40px_#1f1f1f] to-gray-900 from-gray-500"></div>
          <div className="w-40 rounded-xl bg-gray-700 h-2 mt-[-3px]"></div>
          <div className=" h-full shadow-[0px_0px_10px_40px_#1f1f1f]"></div>
        </div>
      </div>
    </div>
  );
}
