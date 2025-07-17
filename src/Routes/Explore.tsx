import { useEffect, useState } from "react";
import { FaSearch, FaArrowUp, FaDollarSign } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";

interface Idea {
  id: number;
  title: string;
  tool: string;
  description: string;
  tags: string[];
  status: "Open" | "In Dev" | "Shipped";
  votes: number;
  funded: number;
  date: string;
}

const ideas: Idea[] = [
  {
    id: 1,
    title: "Dark Mode for Mobile App",
    tool: "Notion",
    description:
      "Currently only the desktop version has dark mode. Would love to have it on mobile too for late-night note taking.",
    tags: ["UI", "Mobile", "Accessibility"],
    status: "Open",
    votes: 245,
    funded: 1200,
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "Keyboard Shortcuts for Common Actions",
    tool: "Slack",
    description:
      "Add more keyboard shortcuts to speed up workflow, especially for message formatting and navigation.",
    tags: ["UX", "Productivity"],
    status: "In Dev",
    votes: 189,
    funded: 850,
    date: "2023-06-02",
  },
  {
    id: 3,
    title: "GitHub Integration with Trello",
    tool: "Trello",
    description:
      "Better sync between Trello cards and GitHub issues/pull requests with two-way updates.",
    tags: ["Integration", "Dev Tools"],
    status: "Open",
    votes: 134,
    funded: 325,
    date: "2023-06-10",
  },
  {
    id: 4,
    title: "Performance Optimization for Large Documents",
    tool: "Notion",
    description:
      "Notion becomes very slow with documents containing hundreds of blocks. Needs optimization.",
    tags: ["Performance", "Bug Fix"],
    status: "Open",
    votes: 98,
    funded: 420,
    date: "2023-06-18",
  },
  {
    id: 5,
    title: "Custom Status Emoji in Slack",
    tool: "Slack",
    description:
      "Allow users to set custom emoji as their status, not just the predefined ones.",
    tags: ["UI", "Feature"],
    status: "Shipped",
    votes: 312,
    funded: 1500,
    date: "2023-04-22",
  },
  {
    id: 6,
    title: "Offline Mode for Figma",
    tool: "Figma",
    description:
      "Ability to view and make basic edits to files when offline, with sync when reconnected.",
    tags: ["Feature", "Mobile"],
    status: "In Dev",
    votes: 276,
    funded: 2100,
    date: "2023-05-30",
  },
];

export default function ExploreAsks() {
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>(ideas);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    tool: "All Tools",
    category: "All Categories",
    sort: "Top Boosted",
  });

  useEffect(() => {
    filterIdeas();
  }, [search, filters]);

  function filterIdeas() {
    const searchTerm = search.toLowerCase();
    let results = ideas.filter((idea) => {
      const matchesSearch =
        idea.title.toLowerCase().includes(searchTerm) ||
        idea.tool.toLowerCase().includes(searchTerm) ||
        idea.description.toLowerCase().includes(searchTerm) ||
        idea.tags.some((tag) => tag.toLowerCase().includes(searchTerm));
      const matchesTool =
        filters.tool === "All Tools" || idea.tool === filters.tool;
      const matchesCategory =
        filters.category === "All Categories" ||
        idea.tags.includes(filters.category);
      return matchesSearch && matchesTool && matchesCategory;
    });

    if (filters.sort === "Top Boosted") {
      results.sort((a, b) => b.votes - a.votes);
    } else if (filters.sort === "Newest") {
      results.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (filters.sort === "Most Funded") {
      results.sort((a, b) => b.funded - a.funded);
    }

    setFilteredIdeas(results);
  }

  const updateFilter = (type: string, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const dropdownOptions = {
    tool: ["All Tools", "Notion", "Slack", "Trello", "Figma", "GitHub"],
    category: [
      "All Categories",
      "UI",
      "Performance",
      "Integration",
      "Bug Fix",
      "Feature",
    ],
    sort: ["Top Boosted", "Newest", "Most Funded"],
  };

  return (
    <section
      style={{ height: "140vh", width: "100%" }}
      className="section-gradient-top-left"
    >
      <div className=" font-sans pt-[5rem]">
        <div className=" mx-[4rem] px-4 pt-6">
          <div className="bg-black/10 ring-1 ring-white/10 rounded-lg shadow p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1 relative">
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-3 placeholder-gray-500 sm:text-sm block w-full rounded-md shadow-sm px-4 text-sm ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#123727] focus:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88] transition-all duration-400 p-3 bg-[#141414] text-white py-2"
                  placeholder="Type a tool or feature..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {Object.entries(dropdownOptions).map(([key, options]) => (
                <div key={key} className="relative">
                  <select
                    className="block w-full rounded-md shadow-sm px-4 text-sm ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#123727] focus:shadow-[0_0_5px_#00ff88,0_0_8px_#00ff88] transition-all duration-400 p-3 bg-[#141414] text-white py-2"
                    value={filters[key as keyof typeof filters]}
                    onChange={(e) => updateFilter(key, e.target.value)}
                  >
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {filteredIdeas.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <FaSearch className="text-gray-300 text-3xl mb-4" />
                <h3 className="text-lg font-medium text-gray-900">
                  No ideas found
                </h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              filteredIdeas.map((idea) => {
                return (
                  <div
                    key={idea.id}
                    className="blacky-bg rounded-lg shadow hover:shadow-lg transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="p-5">
                      <div className="flex justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/20 text-white/50 ring-1">
                          {idea.tool}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-300/40 ring-1 ring-white/30 text-white">
                          {idea.status}
                        </span>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-white">
                          {idea.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {idea.description}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {idea.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md text-xs font-medium bg-white/10 text-white hover:bg-black/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex justify-between items-center">

                        <HashLink
                          to={`/boost/${idea.id}`}
                          smooth={true}
                          className="flex items-center px-3 text-white py-1 border border-gray-300 shadow-sm text-sm rounded-md bg-green-200/30 cursor-pointer"
                        >
                          <FaArrowUp className="mr-1" />
                          {idea.votes}
                        </HashLink>
                        <div className="flex items-center text-sm text-gray-500">
                          <FaDollarSign className="mr-1 text-green-500" />
                          {idea.funded} backed
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
