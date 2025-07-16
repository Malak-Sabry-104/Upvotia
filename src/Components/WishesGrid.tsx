import { Star } from "lucide-react";

const trendingWishes = [
  {
    id: 1,
    author: "Ahmed Nour",
    date: "1 week ago",
    title: "Dark Mode for Dashboard",
    description: "Allow users to switch between light and dark themes.",
    tags: ["UI", "Theme", "Accessibility"],
    stars: 240,
  },
  {
    id: 2,
    author: "Lina Farouk",
    date: "2 days ago",
    title: "Offline Access Feature",
    description: "Enable reading/editing content when offline.",
    tags: ["Sync", "Mobile", "UX"],
    stars: 198,
  },
  {
    id: 3,
    author: "Kareem El-Deeb",
    date: "5 days ago",
    title: "AI Auto-Reply in Chat",
    description: "Automatically respond to messages using AI.",
    tags: ["AI", "Productivity", "Chat"],
    stars: 312,
  },
];

const TrendingWishGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-[50px] mt-5">
      {trendingWishes.map((wish) => (
        <div
          key={wish.id}
          className="rounded-xl p-5 bg-black-200/10 border border-green-300/20
           backdrop-blur-lg shadow-md text-white space-y-3 transition-all duration-300 hover:scale-[1.02]"
        >
          {/* Author + Date */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">{wish.author}</p>
              <p className="text-xs text-gray-300">{wish.date}</p>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-bold">{wish.title}</h3>
          <p className="text-sm text-gray-200">{wish.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {wish.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-green-700/80 text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stars / Votes */}
          <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
            <Star size={16} fill="currentColor" />
            {wish.stars}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingWishGrid;
