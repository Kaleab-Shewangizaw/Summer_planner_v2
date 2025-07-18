export default function FeaturesSection() {
  return (
    <div className="lg:w-[75%] md:w-[90%] mx-auto mt-10">
      <p className="font-bold text-lg text-gray-500 my-5">Features</p>
      <div className="flex md:flex-row flex-col  gap-5">
        <div className="w-full md:w-3/5">
          {/* left */}
          <h1 className="text-4xl md:text-5xl  !h-[100px] lg:w-7/8  ">
            Boost your team&apos;s productivuty{" "}
          </h1>
          <div className="border rounded-md border-[#1e3556bf] p-3 mt-5 bg-[#140f369e]">
            <h1 className="text-xl mb-2 font-bold">Improved commuinication</h1>
            <p className="w-[70%] font-semibold text-gray-400">
              Team members can share tasks, updates, and files within the app,
              keeping everyone on the same page.
            </p>
            <div className="w-[70%] h-20 bg-black/30 my-3 mx-auto"></div>
          </div>
          <div className="border rounded-md border-[#1e3556bf] p-3 px-4 mt-4 flex items-start justify-between  bg-[#140f369e]">
            <div className="w-2/3 ">
              <h1 className="text-xl mb-2 font-bold ">Reduced Workload</h1>
              <p className="font-semibold text-gray-400">
                Breaking down large projects into smaller, manageable tasks
                feels less daunting and promotes steady progress.
              </p>
            </div>
            <div className="h-40 w-40 bg-black/30 my-3 "></div>
          </div>
        </div>
        <div className="w-full md:w-2/5 flex flex-col ">
          {/* right */}
          <p className="text-left  ml-auto  mb-11 !h-[100px] font-bold text-gray-500">
            Effortlessly organize your tasks with intiutive proiritization
            tools, ensuring you focus on what truely matters.
          </p>
          <div className="h-full border rounded-md border-[#1e3556bf] p-3  bg-[#140f369e]"></div>
        </div>
      </div>
    </div>
  );
}
