// Profile.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaGithub,
  FaTwitter,
  FaEdit,
} from "react-icons/fa";

// Mock API fetch for user data by ID
const fetchUserById = async (id: string) => {
  // Replace with real API call
  // For demo, return mock data:
  return {
    id,
    name: id === "dev1" ? "John Dev" : "Jane User",
    avatar: "https://i.pravatar.cc/150?img=" + id,
    bio: "This is a short bio for user " + id,
    role: id === "dev1" ? "developer" : "user", // role determines tabs shown
    githubConnected: true,
    twitterConnected: false,
    ideas: [
      { id: 1, title: "Idea 1" },
      { id: 2, title: "Idea 2" },
    ],
    projects: [
      { id: 101, title: "Project Alpha" },
      { id: 102, title: "Project Beta" },
    ],
    boosts: [
      { id: 201, title: "Boosted Idea #1" },
    ],
    comments: [
      { id: 301, text: "Nice idea!" },
      { id: 302, text: "Thanks for sharing!" },
    ],
  };
};

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("boosts");

  useEffect(() => {
    if (!id) return;
    fetchUserById(id).then(setUser);
  }, [id]);

  if (!user) return <div>Loading profile...</div>;

  const {
    avatar,
    name,
    bio,
    role,
    githubConnected,
    twitterConnected,
    ideas,
    projects,
    boosts,
    comments,
  } = user;

  // Determine which tabs to show
  const tabs = [
    ...(role === "user" ? ["ideas"] : []),
    ...(role === "developer" ? ["projects"] : []),
    "boosts",
    "comments",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-semibold">{name}</h1>
          <p className="text-gray-600 mt-1">{bio}</p>
          <div className="mt-3 flex gap-3">
            <button className="flex items-center gap-2 px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 transition">
              <FaEdit />
              Edit Profile
            </button>
            <button
              className={`flex items-center gap-2 px-3 py-1 rounded border ${
                githubConnected
                  ? "bg-green-100 border-green-500 text-green-700"
                  : "border-gray-300 hover:bg-gray-100"
              } transition`}
            >
              <FaGithub />
              {githubConnected ? "GitHub Connected" : "Connect GitHub"}
            </button>
            <button
              className={`flex items-center gap-2 px-3 py-1 rounded border ${
                twitterConnected
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : "border-gray-300 hover:bg-gray-100"
              } transition`}
            >
              <FaTwitter />
              {twitterConnected ? "Twitter Connected" : "Connect Twitter"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-300 mb-4">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-semibold ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              } transition`}
            >
              {tab === "ideas"
                ? "Ideas Submitted"
                : tab === "projects"
                ? "Projects Submitted"
                : tab === "boosts"
                ? "Boosts Made"
                : tab === "comments"
                ? "Comments History"
                : tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "ideas" && (
          <div>
            {ideas.length === 0 ? (
              <p>No ideas submitted yet.</p>
            ) : (
              <ul className="space-y-2">
                {ideas.map((idea: any) => (
                  <li
                    key={idea.id}
                    className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
                  >
                    {idea.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "projects" && (
          <div>
            {projects.length === 0 ? (
              <p>No projects submitted yet.</p>
            ) : (
              <ul className="space-y-2">
                {projects.map((proj: any) => (
                  <li
                    key={proj.id}
                    className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
                  >
                    {proj.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "boosts" && (
          <div>
            {boosts.length === 0 ? (
              <p>No boosts made yet.</p>
            ) : (
              <ul className="space-y-2">
                {boosts.map((boost: any) => (
                  <li
                    key={boost.id}
                    className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
                  >
                    {boost.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "comments" && (
          <div>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul className="space-y-2">
                {comments.map((comment: any) => (
                  <li
                    key={comment.id}
                    className="p-3 border rounded bg-gray-50"
                  >
                    {comment.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
