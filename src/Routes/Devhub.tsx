import { useEffect, useState } from "react";
import { FaGithub, FaPlay, FaBook, FaClock, FaArrowUp, FaDollarSign } from "react-icons/fa";
import placeholder from "../assets/placeholder.png";
import { projectService } from "../services/projectService";
import type { Project } from "../types";
import { toast } from "react-toastify";

export default function Devhub() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    tool: "All Tools",
    status: "All Statuses",
  });

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  async function fetchProjects() {
    try {
      setLoading(true);
      const params: any = {};
      
      if (filters.tool !== "All Tools") params.tool = filters.tool;
      if (filters.status !== "All Statuses") {
        // Map frontend status to backend status
        if (filters.status === "Ready") params.status = "ready";
        else if (filters.status === "In Development") params.status = "in_dev";
      }
      
      const response = await projectService.getProjects(params);
      setProjects(response.results);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }

  const updateFilter = (type: string, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  // Get unique tools from projects for filter options
  const toolOptions = [
    "All Tools",
    ...Array.from(new Set(projects.map((p) => p.tool_app_name))),
  ];

  const statusOptions = ["All Statuses", "Ready", "In Development"];

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'ready': return 'Ready';
      case 'in_dev': return 'In Development';
      case 'shipped': return 'Shipped';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-500/60 text-white';
      case 'shipped': return 'bg-blue-500/60 text-white';
      case 'in_dev': 
      default: return 'bg-yellow-500/70 text-white';
    }
  };

  const handleUpvote = async (projectId: number) => {
    try {
      await projectService.toggleUpvote(projectId);
      // Refresh projects to get updated upvote count
      fetchProjects();
      toast.success('Upvote toggled!');
    } catch (error) {
      console.error('Failed to upvote:', error);
      toast.error('Failed to upvote project');
    }
  };

  return (
    <section className="animate-on-scroll  section-gradient-top-left  min-h-screen flex flex-col items-center 
    md:px-8 pt-20 pb-10">
      <h1 className="text-white text-4xl font-bold mb-8">Developer Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-10 max-w-4xl">
        {/* Tool Filter */}
        <select
          className="bg-[#141414] text-white rounded-md p-3 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#123727] transition duration-300"
          value={filters.tool}
          onChange={(e) => updateFilter("tool", e.target.value)}
        >
          {toolOptions.map((tool) => (
            <option key={tool} value={tool}>
              {tool}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          className="bg-[#141414] text-white rounded-md p-3 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#123727] transition duration-300"
          value={filters.status}
          onChange={(e) => updateFilter("status", e.target.value)}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto"></div>
          <p className="text-white mt-4">Loading projects...</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 w-[85%] lg:grid-cols-3">
        {projects.length === 0 ? (
          <p className="text-gray-400 text-center col-span-full">
            No projects found. Try different filters.
          </p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="blacky-bg rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer"
            >
              <img
                src={project.image || placeholder}
                alt={`${project.title} preview`}
                className="w-full h-40 object-cover"
              />

              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="px-3 py-1 bg-gray-700/50 rounded-full text-xs font-semibold text-white">
                    {project.tool_app_name}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}
                  >
                    {getStatusDisplay(project.status)}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies_list.map((tech) => (
                    <span
                      key={tech}
                      className="bg-white/10 text-white px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4 mb-4 text-white/80">
                  {project.github_repo && (
                    <a
                      href={project.github_repo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-[#123727]"
                      title="GitHub Repo"
                    >
                      <FaGithub />
                      <span className="text-sm">GitHub</span>
                    </a>
                  )}
                  {project.demo_link && (
                    <a
                      href={project.demo_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-[#123727]"
                      title="Demo"
                    >
                      <FaPlay />
                      <span className="text-sm">Demo</span>
                    </a>
                  )}
                  {project.tutorial_link && (
                    <a
                      href={project.tutorial_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-[#123727]"
                      title="Tutorial"
                    >
                      <FaBook />
                      <span className="text-sm">Tutorial</span>
                    </a>
                  )}
                </div>

                {/* Hours spent & Actions */}
                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>{project.hours_worked} hours spent</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleUpvote(project.id)}
                      className="flex items-center gap-1 text-white hover:text-green-400 transition"
                    >
                      <FaArrowUp />
                      <span>{project.upvotes_count}</span>
                    </button>
                    
                    <div className="flex items-center gap-1 text-green-400">
                      <FaDollarSign />
                      <span>${project.total_funding}</span>
                    </div>
                  </div>
                </div>

                {/* Developer info */}
                <div className="mt-3 pt-3 border-t border-gray-700/50">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <img 
                      src={project.user.profile?.avatar || placeholder} 
                      alt={project.user.username}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>by {project.user.username}</span>
                    <span className="text-gray-600">•</span>
                    <span>{new Date(project.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        </div>
      )}
    </section>
  );
}
