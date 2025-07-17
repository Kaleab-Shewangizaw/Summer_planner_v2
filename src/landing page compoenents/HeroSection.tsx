import Button from "@/componenets/Button";

export default function HeroSection() {
  return (
    <div className="mx-auto  mt-25 ">
      <div className="text-center font-semibold text-7xl">
        <h1>
          <em className="!font-extralight font-serif">Organize</em> your work,
        </h1>
        <h1>
          One task at a <em className="!font-extralight font-serif">time</em>.
        </h1>
      </div>

      <p className="text-md font-bold text-center pt-3 text-[#868686]">
        Goes beyond basic to-do lists, offering intiutive tools for prioritizing
        and managing tasks with ease.
      </p>
      <div className="mx-auto  w-fit mt-4 mb-8 flex  flex-wrap  gap-20 px-20 py-5">
        <Button text="Get a free trial" fill={false} bold="bold" size="lg" />
        <Button text="How it works" fill={true} bold="bold" size="lg" />
      </div>
      <div className="rounded-md hidden lg:block bg-gradient-to-r  from-pink-500  via-red-500 to-yellow-500 w-250 h-100 mx-auto p-0.5">
        <div className="h-full w-full bg-gray-800 rounded-sm flex items-center justify-center">
          demo
        </div>
      </div>
    </div>
  );
}
