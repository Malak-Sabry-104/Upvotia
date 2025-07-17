import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaArrowUp, FaDollarSign } from "react-icons/fa";

const placeholderIdeas = [
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
    progress: {
      github: "https://github.com",
      demo: "https://demo.example.com/shortcuts",
      tutorial: "https://youtube.com",
      status: "In Development",
      updates: ["Implemented basic shortcuts", "Testing message formatting"],
    },
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
    progress: {
      github: "https://github.com",
      demo: "https://demo.example.com/emoji",
      tutorial: "https://youtube.com",
      status: "Done",
      updates: ["Feature released in v2.3", "Updated settings page"],
    },
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
    progress: {
      github: "https://github.com",
      demo: "https://demo.example.com/figma-offline",
      tutorial: "https://youtube.com",
      status: "In Development",
      updates: ["Local storage prototype working", "Sync module in progress"],
    },
  },
];

export default function BoostPage() {
  const { id } = useParams<{ id: string }>();
  const idea = placeholderIdeas.find((item) => item.id === Number(id));
  const [votes, setVotes] = useState(idea?.votes || 0);

  console.log("🚀 Route ID:", id);
  console.log("✅ Idea Found:", idea);

  if (!idea) {
    return <div className="text-white p-8">Idea not found.</div>;
  }

  return (
    <div className="p-10 text-white max-w-4xl mx-auto pt-[5rem]">
      <h1 className="text-3xl font-bold mb-2">{idea.title}</h1>
      <p className="text-sm text-gray-400 mb-4">
        Tool: {idea.tool} • Date: {idea.date}
      </p>

      <p className="text-lg mb-4">{idea.description}</p>

      <div className="mb-4 flex gap-2 flex-wrap">
        {idea.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-md text-sm bg-white/10 text-white"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-green-300/30 text-sm rounded">
          {idea.status}
        </span>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <button
          onClick={() => setVotes((prev) => prev + 1)}
          className="flex items-center px-4 py-2 bg-green-400/20 border border-green-300 rounded text-white hover:bg-green-300/30"
        >
          <FaArrowUp className="mr-2" />
          Boost ({votes})
        </button>

        <div className="flex items-center text-gray-300">
          <FaDollarSign className="mr-2 text-green-400" />
          {idea.funded} backed
        </div>
      </div>

      <div className="border-t border-white/20 pt-6 mt-6">
        <h2 className="text-xl font-semibold mb-2">Developer Progress</h2>
        {idea.progress ? (
          <div className="space-y-2 text-sm text-gray-300">
            <p>Status: <span className="text-white font-medium">{idea.progress.status}</span></p>
            <p>
              GitHub:{" "}
              <a
                href={idea.progress.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                View Repo
              </a>
            </p>
            <p>
              Demo:{" "}
              <a
                href={idea.progress.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                Live Preview
              </a>
            </p>
            <p>
              Tutorial:{" "}
              <a
                href={idea.progress.tutorial}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                Watch
              </a>
            </p>
            <div>
              <p className="font-medium text-white mb-1">Updates:</p>
              <ul className="list-disc list-inside">
                {idea.progress.updates.map((update, i) => (
                  <li key={i}>{update}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No updates yet.</p>
        )}
      </div>

      <div className="border-t border-white/20 pt-6 mt-6">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <p className="text-sm text-gray-400">No comments yet.</p>
      </div>
    </div>
  );
}
