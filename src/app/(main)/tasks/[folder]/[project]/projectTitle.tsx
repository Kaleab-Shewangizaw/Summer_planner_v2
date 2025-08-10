import { Project } from "@/utils/types";
import { Dispatch, SetStateAction } from "react";
import { BiEdit, BiShare } from "react-icons/bi";
import { BsClock, BsStar } from "react-icons/bs";

export default function ProjectTitle({
  project,
  setEditProject,
  editProject,
  createNewColumn,
}: {
  project: Project;
  setEditProject: Dispatch<SetStateAction<boolean>>;
  editProject: boolean;
  createNewColumn: () => void;
}) {
  return (
    <div className="flex  flex-col rounded-md px-2 py-3 mb-1 bg-[#152a61]">
      <div className="flex items-center w-full justify-between">
        <h1 className="text-2xl font-semibold text-white/80 mb-3">
          {project.name}{" "}
        </h1>
        <button
          className="text-xl"
          onClick={() => {
            setEditProject(!editProject);
          }}
        >
          <BiEdit />
        </button>
      </div>
      <div className="w-full mb-3">
        <h1 className="text-md font-normal text-white/70">
          {project.description} project desc goes here{" "}
        </h1>
      </div>
      <div className="flex items-center">
        <div className="w-7 h-7 rounded-full bg-yellow-300"></div>
        <div className="w-7 h-7 rounded-full -ml-3 bg-red-300"></div>
        <div className="w-7 h-7 rounded-full -ml-3 bg-purple-300"></div>
        <div className="w-7 h-7 -ml-3 rounded-full bg-green-300"></div>

        <div className="w-7 h-7 -ml-3 rounded-full bg-blue-200 flex items-center justify-center text-gray-800">
          +3
        </div>
        <button className=" text-white/70 px-1 py-1 rounded min-w-fit ring ring-blue-300/20 ml-5 cursor-pointer font-semibold">
          {" "}
          + add memeber
        </button>
        <div className=" ml-auto text-md flex gap-3 items-center text-white/70 ">
          <button className="px-2 py-2 ring ring-blue-300/20 rounded-md">
            <BsClock />
          </button>
          <button className="px-2 py-2 ring ring-blue-300/20 rounded-md">
            <BsStar />
          </button>
          <button className="px-2 py-1 ring ring-blue-300/20 rounded-md flex items-center">
            <BiShare />
            Share
          </button>
        </div>
      </div>

      <button
        onClick={createNewColumn}
        className="mt-1 bg-blue-500 text-white px-3 py-1 cursor-pointer border border-blue-500 rounded hover:bg-blue-600 font-semibold min-w-fit"
      >
        + Add Column
      </button>
    </div>
  );
}
