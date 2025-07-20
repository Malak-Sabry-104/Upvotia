import { useEffect, useState } from "react";
import { FaGithub, FaPlay, FaBook, FaClock } from "react-icons/fa";
import placeholder from "../assets/placeholder.png"; // استيراد الصورة

interface Project {
  id: number;
  title: string;
  tool: string;
  status: "Ready" | "In Development";
  github: string;
  demo: string;
  tutorial: string;
  hoursSpent: number;
  technologies: string[];
  preview: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Real-time Chat App",
    tool: "React",
    status: "In Development",
    github: "https://github.com/example/chat-app",
    demo: "https://demo.chatapp.com",
    tutorial: "https://youtube.com/tutorial-chatapp",
    hoursSpent: 45,
    technologies: ["React", "Socket.io", "Node.js"],
    preview: placeholder,
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    tool: "Vue",
    status: "Ready",
    github: "https://github.com/example/ecommerce-dashboard",
    demo: "https://demo.ecommerce.com",
    tutorial: "https://youtube.com/tutorial-ecommerce",
    hoursSpent: 70,
    technologies: ["Vue", "Tailwind CSS", "Firebase"],
    preview: placeholder,
  },
  {
    id: 3,
    title: "Personal Blog CMS",
    tool: "Next.js",
    status: "In Development",
    github: "https://github.com/example/blog-cms",
    demo: "https://demo.blogcms.com",
    tutorial: "https://youtube.com/tutorial-blogcms",
    hoursSpent: 60,
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
    preview: placeholder,
  },
];

export default function Devhub() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [filters, setFilters] = useState({
    tool: "All Tools",
    status: "All Statuses",
  });

  useEffect(() => {
    filterProjects();
  }, [filters]);

  function filterProjects() {
    let filtered = projects;

    if (filters.tool !== "All Tools") {
      filtered = filtered.filter((p) => p.tool === filters.tool);
    }

    if (filters.status !== "All Statuses") {
      filtered = filtered.filter((p) => p.status === filters.status);
    }

    setFilteredProjects(filtered);
  }

  const updateFilter = (type: string, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const toolOptions = [
    "All Tools",
    ...Array.from(new Set(projects.map((p) => p.tool))),
  ];

  const statusOptions = ["All Statuses", "Ready", "In Development"];

  return (
    <section className="section-gradient-top-left  min-h-screen flex flex-col items-center 
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

      {/* Project Cards Grid */}
      <div className="grid gap-8 md:grid-cols-2 w-[85%] lg:grid-cols-3">
        {filteredProjects.length === 0 ? (
          <p className="text-gray-400 text-center col-span-full">
            No projects found. Try different filters.
          </p>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="blacky-bg rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer"
            >
              <img
                src={project.preview}
                alt={`${project.title} preview`}
                className="w-full h-40 object-cover"
              />

              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="px-3 py-1 bg-gray-700/50 rounded-full text-xs font-semibold text-white">
                    {project.tool}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === "Ready"
                        ? "bg-green-500/60 text-white"
                        : "bg-yellow-500/70 text-white"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
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
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-[#123727]"
                    title="GitHub Repo"
                  >
                    <FaGithub />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-[#123727]"
                    title="Demo"
                  >
                    <FaPlay />
                    <span className="text-sm">Demo</span>
                  </a>
                  <a
                    href={project.tutorial}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-[#123727]"
                    title="Tutorial"
                  >
                    <FaBook />
                    <span className="text-sm">Tutorial</span>
                  </a>
                </div>

                {/* Hours spent */}
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <FaClock />
                  <span>{project.hoursSpent} hours spent</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
