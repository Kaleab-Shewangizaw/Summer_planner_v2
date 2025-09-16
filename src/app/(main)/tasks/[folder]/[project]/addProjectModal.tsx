"use client";

import { useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import { useFolderStore } from "@/app/(main)/tasks/Store/folderStore";

interface AddProjectModalProps {
  folderId: number;
  folderName: string;
  onClose: () => void;
}

export default function AddProjectModal({ folderId, folderName, onClose }: AddProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const addProject = useFolderStore((state) => state.addProject);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName.trim() || !folderId) return;

    setIsLoading(true);
    try {
      await addProject(folderId, projectName.trim(), description.trim(), []);
      setProjectName("");
      setDescription("");
      onClose();
    } catch (error) {
      console.error("Failed to add project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.metaKey) {
      handleSubmit(e);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50"
      onClick={onClose}
    >
      <div
        className="rounded-xl shadow-xl w-full max-w-2xl bg-[#0f161e] mx-4 max-h-[90vh] overflow-y-auto removeScrollBar p-6 border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-100">Create New Project</h2>
            <p className="text-sm text-gray-400 mt-1">
              Add to: <span className="text-blue-400">{folderName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-700"
          >
            <BiX className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-2">
              Project Name *
            </label>
            <input
              id="projectName"
              type="text"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-white placeholder:text-gray-500"
              placeholder="Enter project name..."
              autoFocus
              disabled={isLoading}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-white placeholder:text-gray-500 resize-none"
              placeholder="Add a project description (optional)..."
              rows={3}
              disabled={isLoading}
            />
          </div>

          {/* Template Options (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Template (Optional)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { name: "Blank", desc: "Start from scratch", color: "bg-gray-600" },
                { name: "Task Board", desc: "Columns for tasks", color: "bg-blue-600" },
                { name: "Calendar", desc: "Time-based planning", color: "bg-green-600" }
              ].map((template) => (
                <div
                  key={template.name}
                  className="border border-gray-600 rounded-lg p-3 cursor-pointer hover:border-gray-500 transition-colors duration-200 group"
                >
                  <div className={`w-8 h-8 ${template.color} rounded-md mb-2 group-hover:opacity-90`} />
                  <h4 className="text-sm font-medium text-gray-100">{template.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">{template.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-300 hover:text-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!projectName.trim() || isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                <>
                  <BiPlus className="text-lg" />
                  Create Project
                </>
              )}
            </button>
          </div>
        </form>

        {/* Keyboard Shortcut Hint */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-500 text-center">
            Press ⌘ + Enter to create • Esc to cancel
          </p>
        </div>
      </div>
    </div>
  );
}