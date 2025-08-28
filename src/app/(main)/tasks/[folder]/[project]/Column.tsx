"use client";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Task } from "@/utils/types";
import { CSS } from "@dnd-kit/utilities";

import { GrDrag } from "react-icons/gr";
import { SetStateAction, useMemo, useRef, useState } from "react";
import TaskComponent from "./TaskComponent";
import { BiTrash } from "react-icons/bi";

export default function ColumnComponenet({
  column,
  deleteColumn,
  createTask,
  updateColumn,
  deleteTask,
  tasks,
}: {
  column: Column;
  deleteColumn: (id: number) => void;
  createTask: (id: number) => void;
  updateColumn: (columnId: number, title: string) => void;
  deleteTask: (id: number) => void;
  tasks: Task[];
}) {
  const [title, setTitle] = useState(column.title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "Column", column },
    disabled: isEditing,
  });
  const style = { transition, transform: CSS.Transform.toString(transform) };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (!title.trim()) setTitle(column.title);
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setTitle(e.target.value);
    updateColumn(column.id, title);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="min-w-100 rounded-lg border-black/30 bg-black/20 min-h-full  border"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-800/50 p-4 pb-2 px-1 rounded-lg shadow-md w-100 min-w-100 relative h-full min-h-full flex flex-col justify-between"
    >
      <div className="">
        {isEditing ? (
          <input
            autoFocus
            type="text"
            ref={inputRef}
            value={title}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-[90%] px-2 py-1 border border-blue-800 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xl"
          />
        ) : (
          <h1
            onDoubleClick={handleDoubleClick}
            className="font-bold text-xl ml-3"
          >
            {title}
          </h1>
        )}

        <GrDrag
          {...attributes}
          {...listeners}
          className="text-2xl focus:outline-none text-gray-500 absolute top-4 cursor-grabbing right-2"
        />
      </div>

      <div className="flex flex-col flex-1 overflow-auto removeScrollBar px-2 mt-3 pb-50">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <TaskComponent key={task.id} task={task} deleteTask={deleteTask} />
          ))}
        </SortableContext>
      </div>

      <div className="flex items-center justify-between mt-2 px-2">
        <button
          onClick={() => deleteColumn(column.id)}
          title={`delete ${column.title}`}
          className=" text-red-300 hover:text-red-500 opacity-50 text-2xl cursor-pointer"
        >
          <BiTrash />
        </button>
        <button
          className="flex  items-center gap-1 font-semibold bg-[#054072] px-3 py-1 rounded-lg cursor-pointer hover:bg-[#053f72b5]"
          onClick={() => {
            createTask(column.id);
          }}
        >
          <span className="text-md">+</span>Add Task
        </button>
      </div>
    </div>
  );
}
