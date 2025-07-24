import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import placeholder from "../assets/images.png";
import { profileService } from "../services/profileService";
import type { User, Wish, Project, Boost, Comment } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

import {
  FaGithub,
  FaTwitter,
  FaEdit,
  FaLightbulb,
  FaRocket,
  FaFire,
  FaComments,
  FaArrowUp,
  FaDollarSign,
  FaCalendar,
  FaUser,
  FaCode,
  FaSave,
  FaTimes,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa";

type TabType = "wishes" | "projects" | "boosts" | "comments";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("wishes");
  const [editMode, setEditMode] = useState(false);
  
  // Tab data
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [boosts, setBoosts] = useState<Boost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [tabLoading, setTabLoading] = useState(false);

  // Edit form data
  const [editData, setEditData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    bio: '',
    user_type: 'user',
    github_url: '',
    twitter_url: '',
    avatar: null as File | null,
  });

  const isOwnProfile = currentUser && profile && currentUser.id === profile.id;
  const userId = id ? parseInt(id) : null;

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  useEffect(() => {
    if (profile) {
      // Set initial active tab based on user type
      const initialTab = profile.profile?.user_type === 'dev' ? 'projects' : 'wishes';
      setActiveTab(initialTab);
      
      // Initialize edit form data
      setEditData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        bio: profile.profile?.bio || '',
        user_type: profile.profile?.user_type || 'user',
        github_url: profile.profile?.github_url || '',
        twitter_url: profile.profile?.twitter_url || '',
        avatar: null,
      });
    }
  }, [profile]);

  useEffect(() => {
    if (profile && userId) {
      fetchTabData();
    }
  }, [activeTab, profile, userId]);

  const fetchProfile = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const userData = await profileService.getUserProfile(userId);
      setProfile(userData);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchTabData = async () => {
    if (!userId) return;
    
    try {
      setTabLoading(true);
      
      switch (activeTab) {
        case 'wishes':
          const wishesData = await profileService.getUserWishes(userId);
          setWishes(wishesData.results);
          break;
        case 'projects':
          const projectsData = await profileService.getUserProjects(userId);
          setProjects(projectsData.results);
          break;
        case 'boosts':
          const boostsData = await profileService.getUserBoosts(userId);
          setBoosts(boostsData.results);
          break;
        case 'comments':
          const commentsData = await profileService.getUserComments(userId);
          setComments(commentsData.results);
          break;
      }
    } catch (error) {
      console.error(`Failed to fetch ${activeTab}:`, error);
      toast.error(`Failed to load ${activeTab}`);
    } finally {
      setTabLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('bio', editData.bio);
      formData.append('user_type', editData.user_type);
      formData.append('github_url', editData.github_url);
      formData.append('twitter_url', editData.twitter_url);
      
      if (editData.avatar) {
        formData.append('avatar', editData.avatar);
      }

      await profileService.updateProfile(formData);
      await fetchProfile(); // Refresh profile data
      setEditMode(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditData(prev => ({ ...prev, avatar: file }));
    }
  };

  if (loading) {
    return (
      <div className="section-gradient-top-left min-h-screen pt-20 pb-10 flex items-center justify-center">
        <div className="text-center">
          <div className="rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto"></div>
          <p className="text-white mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="section-gradient-top-left min-h-screen pt-20 pb-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Profile Not Found</h1>
          <p className="text-gray-300 mb-6">The user profile you're looking for doesn't exist.</p>
          <Link to="/" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-gradient-top-left min-h-screen pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-black/20 rounded-3xl p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="relative">
              <img
                src={profile.profile?.avatar || placeholder}
                alt={`${profile.username} avatar`}
                className="w-32 h-32 rounded-full ring-4 ring-green-400/50 object-cover"
              />
              {profile.profile?.user_type === 'dev' && (
                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full">
                  <FaCode className="text-sm" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {profile.first_name && profile.last_name 
                    ? `${profile.first_name} ${profile.last_name}` 
                    : profile.username}
                </h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  profile.profile?.user_type === 'dev' 
                    ? 'bg-blue-500/20 text-blue-300' 
                    : 'bg-green-500/20 text-green-300'
                }`}>
                  {profile.profile?.user_type === 'dev' ? 'Developer' : 'User'}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                {profile.profile?.bio || 'No bio available'}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <FaUser />
                  <span>@{profile.username}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCalendar />
                  <span>Joined {new Date(profile.date_joined).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 mb-4">
                {profile.profile?.github_url && (
                  <a
                    href={profile.profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white"
                  >
                    <FaGithub size={20} /> GitHub
                  </a>
                )}
                {profile.profile?.twitter_url && (
                  <a
                    href={profile.profile.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white"
                  >
                    <FaTwitter size={20} /> Twitter
                  </a>
                )}
               
               {/* Social Media Buttons with Coming Soon */}
               <button
                 onClick={() => toast.info('LinkedIn integration coming soon!')}
                 className="flex items-center gap-2 text-gray-300 hover:text-white"
               >
                 <FaLinkedin size={20} /> LinkedIn
               </button>
               
               <button
                 onClick={() => toast.info('Discord integration coming soon!')}
                 className="flex items-center gap-2 text-gray-300 hover:text-white"
               >
                 <FaDiscord size={20} /> Discord
               </button>
              </div>

              {/* Edit Profile Button */}
              {isOwnProfile && (
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  {editMode ? <FaTimes /> : <FaEdit />}
                  {editMode ? 'Cancel' : 'Edit Profile'}
                </button>
              )}
            </div>
          </div>

          {/* Edit Form */}
          {editMode && (
            <form onSubmit={handleEditSubmit} className="bg-gray-800/30 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Edit Profile</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={editData.bio}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">User Type</label>
                  <select
                    name="user_type"
                    value={editData.user_type}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="user">User</option>
                    <option value="dev">Developer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">GitHub URL</label>
                  <input
                    type="url"
                    name="github_url"
                    value={editData.github_url}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="https://github.com/username"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Twitter URL</label>
                  <input
                    type="url"
                    name="twitter_url"
                    value={editData.twitter_url}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="https://twitter.com/username"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Avatar</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <FaSave /> Save Changes
              </button>
            </form>
          )}

          {/* Tabs */}
          <div className="border-b border-gray-600 mb-8">
            <div className="flex flex-wrap gap-6">
              {(profile.profile?.user_type !== 'dev') && (
                <button
                  onClick={() => setActiveTab("wishes")}
                  className={`pb-3 px-1 border-b-2 ${
                    activeTab === "wishes"
                      ? "border-green-400 text-green-400 font-semibold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <FaLightbulb className="inline mr-2" />
                  Wishes
                </button>
              )}

              {(profile.profile?.user_type === 'dev') && (
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`pb-3 px-1 border-b-2 ${
                    activeTab === "projects"
                      ? "border-blue-400 text-blue-400 font-semibold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <FaRocket className="inline mr-2" />
                  Projects
                </button>
              )}

              <button
                onClick={() => setActiveTab("boosts")}
                className={`pb-3 px-1 border-b-2 ${
                  activeTab === "boosts"
                    ? "border-yellow-400 text-yellow-400 font-semibold"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <FaFire className="inline mr-2" />
                Boosts
              </button>

              <button
                onClick={() => setActiveTab("comments")}
                className={`pb-3 px-1 border-b-2 ${
                  activeTab === "comments"
                    ? "border-purple-400 text-purple-400 font-semibold"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <FaComments className="inline mr-2" />
                Comments
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {tabLoading ? (
              <div className="text-center py-12">
                <div className="rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto"></div>
                <p className="text-gray-300 mt-4">Loading...</p>
              </div>
            ) : (
              <>
                {/* Wishes Tab */}
                {activeTab === "wishes" && (
                  <div className="grid gap-6">
                    {wishes.length > 0 ? (
                      wishes.map((wish) => (
                        <div key={wish.id} className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-semibold text-white">{wish.title}</h3>
                            <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                              {wish.tool_app_name}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-4">{wish.description}</p>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <FaArrowUp /> {wish.upvotes_count}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaDollarSign /> ${wish.total_funding}
                              </span>
                            </div>
                            <span>{new Date(wish.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-8">No wishes submitted yet.</p>
                    )}
                  </div>
                )}

                {/* Projects Tab */}
                {activeTab === "projects" && (
                  <div className="grid gap-6">
                    {projects.length > 0 ? (
                      projects.map((project) => (
                        <div key={project.id} className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                            <div className="flex items-center gap-2">
                              <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                                {project.tool_app_name}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                project.status === 'ready' ? 'bg-green-500/20 text-green-300' :
                                project.status === 'shipped' ? 'bg-blue-500/20 text-blue-300' :
                                'bg-yellow-500/20 text-yellow-300'
                              }`}>
                                {project.status === 'ready' ? 'Ready' : 
                                 project.status === 'shipped' ? 'Shipped' : 'In Development'}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies_list.map((tech) => (
                              <span key={tech} className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <FaArrowUp /> {project.upvotes_count}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaDollarSign /> ${project.total_funding}
                              </span>
                              <span>{project.hours_worked} hours</span>
                            </div>
                            <span>{new Date(project.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-8">No projects submitted yet.</p>
                    )}
                  </div>
                )}

                {/* Boosts Tab */}
                {activeTab === "boosts" && (
                  <div className="grid gap-4">
                    {boosts.length > 0 ? (
                      boosts.map((boost) => (
                        <div key={boost.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-yellow-400 font-bold">${boost.amount}</span>
                                <span className="text-gray-400">→</span>
                                <span className="text-white">{boost.target_title}</span>
                              </div>
                              {boost.message && (
                                <p className="text-gray-300 text-sm">"{boost.message}"</p>
                              )}
                            </div>
                            <span className="text-gray-400 text-sm">
                              {new Date(boost.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-8">No boosts made yet.</p>
                    )}
                  </div>
                )}

                {/* Comments Tab */}
                {activeTab === "comments" && (
                  <div className="grid gap-4">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                          <p className="text-gray-300 mb-2">{comment.content}</p>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <span>Comment on content</span>
                            <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-8">No comments yet.</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
