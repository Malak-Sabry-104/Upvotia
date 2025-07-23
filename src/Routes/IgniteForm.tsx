import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useAuth } from "../contexts/AuthContext";
import { wishService } from "../services/wishService";
import { projectService } from "../services/projectService";
import type { WishFormData, ProjectFormData } from "../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function IgniteItForm() {
  const [isDevMode, setIsDevMode] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please Login</h2>
          <p className="text-gray-400 mb-4">You need to be logged in to submit ideas or projects.</p>
          <button
            onClick={() => navigate('/auth')}
            className="px-6 py-3 bg-[#144D35] text-white rounded-lg hover:bg-[#1a5c42] transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isDevMode) {
        // Submit project
        const projectData: ProjectFormData = {
          title: formData.title || '',
          tool_app_name: formData.tool_app_name || '',
          description: formData.description || '',
          github_repo: formData.github_repo || '',
          demo_link: formData.demo_link || '',
          tutorial_link: formData.tutorial_link || '',
          technologies: formData.technologies || '',
          hours_worked: parseInt(formData.hours_worked) || 0,
          status: isReady ? 'ready' : 'in_dev',
          image: imageFile || undefined,
        };

        await projectService.createProject(projectData);
        toast.success('Project submitted successfully!');
      } else {
        // Submit wish
        const wishData: WishFormData = {
          title: formData.title || '',
          tool_app_name: formData.tool_app_name || '',
          description: formData.description || '',
          categories: formData.categories || '',
          pledge_amount: parseFloat(formData.pledge_amount) || 0,
          image: imageFile || undefined,
        };

        await wishService.createWish(wishData);
        toast.success('Wish submitted successfully!');
      }

      // Reset form
      setFormData({});
      setImageFile(null);
      navigate('/ideas');
    } catch (error: any) {
      console.error('Submit failed:', error);
      // toast.error('Failed to submit. Please try again.');
      toast.error('Please, fill all fields correctly and then resubmit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className=" bg-white/10 rounded-3xl flex flex-col justify-center py-10 px-6
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
              Submit Your Idea
            </h1>
            <h1
              className={`absolute inset-0 md:text-3xl text-xl font-bold transition-all duration-500 ease-in-out transform
              ${isDevMode ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"}`}
            >
              Submit Your Project
            </h1>
          </div>
          <Switch.Group>
            <div className="flex items-center gap-2">
              <Switch.Label className="whitespace-nowrap">Developer Mode</Switch.Label>
              <Switch
                checked={isDevMode}
                onChange={setIsDevMode}
                disabled={loading}
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

        <form className="space-y-6 md:mt-6" onSubmit={handleSubmit}>
          {/* Shared Fields */}
          <div className="flex flex-col">
            <label className="block mb-1">Tool/App Name</label>
            <input
              type="text"
              value={formData.tool_app_name || ''}
              onChange={(e) => handleInputChange('tool_app_name', e.target.value)}
              required
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
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
              className="w-full bg-black/30 p-2 ring-1 ring-white/10 rounded-md
                transition-all duration-400 focus-within:ring-2
                focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]
                focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="block mb-1">{isDevMode ? "Description" : "Full Description"}</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
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
                  value={formData.github_repo || ''}
                  onChange={(e) => handleInputChange('github_repo', e.target.value)}
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
                  value={formData.demo_link || ''}
                  onChange={(e) => handleInputChange('demo_link', e.target.value)}
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
                  value={formData.tutorial_link || ''}
                  onChange={(e) => handleInputChange('tutorial_link', e.target.value)}
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
                  onChange={handleImageChange}
                  accept="image/*"
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
                  value={formData.technologies || ''}
                  onChange={(e) => handleInputChange('technologies', e.target.value)}
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
                  value={formData.hours_worked || ''}
                  onChange={(e) => handleInputChange('hours_worked', e.target.value)}
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
                      disabled={loading}
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
                disabled={loading}
                className={`w-full py-3 bg-[#144D35] backdrop-blur-2xl z-10 relative text-white
                transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#144D35]/30
                transform px-6 rounded-lg font-semibold ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Submitting...' : 'Add My Project'}
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
                  value={formData.categories || ''}
                  onChange={(e) => handleInputChange('categories', e.target.value)}
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
                  onChange={handleImageChange}
                  accept="image/*"
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
                  value={formData.pledge_amount || ''}
                  onChange={(e) => handleInputChange('pledge_amount', e.target.value)}
                  className="w-full bg-black/30 p-2 ring-1 ring-white/10 rounded-md
                    transition-all duration-400 focus-within:ring-2
                    focus-within:ring-[#123727] focus-within:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88]
                    focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-[#144D35] backdrop-blur-2xl z-10 relative text-white
                transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#144D35]/30
                transform px-6 rounded-lg font-semibold ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Submitting...' : 'Ignite My Idea'}
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}
