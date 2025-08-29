// components/tasks/TaskComponent.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/utils/types";
import { useState } from "react";
import { GrDrag } from "react-icons/gr";
import TaskModal from "./TaskModal";
import { BiCalendar } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import { GiPaperClip } from "react-icons/gi";
import { MdCheckBox } from "react-icons/md";

export default function TaskComponent({
  task,
  deleteTask,
  updateTask,
}: {
  task: Task;
  deleteTask: (id: number) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.content);
  const [showModal, setShowModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.status === "completed");

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: "Task", task } });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  const handleCompletionToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = isCompleted ? "in-progress" : "completed";
    setIsCompleted(!isCompleted);
    updateTask(task.id, { status: newStatus });
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-600/50 p-5 rounded-md shadow-sm border mb-2 cursor-grab hover:shadow-md transition-shadow"
      />
    );
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`bg-gray-600/30 p-3 rounded-md shadow-sm mb-2  hover:shadow-md transition-shadow relative group ${
          isCompleted ? "opacity-70 border-l-4 border-l-green-500" : ""
        }`}
        onClick={() => setShowModal(true)}
      >
        {/* Drag handle */}
        <GrDrag
          {...attributes}
          {...listeners}
          className="text-xl focus:outline-none text-gray-500 absolute top-3 right-2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
        />

        {/* Completion radio button */}
        <div
          className="absolute top-3 left-2 cursor-pointer"
          onClick={handleCompletionToggle}
        >
          {isCompleted ? (
            <BsCheckCircleFill className="text-green-500 text-xl" />
          ) : (
            <div className="w-5 h-5 border-2 border-gray-400 rounded-full hover:border-gray-200 transition-colors" />
          )}
        </div>

        {editMode ? (
          <input
            className="border rounded outline-none px-2 w-full ml-7"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            autoFocus
            onBlur={() => {
              setEditMode(false);
              updateTask(task.id, { content: taskTitle });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditMode(false);
                updateTask(task.id, { content: taskTitle });
              }
            }}
          />
        ) : (
          <div className="ml-7">
            <div
              className="flex justify-between items-start"
              onDoubleClick={() => setEditMode(true)}
            >
              <h1
                className={`text-sm ${
                  isCompleted ? "line-through text-gray-500" : "text-gray-400"
                }`}
              >
                {taskTitle}
              </h1>
            </div>

            {/* Task metadata */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {task.dueDate && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <BiCalendar className="w-3 h-3 text-sm" />
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              )}

              {task.checklistItems && task.checklistItems.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MdCheckBox />
                  <span>
                    {
                      task.checklistItems.filter((item) => item.completed)
                        .length
                    }
                    /{task.checklistItems.length}
                  </span>
                </div>
              )}

              {task.attachments && task.attachments.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <GiPaperClip />
                  <span>{task.attachments.length}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="flex gap-1 mt-2 flex-wrap">
                {task.tags.map((tag) => (
                  <div
                    key={tag.id}
                    className={`px-2 py-0.5 rounded-full text-xs ${tag.color} text-white`}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      {showModal && (
        <TaskModal
          task={task}
          onClose={() => setShowModal(false)}
          onUpdate={(updates) => updateTask(task.id, updates)}
          onDelete={() => deleteTask(task.id)}
        />
      )}
    </>
  );
}
