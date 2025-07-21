import Folder from "@/componenets/Folder";

const project1 = [
  { name: "project1", id: "1" },

  { name: "project5 is gonna be here", id: "1" },
  { name: "project6", id: "1" },
];

const project2: [] = [];

export default function TasksSidebar() {
  return (
    <div className="rounded-sm w-120 minw-fit p-5 px-1  bg-blue-900/10  h-full max-h-[100%] ">
      <div className="border text-center font-bold py-2 px-2 rounded-md border-blue-300/30 cursor-pointer mb-2 text-blue-300 hover:bg-blue-300/10 transition-all duration-200">
        + New folder
      </div>
      <div className="h-full max-h-[95%] overflow-auto removeScrollBar  rounded-sm">
        <Folder name="client's project" projects={project1} id="123" />
        <Folder name="assignment and homeworks" projects={project1} id="123" />
        <Folder name="personal projects" projects={project1} id="1234" />
        <Folder name="papa" projects={project2} id="121322" />
        <Folder name="this and that" projects={project1} id="ru548t" />
        <Folder name="whatever" projects={project1} id="54854" />
        <Folder name="name" projects={project2} id="3489359" />
      </div>
    </div>
  );
}
