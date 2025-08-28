export default function EditProjectComp({
  projectName,
  setProjectName,
  setEditProject,
  projectDesc,
  setProjectDesc,
}) {
  return (
    <div className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-gray-900 border border-gray-700 flex flex-col p-6 gap-5 relative shadow-2xl">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 rounded-lg bg-gray-800 p-2 text-gray-400 hover:text-red-400 transition-colors duration-150 cursor-pointer"
          onClick={() => {
            setEditProject(false);
          }}
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-white">Edit Project</h2>
          <p className="text-sm text-gray-400">Update your project details</p>
        </div>

        {/* Project name field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="projectName"
            className="text-sm font-medium text-gray-300"
          >
            Project name
          </label>
          <input
            id="projectName"
            className="bg-gray-800 w-full px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg resize-y placeholder:text-gray-500 resize-x-none text-white"
            placeholder="Enter project name"
            type="text"
            value={projectName}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setEditProject(false);
              }
            }}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          />
        </div>

        {/* Project description field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="projectDesc"
            className="text-sm font-medium text-gray-300"
          >
            Project description
          </label>
          <textarea
            id="projectDesc"
            className="bg-gray-800 w-full h-32 rounded-lg resize-y resize-x-none text-base focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 text-white placeholder:text-gray-500"
            value={projectDesc}
            placeholder="Describe your project"
            onChange={(e) => {
              setProjectDesc(e.target.value);
            }}
          ></textarea>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 justify-end pt-2">
          <button
            className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors duration-150"
            onClick={() => {
              setEditProject(false);
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-150"
            onClick={() => {
              // Add your save logic here
              setEditProject(false);
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
