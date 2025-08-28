"use client";

import { Column, Id, Task } from "@/utils/types";

import { useMemo, useState } from "react";
import { DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import ColumnComponenet from "./Column";
import { createPortal } from "react-dom";
import TaskComponent from "./TaskComponent";
import { usePathname } from "next/navigation";
import { useFolderStore } from "../../Store/folderStore";
import ProjectTitle from "./projectTitle";
import EditProjectComp from "./EditProject";

export default function ProjectPage() {
  const projects = useFolderStore((state) => state.projects);
  const realPath = usePathname();
  const projectPath = realPath.split("/")[3].split("%20").join(" ");
  const project = projects?.filter((p) => p.name === projectPath)[0];

  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [editProject, setEditProject] = useState(false);

  const [projectName, setProjectName] = useState(project.name);
  const [projectDesc, setProjectDesc] = useState(project.description);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  return (
    <div className="h-full w-full overflow-hidden pt-1 text-sm ">
      {editProject && (
        <EditProjectComp
          projectDesc={projectDesc}
          projectName={projectName}
          setProjectDesc={setProjectDesc}
          setProjectName={setProjectName}
          setEditProject={setEditProject}
        />
      )}
      <DndContext
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        onDragOver={ondragOver}
      >
        <div className=" w-full overflow-auto removeScrollBar h-full  flex flex-col ">
          <ProjectTitle
            project={project}
            setEditProject={setEditProject}
            editProject={editProject}
          />
          <div className="flex items-center justify-between px-1">
            <h1 className="text-md font-normal text-white/70">
              Last update at <span className="font-semibold">Aug,10,2025</span>{" "}
              by{" "}
              <span className="text-gray-300 underline cursor-pointer font-semibold hover:text-gray-100">
                user name
              </span>{" "}
              - added Column5
            </h1>
            <button
              onClick={createNewColumn}
              className="mt-1 bg-blue-700/80 text-white px-3 py-1 cursor-pointer  rounded hover:bg-blue-700 font-semibold min-w-fit"
            >
              + Add Column
            </button>
          </div>

          <div className="flex gap-2 justify-start overflow-auto  py-2 px-2 pr-100 flex-1 text-sm w-full removeScrollBar  items-start">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnComponenet
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  deleteTask={deleteTask}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                />
              ))}
            </SortableContext>
          </div>

          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnComponenet
                  column={activeColumn}
                  updateColumn={updateColumn}
                  deleteColumn={deleteColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <TaskComponent task={activeTask} deleteTask={deleteTask} />
              )}
            </DragOverlay>,
            document.body
          )}
        </div>
      </DndContext>
    </div>
  );

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: number) {
    setColumns(columns.filter((column) => column.id !== id));
    setTasks(tasks.filter((task) => task.columnId !== id));
  }

  function updateColumn(columnId: Id, title: string) {
    const newCols = columns.map((col) => {
      if (col.id !== columnId) return col;
      return { ...col, title };
    });
    setColumns(newCols);
  }

  function createTask(id: number) {
    const newTask: Task = {
      id: generateId(),
      columnId: id,
      content: `task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Drag and drop handlers

  function dragStart(e: DragStartEvent) {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
    }

    if (e.active.data.current?.type === "Task") {
      setActiveTask(e.active.data.current.task);
    }
  }

  function dragEnd(e: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = e;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
  function ondragOver(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || !active) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    const activeTaskId = active.id;

    // Only proceed if dragging a task
    if (activeType !== "Task") return;

    // Dropped on another task
    if (overType === "Task") {
      const overTaskId = over.id;

      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex(
          (task) => task.id === activeTaskId
        );
        const overTaskIndex = tasks.findIndex((task) => task.id === overTaskId);

        if (activeTaskIndex === -1 || overTaskIndex === -1) return tasks;

        const updatedTasks = [...tasks];

        // Move active task to over task position and update column
        updatedTasks[activeTaskIndex].columnId =
          updatedTasks[overTaskIndex].columnId;

        return arrayMove(updatedTasks, activeTaskIndex, overTaskIndex);
      });

      return;
    }

    // Dropped on an empty column
    if (overType === "Column") {
      const columnId = over.id;

      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex(
          (task) => task.id === activeTaskId
        );
        if (activeTaskIndex === -1) return tasks;

        const updatedTasks = [...tasks];
        updatedTasks[activeTaskIndex].columnId = columnId;

        return updatedTasks;
      });
    }
  }
}
