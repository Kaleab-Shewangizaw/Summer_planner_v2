import { useSortable } from "@dnd-kit/sortable";
import { Column } from "@/utils/types";
import { CSS } from "@dnd-kit/utilities";

export default function ColumnComponenet({
  column,
  deleteColumn,
}: {
  column: Column;
  deleteColumn: (id: number) => void;
}) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id, data: { type: "Column", column } });
  const style = { transition, transform: CSS.Transform.toString(transform) };
  if (isDragging) {
    <div></div>;
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-800 p-4 rounded-lg shadow-md"
    >
      <div
        {...attributes}
        {...listeners}
        className="h-10 rounded-md cursor-grab border"
      >
        {column.title}
      </div>
      <button
        onClick={() => deleteColumn(column.id)}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
}
