// Components/WishCard.tsx
import { Star } from "lucide-react";

const WishCard = ({ title, description, tags, author, stars }: {
  title: string;
  description: string;
  tags: string[];
  author: string;
  stars: number;
}) => {
  return (
    <div className="blacky-bg rounded-xl p-4 mt-15 text-white shadow-md space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex  justify-between gap-10 items-center">
          <p className="text-sm font-semibold">{author}</p>
          <p className="text-xs text-gray-300">1 week ago</p>
        </div>
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-200">{description}</p>
      {/* <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs px-2 py-1 rounded-full bg-green-700/80 text-white"
          >
            {tag}
          </span>
        ))}
      </div> */}
      <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
        <Star size={16} fill="currentColor" />
        {stars}
      </div>
    </div>
  );
};

export default WishCard;
