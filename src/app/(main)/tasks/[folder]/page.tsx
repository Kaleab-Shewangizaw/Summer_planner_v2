import ProjectCard from "@/componenets/ProjectCard";

export default function FolderPage() {
  return (
    <div className=" h-full max-h-[100%]   w-full  overflow-auto removeScrollBar ">
      <div className=" py-5 border-gray-700">
        Folders
        <div className="flex gap-5 justify-start px-auto flex-wrap  px-2">
          <ProjectCard name="project1" />
          <ProjectCard name="project5 is gonna be here" />
          <ProjectCard name="project6" />
        </div>
      </div>
    </div>
  );
}
