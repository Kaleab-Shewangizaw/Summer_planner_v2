"use client";

import { Column } from "@/utils/types";

import { useMemo, useState } from "react";
import { DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import ColumnComponenet from "./Column";
import { createPortal } from "react-dom";

export default function ProjectPage() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

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
  function dragStart(e: DragStartEvent) {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
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
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  return (
    <div className="h-full w-full overflow-auto removeScrollBar ">
      <DndContext onDragStart={dragStart} onDragEnd={dragEnd}>
        <div className="py-5 border-gray-200">
          <h1 className="text-lg font-semibold">Project Columns</h1>
          <div className="flex gap-5 justify-start px-auto flex-wrap px-2">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnComponenet
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                />
              ))}
            </SortableContext>
          </div>

          <button
            onClick={createNewColumn}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Column
          </button>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <div className="opacity-80">
                  <ColumnComponenet
                    column={activeColumn}
                    deleteColumn={deleteColumn}
                  />
                </div>
              )}
            </DragOverlay>,
            document.body
          )}
        </div>
      </DndContext>
    </div>
  );
}
