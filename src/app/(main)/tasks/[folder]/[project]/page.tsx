"use client";

import { Column, Id, Task } from "@/utils/types";

import { useMemo, useState } from "react";
import { DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import ColumnComponenet from "./Column";
import { createPortal } from "react-dom";

export default function ProjectPage() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  // const sensors = useSensors();

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  return (
    <div className="h-full w-full overflow-hidden px-3 pt-1 text-sm ">
      <DndContext onDragStart={dragStart} onDragEnd={dragEnd}>
        <div className=" w-full overflow-auto removeScrollBar h-full  flex flex-col">
          <div className="flex w-full items-center justify-between mb-1">
            <h1 className="text-lg font-semibold">Project Board</h1>
            <button
              onClick={createNewColumn}
              className="mt-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 min-w-fit"
            >
              + Add Column
            </button>
          </div>
          <div className="flex gap-2 justify-start overflow-auto  py-2 pr-100 flex-1 text-sm w-full removeScrollBar px-2 items-start">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnComponenet
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
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
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
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

  function dragStart(e: DragStartEvent) {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
    }

    if (e.active.data.current?.type === "Task") {
      setActiveTask(e.active.data.current.task);
    }
  }

  function dragEnd(e: DragEndEvent) {
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
}
