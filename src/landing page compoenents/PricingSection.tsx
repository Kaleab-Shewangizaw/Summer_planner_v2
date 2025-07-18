import Button from "@/componenets/Button";

export default function PricingSection() {
  return (
    <div className="lg:w-[75%] md:w-[90%] mx-auto my-10 mb-0 h-150 relative">
      <p className="font-bold text-lg text-gray-500 my-5">Pricing</p>
      <div className=" flex items-start justify-between rounded-lg ">
        <h1 className="text-5xl">Powerful features at an affordable price.</h1>
        <p className="text-gray-500 text-lg font-bold">
          We offer a range of plans to suit your needs, whether you&apos;re an
          individual or a team.
        </p>
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div className="flex flex-col border border-gray-600 rounded-lg p-4 my-5">
          <h2 className="text-3xl font-bold">Basic Plan</h2>
          <p className="text-lg font-bold">$9/month</p>
          <p className="text-gray-500 my-2 mb-5">Includes basic features</p>
          <Button text="Subscribe Now" fill={true} bold="" size="md" />
          <ul className="list-disc pl-5 text-gray-500 mt-5">
            <li>Access to core features</li>
            <li>Basic support</li>
            <li>1 user account</li>
            <li>Limited storage</li>
          </ul>
        </div>
        <div className="flex flex-col border border-blue-300/70 rounded-lg p-4 my-5 bg-blue-800/10">
          <h2 className="text-3xl font-bold">Pro Plan</h2>
          <p className="text-lg font-bold">$19/month</p>
          <p className="text-gray-500 my-2 mb-5">Includes advanced features</p>
          <Button text="Subscribe Now" fill={false} bold="" size="md" />
          <ul className="list-disc pl-5 text-gray-500 mt-5">
            <li>All Basic Plan features</li>
            <li>Advanced support</li>
            <li>Up to 5 user accounts</li>
            <li>Increased storage</li>
          </ul>
        </div>
        <div className="flex flex-col border border-gray-600 rounded-lg p-4 my-5">
          <h2 className="text-3xl font-bold">Enterprise Plan</h2>
          <p className="text-lg font-bold">$29/month</p>
          <p className="text-gray-500 my-2 mb-5">Includes all features</p>
          <Button text="Subscribe Now" fill={true} bold="" size="md" />
          <ul className="list-disc pl-5 text-gray-500 mt-5">
            <li>All Pro Plan features</li>
            <li>Dedicated account manager</li>
            <li>Unlimited user accounts</li>
            <li>Custom storage solutions</li>
          </ul>
        </div>
      </div>
      <div className=" w-0  rounded-full shadow-[0px_0px_200px_80px_#1447e6] absolute top-100 left-200 z-[-1]"></div>
      <div className=" w-0  rounded-full shadow-[0px_0px_200px_80px_#1447e6] absolute top-180 left-100 z-[-1]"></div>
    </div>
  );
}
