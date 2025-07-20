import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function IgniteItForm() {
  const [isDevMode, setIsDevMode] = useState(false);
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <div
        className="bg-white/10 rounded-3xl flex flex-col justify-center py-10 px-6
        max-w-lg mx-auto w-full text-white
        sm:px-10
        "
      >
        <div className="flex md:flex-row flex-col justify-between items-center mb-6 gap-1 sm:gap-0">
          <div className="relative h-10 min-w-[200px]">
            <h1
              className={`absolute inset-0  md:text-3xl text-xl font-bold transition-all duration-500 ease-in-out transform
              ${isDevMode ? "opacity-0 translate-y-3 scale-95" : "opacity-100 translate-y-0 scale-100"}`}
            >
              Submit Your Project
            </h1>
            <h1
              className={`absolute inset-0 text-3xl font-bold transition-all duration-500 ease-in-out transform
              ${isDevMode ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"}`}
            >
              Request an Idea
            </h1>
          </div>
          <Switch.Group>
            <div className="flex items-center gap-2">
              <Switch.Label className="whitespace-nowrap">Developer Mode</Switch.Label>
              <Switch
                checked={isDevMode}
                onChange={setIsDevMode}
                className={`${isDevMode ? "bg-[#144D35]" : "bg-gray-700"}
                relative inline-flex h-6 w-11 items-center rounded-full transition`}
              >
                <span
                  className={`${isDevMode ? "translate-x-6" : "translate-x-1"}
                  inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </Switch.Group>
        </div>

        <form className="space-y-6 md:mt-6">
          {/* Shared Fields */}
          <div className="flex flex-col">
            <label className="block mb-1">Tool/App Name</label>
            <input
              type="text"
              className="w-full bg-black/30 p-2 ring-1 ring-white/10 rounded-md
                transition-all duration-400 focus-within:ring-2
                focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]
                focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="block mb-1">{isDevMode ? "Project Title" : "Idea Title"}</label>
            <input
              type="text"
              className="w-full bg-black/30 p-2 ring-1 ring-white/10 rounded-md
                transition-all duration-400 focus-within:ring-2
                focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]
                focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="block mb-1">{isDevMode ? "Description" : "Full Description"}</label>
            <textarea
              className="min-h-[120px] w-full bg-black/30 p-2 ring-1 ring-white/10 rounded-md
                transition-all duration-400 focus-within:ring-2
                focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]
                focus:outline-none"
            />
          </div>

          {isDevMode ? (
            <>
              {/* Developer Fields */}
              <div className="flex flex-col">
                <label className="block mb-1">GitHub Repo Link</label>
                <input
                  type="url"
                  className="w-full bg-black/30 p-2 ring-1 ring-white/10 rounded-md
                    transition-all duration-400 focus-within:ring-2
                    focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]
                    focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="block mb-1">Demo Link</label>
                <input
                  type="url"
                  className="w-full bg-black/30 p-2 ring-1 ring-white/10 rounded-md
                    transition-all duration-400 focus-within:ring-2
                    focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]
                    focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="block mb-1">Explanation/Tutorial Link</label>
                <input
                  type="url"
                  className="w-full bg-black/30 p-2 ring-1 ring-white/10 rounded-md
                    transition-all duration-400 focus-within:ring-2
                    focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]
                    focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="block mb-1">Upload Image/Video</label>
                <input
                  type="file"
                  className="w-full bg-black/30 p-2 ring-1 ring-white/10 rounded-md
                    transition-all duration-400 focus-within:ring-2
                    focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]
                    focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="block mb-1">Technologies Used (comma separated)</label>
                <input
                  type="text"
                  className="w-full bg-black/30 p-2 ring-1 ring-white/10 rounded-md
                    transition-all duration-400 focus-within:ring-2
                    focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]
                    focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="block mb-1">Hours Worked</label>
                <input
                  type="number"
                  min={0}
                  className="w-full bg-black/30 p-2 ring-1 ring-white/10 rounded-md
                    transition-all duration-400 focus-within:ring-2
                    focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]
                    focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <label>Status:</label>
                <Switch.Group>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={isReady}
                      onChange={setIsReady}
                      className={`${isReady ? "bg-[#144D35]" : "bg-gray-700"}
                      relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                      <span
                        className={`${isReady ? "translate-x-6" : "translate-x-1"}
                      inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                    <Switch.Label>{isReady ? "Ready to Use" : "In Development"}</Switch.Label>
                  </div>
                </Switch.Group>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#144D35] backdrop-blur-2xl z-10 relative text-white
                transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#144D35]/30
                transform px-6 rounded-lg font-semibold"
              >
                Add My Project
              </button>
            </>
          ) : (
            <>
              {/* User Fields */}
              <div className="flex flex-col">
                <label className="block mb-1">Categories</label>
                <input
                  type="text"
                  placeholder="e.g. productivity, health"
                  className="w-full bg-black/30 p-2 ring-1 ring-white/10 rounded-md
                    transition-all duration-400 focus-within:ring-2
                    focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]
                    focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="block mb-1">Upload Image/Video</label>
                <input
                  type="file"
                  className="w-full bg-black/30 p-2 ring-1 ring-white/10 rounded-md
                    transition-all duration-400 focus-within:ring-2
                    focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]
                    focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="block mb-1">Pledge a Boost Amount</label>
                <input
                  type="number"
                  min={0}
                  placeholder="$"
                  className="w-full bg-black/30 p-2 ring-1 ring-white/10 rounded-md
                    transition-all duration-400 focus-within:ring-2
                    focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]
                    focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#144D35] backdrop-blur-2xl z-10 relative text-white
                transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#144D35]/30
                transform px-6 rounded-lg font-semibold"
              >
                Ignite My Idea
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}
