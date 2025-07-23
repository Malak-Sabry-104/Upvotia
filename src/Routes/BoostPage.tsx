import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowUp, FaDollarSign } from "react-icons/fa";
import { wishService } from "../services/wishService";
import { projectService } from "../services/projectService";
import { boostService } from "../services/boostService";
import { commentService } from "../services/commentService";
import type { Wish, Project, Comment } from "../types";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

export default function BoostPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const [item, setItem] = useState<Wish | Project | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [boostAmount, setBoostAmount] = useState<number>(5);
  const [boostMessage, setBoostMessage] = useState("");
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [boosting, setBoosting] = useState(false);

  // Determine if we're viewing a wish or project
  const isWish = location.pathname.includes('/wish/');
  const isProject = location.pathname.includes('/project/');

  useEffect(() => {
    if (id) {
      fetchItem();
      fetchComments();
    }
  }, [id, isWish, isProject]);

  const fetchItem = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      let data;
      
      if (isWish) {
        data = await wishService.getWish(Number(id));
      } else if (isProject) {
        data = await projectService.getProject(Number(id));
      }
      
      setItem(data || null);
    } catch (error) {
      console.error('Failed to fetch item:', error);
      toast.error('Failed to load item');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    if (!id) return;
    
    try {
      setCommentsLoading(true);
      const params = {
        content_type: isWish ? 'wish' : 'project',
        object_id: Number(id)
      };
      const response = await commentService.getComments(params);
      setComments(response.results);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleUpvote = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to upvote');
      return;
    }

    try {
      if (isWish) {
        await wishService.toggleUpvote(Number(id));
      } else if (isProject) {
        await projectService.toggleUpvote(Number(id));
      }
      
      // Refresh item data
      fetchItem();
      toast.success('Upvote toggled!');
    } catch (error) {
      console.error('Failed to upvote:', error);
      toast.error('Failed to upvote');
    }
  };

  const handleBoost = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to boost');
      return;
    }

    if (boostAmount <= 0) {
      toast.error('Boost amount must be greater than 0');
      return;
    }

    try {
      setBoosting(true);
      
      if (isWish) {
        await boostService.boostWish(Number(id), boostAmount, boostMessage);
      } else if (isProject) {
        await boostService.boostProject(Number(id), boostAmount, boostMessage);
      }
      
      toast.success(`Successfully boosted with $${boostAmount}!`);
      setShowBoostModal(false);
      setBoostAmount(5);
      setBoostMessage("");
      
      // Refresh item data
      fetchItem();
    } catch (error) {
      console.error('Failed to boost:', error);
      toast.error('Failed to boost item');
    } finally {
      setBoosting(false);
    }
  };

  if (loading) {
    return (
      <div className="section-gradient-bottom-right md:h-[120vh] h-[100vh] p-10 text-white md:px-[8rem] pt-[6rem] flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="section-gradient-bottom-right md:h-[120vh] h-[100vh] p-10 text-white md:px-[8rem] pt-[6rem]">
        <div className="text-xl">Item not found.</div>
      </div>
    );
  }

  return (
    <>
      <div 
        style={{ width: "100%"}}
        className="section-gradient-bottom-right min-h-screen p-10 text-white md:px-[8rem] pt-[6rem]">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
          <p className="text-sm text-gray-400 mb-4">
            Tool: {item.tool_app_name} • Date: {new Date(item.created_at).toLocaleDateString()}
            {isProject && 'status' in item && ` • Status: ${item.status}`}
          </p>
          <p className="text-lg mb-4">{item.description}</p>
        </div>

        {/* Categories/Tags */}
        <div className="mb-4 flex gap-2 flex-wrap">
          {isWish && 'categories_list' in item && item.categories_list.map((category) => (
            <span
              key={category}
              className="px-3 py-1 rounded-md text-sm bg-white/10 text-white"
            >
              {category}
            </span>
          ))}
          {isProject && 'technologies' in item && item.technologies.split(',').map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-md text-sm bg-blue/10 text-blue-200"
            >
              {tech.trim()}
            </span>
          ))}
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center gap-6 mb-6">
          <button
            onClick={handleUpvote}
            className="flex items-center px-4 py-2 bg-green-400/20 border border-green-300 rounded text-white hover:bg-green-300/30 transition"
          >
            <FaArrowUp className="mr-2" />
            Upvote ({item.upvotes_count})
          </button>

          <button
            onClick={() => setShowBoostModal(true)}
            className="flex items-center px-4 py-2 bg-yellow-400/20 border border-yellow-300 rounded text-white hover:bg-yellow-300/30 transition"
          >
            <FaDollarSign className="mr-2" />
            Boost
          </button>

          <div className="flex items-center text-gray-300">
            <FaDollarSign className="mr-2 text-green-400" />
            ${item.total_funding} backed
          </div>

          {isProject && 'hours_worked' in item && (
            <div className="flex items-center text-gray-300">
              <span>{item.hours_worked} hours worked</span>
            </div>
          )}
        </div>

        {/* Project-specific sections */}
        {isProject && 'github_repo' in item && (
          <div className="border-t border-white/20 pt-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Project Links</h2>
            <div className="space-y-2 text-sm">
              {item.github_repo && (
                <p>
                  GitHub:{" "}
                  <a
                    href={item.github_repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    View Repository
                  </a>
                </p>
              )}
              {item.demo_link && (
                <p>
                  Demo:{" "}
                  <a
                    href={item.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    Live Preview
                  </a>
                </p>
              )}
              {item.tutorial_link && (
                <p>
                  Tutorial:{" "}
                  <a
                    href={item.tutorial_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    Watch Tutorial
                  </a>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="border-t border-white/20 pt-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          {commentsLoading ? (
            <p className="text-sm text-gray-400">Loading comments...</p>
          ) : comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                  <div className="flex items-start gap-3">
                    <img
                      src={comment.user.profile?.avatar}
                      alt={comment.user.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white">{comment.user.username}</span>
                        <span className="text-gray-400 text-sm">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No comments yet.</p>
          )}
        </div>
      </div>

      {/* Boost Modal */}
      {showBoostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Boost this {isWish ? 'Wish' : 'Project'}</h3>
            
            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">Amount ($)</label>
              <input
                type="number"
                min="1"
                value={boostAmount}
                onChange={(e) => setBoostAmount(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-400"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm mb-2">Message (optional)</label>
              <textarea
                value={boostMessage}
                onChange={(e) => setBoostMessage(e.target.value)}
                placeholder="Add a motivational message..."
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-400 h-20 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBoostModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBoost}
                disabled={boosting}
                className="flex-1 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
              >
                {boosting ? 'Boosting...' : `Boost $${boostAmount}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
