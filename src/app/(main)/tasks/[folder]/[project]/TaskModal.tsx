"use client";

// components/tasks/TaskModal.tsx
import { Task, ChecklistItem, Attachment, Tag } from "@/utils/types";
import { useState } from "react";

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (updates: Partial<Task>) => void;
  onDelete: () => void;
}

export default function TaskModal({
  task,
  onClose,
  onUpdate,
  onDelete,
}: TaskModalProps) {
  const [title, setTitle] = useState(task.content);
  const [description, setDescription] = useState(task.description || "");
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [newTag, setNewTag] = useState("");

  const toggleChecklistItem = (index: number) => {
    const updatedChecklist = [...(task.checklistItems || [])];
    updatedChecklist[index].completed = !updatedChecklist[index].completed;
    onUpdate({ checklistItems: updatedChecklist });
  };

  const addChecklistItem = () => {
    if (!newChecklistItem.trim()) return;

    const newItem: ChecklistItem = {
      id: Date.now(),
      text: newChecklistItem,
      completed: false,
    };

    onUpdate({
      checklistItems: [...(task.checklistItems || []), newItem],
    });
    setNewChecklistItem("");
  };

  const addTag = () => {
    if (!newTag.trim()) return;

    const tagColors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
    ];
    const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];

    const newTagItem: Tag = {
      id: Date.now(),
      name: newTag,
      color: randomColor,
    };

    onUpdate({
      tags: [...(task.tags || []), newTagItem],
    });
    setNewTag("");
  };

  const removeTag = (tagId: number) => {
    onUpdate({
      tags: (task.tags || []).filter((tag) => tag.id !== tagId),
    });
  };

  const handleSave = () => {
    onUpdate({
      content: title,
      description,
      dueDate,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <input
              className="text-xl font-semibold w-full border-none focus:outline-none focus:ring-0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSave}
            />
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex gap-4 text-sm text-gray-600">
            {task.columnName && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                <span>In {task.columnName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Description</h3>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={handleSave}
                placeholder="Add a more detailed description..."
                rows={4}
              />
            </div>

            {/* Attachments */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Attachments</h3>
              <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                <svg
                  className="w-10 h-10 text-gray-400 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
                <p className="text-sm text-gray-500">
                  Drag & drop files here, or click to browse
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Checklist</h3>
              <div className="space-y-2">
                {task.checklistItems &&
                  task.checklistItems.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleChecklistItem(index)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span
                        className={
                          item.completed ? "line-through text-gray-500" : ""
                        }
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={newChecklistItem}
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addChecklistItem()}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Add an item"
                />
                <button
                  onClick={addChecklistItem}
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4">
            {/* Due Date */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Due Date</h3>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                onBlur={handleSave}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {task.tags &&
                  task.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className={`px-2 py-1 rounded-full text-xs ${tag.color} text-white flex items-center gap-1`}
                    >
                      {tag.name}
                      <button
                        onClick={() => removeTag(tag.id)}
                        className="text-white hover:text-gray-200"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  placeholder="Add a tag"
                />
                <button
                  onClick={addTag}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Actions</h3>
              <button
                onClick={onDelete}
                className="w-full text-left p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
