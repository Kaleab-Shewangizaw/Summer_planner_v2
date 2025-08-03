import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/utils/types";
import { useState } from "react";

export default function TaskComponent({ task }: { task: Task }) {
  const [editMode, setEditMode] = useState(false);
  const [taskContent, setTaskContent] = useState(task.content);

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
        className="bg-blue-900/40 p-3 rounded-md shadow-sm border border-blue-900 mb-2 cursor-grab hover:shadow-md transition-shadow"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-blue-900/40 p-3 rounded-md shadow-sm border border-blue-900 mb-2 cursor-grab hover:shadow-md transition-shadow"
      onClick={() => setEditMode(true)}
    >
      {editMode ? (
        <input
          className="  border rounded outline-none px-2 w-full"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
          autoFocus
          onBlur={() => {
            setEditMode(false);
            task.content = taskContent;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setEditMode(false);
              task.content = taskContent;
            }
          }}
        />
      ) : (
        <div className="flex justify-between items-center">
          <span>{taskContent}</span>
          <button
            onClick={() => {}}
            className="text-gray-400 hover:text-red-500"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
