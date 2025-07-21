import { useParams } from "react-router-dom";
import { useState } from "react";
import personImg from "../assets/images.png";

import {
  FaGithub,
  FaTwitter,
  FaEdit,
  FaLightbulb,
  FaRocket,
  FaFire,
  FaComments,
} from "react-icons/fa";

interface ProfileData {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  role: "user" | "dev";
  github?: string;
  twitter?: string;
  ideas?: string[]; 
  projects?: string[]; 
  boosts?: string[]; 
  comments?: string[]; 
}

const mockProfiles: ProfileData[] = [
  {
    id: "1",
    name: "Alexandra Chen",
    bio: "Creative coder & idea igniter",
    avatar: personImg,
    role: "user",
    github: "https://github.com/alexandra",
    twitter: "https://twitter.com/alexandra",
    ideas: ["Idea 1: AI chatbot", "Idea 2: Social app"],
    boosts: ["Boosted Idea 1", "Boosted Project A"],
    comments: ["Great idea!", "Needs improvement."],
  },
  {
    id: "2",
    name: "Malak Sabry",
    bio: "Frontend dev with passion for ideas",
    avatar: personImg,
    role: "dev",
    github: "https://github.com/malaksabry",
    twitter: "https://twitter.com/malaksabry",
    projects: ["Project A - Todo App", "Project B - Blog"],
    boosts: ["Boosted Project B"],
    comments: ["Nice work!", "Loved the UI."],
  },
];


const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const profile = mockProfiles.find((p) => p.id === id);

  const [activeTab, setActiveTab] = useState<
    "ideas" | "projects" | "boosts" | "comments"
  >(profile?.role === "dev" ? "projects" : "ideas");

  if (!profile)
    return (
      <div className="p-6 text-red-600 font-semibold">
        Profile not found
      </div>
    );

  return (
    <div className="animate-on-scroll max-w-4xl mx-auto p-6 mt-[5rem]">
      {/* Header */}
      <div className="flex items-center space-x-6">
        <img
          src={profile.avatar}
          alt={`${profile.name} avatar`}
          className="w-24 h-24 rounded-full ring-4 ring-gray-300"
        />
        <div>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-gray-700 mt-1">{profile.bio}</p>

          {/* Social Links */}
          <div className="flex items-center space-x-4 mt-3 text-gray-600">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500/50 flex items-center gap-1"
              >
                <FaGithub size={20} /> GitHub
              </a>
            )}
            {profile.twitter && (
              <a
                href={profile.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500/50 flex items-center gap-1"
              >
                <FaTwitter size={20} /> Twitter
              </a>
            )}
          </div>

          {/* Edit Profile */}
          <button
            className="mt-4 px-4 py-2 bg-[#123727] text-white rounded hover:bg-green-900/50 flex items-center gap-2"
            onClick={() => alert("Edit profile clicked")}
          >
            <FaEdit /> Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 border-b border-gray-300 flex space-x-6">
        {profile.role === "user" && (
          <button
            onClick={() => setActiveTab("ideas")}
            className={`pb-2 ${
              activeTab === "ideas"
                ? "border-b-4 border-[#123727] text-[#123727] font-semibold"
                : "text-gray-500"
            }`}
          >
            <FaLightbulb className="inline mr-1" /> Ideas Submitted
          </button>
        )}

        {profile.role === "dev" && (
          <button
            onClick={() => setActiveTab("projects")}
            className={`pb-2 ${
              activeTab === "projects"
                ? "border-b-4 border-[#123727] text-[#123727] font-semibold"
                : "text-gray-500"
            }`}
          >
            <FaRocket className="inline mr-1" /> Projects Submitted
          </button>
        )}

        <button
          onClick={() => setActiveTab("boosts")}
          className={`pb-2 ${
            activeTab === "boosts"
              ? "border-b-4 border-[#123727] text-[#123727] font-semibold"
              : "text-gray-500"
          }`}
        >
          <FaFire className="inline mr-1" /> Boosts Made
        </button>

        <button
          onClick={() => setActiveTab("comments")}
          className={`pb-2 ${
            activeTab === "comments"
              ? "border-b-4 border-[#123727] text-[#123727] font-semibold"
              : "text-gray-500"
          }`}
        >
          <FaComments className="inline mr-1" /> Comments History
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6 min-h-[150px]">
        {activeTab === "ideas" && profile.role === "user" && (
          <>
            {profile.ideas && profile.ideas.length > 0 ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {profile.ideas.map((idea, i) => (
                  <li key={i}>{idea}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No ideas submitted yet.</p>
            )}
          </>
        )}

        {activeTab === "projects" && profile.role === "dev" && (
          <>
            {profile.projects && profile.projects.length > 0 ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {profile.projects.map((proj, i) => (
                  <li key={i}>{proj}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No projects submitted yet.</p>
            )}
          </>
        )}

        {activeTab === "boosts" && (
          <>
            {profile.boosts && profile.boosts.length > 0 ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {profile.boosts.map((boost, i) => (
                  <li key={i}>{boost}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No boosts made yet.</p>
            )}
          </>
        )}

        {activeTab === "comments" && (
          <>
            {profile.comments && profile.comments.length > 0 ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {profile.comments.map((cmt, i) => (
                  <li key={i}>{cmt}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
