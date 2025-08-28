import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/utils/types";
import { useState } from "react";
import { GrDrag } from "react-icons/gr";

export default function TaskComponent({
  task,
  deleteTask,
}: {
  task: Task;
  deleteTask: (id: number) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.content);
  const [tags, setTags] = useState(["bg-red-400", "bg-green-500"]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: "Task", task } });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-600/50 p-5 rounded-md shadow-sm border  mb-2 cursor-grab hover:shadow-md transition-shadow"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-600/30 p-3 rounded-md shadow-sm  mb-2 cursor-grab hover:shadow-md transition-shadow relative"
      onClick={() => setEditMode(true)}
    >
      <GrDrag
        {...attributes}
        {...listeners}
        className="text-2xl focus:outline-none text-gray-500 absolute top-4 cursor-grabbing right-2"
      />

      {editMode ? (
        <input
          className="  border rounded outline-none px-2 w-full"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          autoFocus
          onBlur={() => {
            setEditMode(false);
            task.content = taskTitle;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setEditMode(false);
              task.content = taskTitle;
            }
          }}
        />
      ) : (
        <div className="flex justify-between items-center">
          <h1 className="">{taskTitle}</h1>

          <div className="flex mr-10  gap-3">
            {tags.map((tag) => {
              return <div key={tag} className={`w-4 h-2 ${tag}`}></div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
