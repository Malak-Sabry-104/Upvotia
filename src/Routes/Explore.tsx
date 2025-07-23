import { useEffect, useState } from "react";
import { FaSearch, FaArrowUp, FaDollarSign } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { wishService } from "../services/wishService";
import type { Wish } from "../types";
import { toast } from "react-toastify";

export default function ExploreAsks() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    tool: "All Tools",
    category: "All Categories",
    sort: "Top Boosted",
  });

  useEffect(() => {
    fetchWishes();
  }, [search, filters]);

  async function fetchWishes() {
    try {
      setLoading(true);
      const params: any = {};
      
      if (search) params.search = search;
      if (filters.tool !== "All Tools") params.tool = filters.tool;
      if (filters.category !== "All Categories") params.category = filters.category;
      if (filters.sort) params.sort = filters.sort;
      
      const response = await wishService.getWishes(params);
      setWishes(response.results);
    } catch (error) {
      console.error('Failed to fetch wishes:', error);
      toast.error('Failed to load wishes');
    } finally {
      setLoading(false);
    }
  }

  const updateFilter = (type: string, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleUpvote = async (wishId: number) => {
    try {
      await wishService.toggleUpvote(wishId);
      // Refresh wishes to get updated upvote count
      fetchWishes();
      toast.success('Upvote toggled!');
    } catch (error) {
      console.error('Failed to upvote:', error);
      toast.error('Failed to upvote wish');
    }
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
      style={{  width: "100%" }}
      className="animate-on-scroll  section-gradient-top-left md:h-[140vh] h-[270vh] "
    >
      <div className=" font-sans pt-[5rem]">
        <div className=" md:mx-[4rem] px-4 pt-6">
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

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto"></div>
              <p className="text-white mt-4">Loading wishes...</p>
            </div>
          ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {wishes.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <FaSearch className="text-gray-300 text-3xl mb-4" />
                <h3 className="text-lg font-medium text-white">
                  No wishes found
                </h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              wishes.map((wish) => {
                return (
                  <div
                    key={wish.id}
                    className="blacky-bg rounded-lg shadow hover:shadow-lg transition-transform duration-200 hover:-translate-y-1"
                  >
                    <Link to={`/wish/${wish.id}`} className="block p-5">
                      <div className="flex justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/20 text-white/50 ring-1">
                          {wish.tool_app_name}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-300/40 ring-1 ring-white/30 text-white">
                          Open
                        </span>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-white hover:text-green-400 transition-colors">
                          {wish.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                          {wish.description}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {wish.categories_list.map((category) => (
                          <span
                            key={category}
                            className="px-2 py-1 rounded-md text-xs font-medium bg-white/10 text-white hover:bg-black/10"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </Link>
                    
                    <div className="px-5 pb-5">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleUpvote(wish.id);
                          }}
                          className="flex items-center px-3 text-white py-1 border border-gray-300 shadow-sm text-sm rounded-md bg-green-200/30 cursor-pointer hover:bg-green-300/40 transition"
                        >
                          <FaArrowUp className="mr-1" />
                          {wish.upvotes_count}
                        </button>
                        <div className="flex items-center text-sm text-gray-500">
                          <FaDollarSign className="mr-1 text-green-500" />
                          ${wish.total_funding} backed
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
