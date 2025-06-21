import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Plus, Image, Video, Calendar, MapPin, Users, Clock, CheckCircle, Crown, Award } from 'lucide-react';
import Card from '../components/Common/Card';
import Avatar from '../components/Common/Avatar';
import { useAuth } from '../contexts/AuthContext';

interface Post {
  id: string;
  author: {
    name: string;
    role: 'student' | 'lecturer' | 'admin';
    department: string;
    avatar?: string;
    isVerified?: boolean;
    isDepartmentGovernor?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  type: 'text' | 'image' | 'video' | 'event' | 'announcement';
  media?: string;
  event?: {
    title: string;
    date: string;
    location: string;
    attendees: number;
  };
}

const Feed: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState('');

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Dr. Sarah Wilson',
        role: 'lecturer',
        department: 'Computer Science',
        isVerified: true
      },
      content: 'Excited to announce that our Machine Learning research paper has been accepted for publication in the International Journal of AI! This is a collaborative effort with our brilliant students. #Research #MachineLearning #ProudMoment',
      timestamp: '2 hours ago',
      likes: 45,
      comments: 12,
      shares: 8,
      isLiked: false,
      isBookmarked: true,
      type: 'text'
    },
    {
      id: '2',
      author: {
        name: 'Student Union',
        role: 'admin',
        department: 'Administration',
        isVerified: true
      },
      content: 'Join us for the Annual Tech Innovation Fair! Showcase your projects, network with industry professionals, and compete for amazing prizes.',
      timestamp: '4 hours ago',
      likes: 128,
      comments: 34,
      shares: 67,
      isLiked: true,
      isBookmarked: false,
      type: 'event',
      event: {
        title: 'Annual Tech Innovation Fair',
        date: 'December 15, 2024',
        location: 'Main Auditorium',
        attendees: 245
      }
    },
    {
      id: '3',
      author: {
        name: 'Adebayo Johnson',
        role: 'student',
        department: 'Computer Science',
        isDepartmentGovernor: true
      },
      content: 'Just completed my final year project on blockchain-based voting systems! Special thanks to Dr. Wilson for her guidance throughout this journey. The future of secure digital democracy looks promising! 🚀',
      timestamp: '6 hours ago',
      likes: 89,
      comments: 23,
      shares: 15,
      isLiked: true,
      isBookmarked: false,
      type: 'text'
    },
    {
      id: '4',
      author: {
        name: 'Prof. Michael Brown',
        role: 'lecturer',
        department: 'Architecture',
        isVerified: true
      },
      content: 'Our students\' sustainable architecture designs are truly inspiring! Here are some highlights from this semester\'s final presentations. The creativity and environmental consciousness shown is remarkable.',
      timestamp: '8 hours ago',
      likes: 67,
      comments: 18,
      shares: 22,
      isLiked: false,
      isBookmarked: true,
      type: 'image',
      media: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'
    },
    {
      id: '5',
      author: {
        name: 'University Administration',
        role: 'admin',
        department: 'Administration',
        isVerified: true
      },
      content: 'Important: Registration for Second Semester 2024/2025 begins Monday, January 8th. Please ensure all outstanding fees are cleared before the deadline. Visit the student portal for more information.',
      timestamp: '1 day ago',
      likes: 156,
      comments: 45,
      shares: 89,
      isLiked: false,
      isBookmarked: true,
      type: 'announcement'
    }
  ]);

  const getVerificationBadge = (author: Post['author']) => {
    if (author.role === 'admin' && author.isVerified) {
      return <Crown className="h-4 w-4 text-yellow-500" title="Admin" />;
    }
    if (author.role === 'lecturer' && author.isVerified) {
      return <CheckCircle className="h-4 w-4 text-blue-500" title="Verified Lecturer" />;
    }
    if (author.role === 'student' && author.isDepartmentGovernor) {
      return <Award className="h-4 w-4 text-gray-500" title="Department Governor" />;
    }
    return null;
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: {
          name: user?.name || 'Demo User',
          role: user?.role || 'student',
          department: user?.department || 'Computer Science',
          isVerified: user?.role === 'lecturer' || user?.role === 'admin',
          isDepartmentGovernor: user?.role === 'student' && Math.random() > 0.8
        },
        content: newPost,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isBookmarked: false,
        type: 'text'
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowCreatePost(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    if (activeTab === 'following') return post.author.role === 'lecturer' || post.author.role === 'admin';
    if (activeTab === 'bookmarked') return post.isBookmarked;
    return true;
  });

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'event': return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'announcement': return <Users className="h-4 w-4 text-red-500" />;
      case 'image': return <Image className="h-4 w-4 text-green-500" />;
      case 'video': return <Video className="h-4 w-4 text-purple-500" />;
      default: return null;
    }
  };

  return (
    <div className="compact-spacing max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            University Feed
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Stay connected with your university community
          </p>
        </div>
        <button
          onClick={() => setShowCreatePost(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Post</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-dark-card p-1 rounded-lg mb-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-white dark:bg-dark-surface text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => setActiveTab('following')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            activeTab === 'following'
              ? 'bg-white dark:bg-dark-surface text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Following
        </button>
        <button
          onClick={() => setActiveTab('bookmarked')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            activeTab === 'bookmarked'
              ? 'bg-white dark:bg-dark-surface text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Bookmarked
        </button>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="modal-overlay">
          <div className="modal-content bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create Post</h3>
              <button
                onClick={() => setShowCreatePost(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <Plus className="h-5 w-5 text-gray-500 transform rotate-45" />
              </button>
            </div>
            
            <div className="flex items-start space-x-3 mb-4">
              <Avatar 
                name={user?.name || 'Demo User'} 
                type={user?.role === 'student' ? 'student' : user?.role === 'lecturer' ? 'lecturer' : 'admin'} 
                size="md" 
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{user?.role}</p>
              </div>
            </div>

            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white resize-none"
            />

            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <Image className="h-5 w-5 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <Video className="h-5 w-5 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <Calendar className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <button
                onClick={handleCreatePost}
                disabled={!newPost.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <div className="space-y-4">
              {/* Post Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Avatar 
                    name={post.author.name} 
                    type={post.author.role} 
                    size="md" 
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {post.author.name}
                      </h4>
                      {getVerificationBadge(post.author)}
                      {getPostTypeIcon(post.type)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {post.author.department} • {post.timestamp}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              {/* Post Content */}
              <div className="space-y-3">
                <p className="text-gray-900 dark:text-white leading-relaxed">
                  {post.content}
                </p>

                {/* Event Card */}
                {post.type === 'event' && post.event && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div className="flex-1">
                        <h5 className="font-semibold text-blue-900 dark:text-blue-100">
                          {post.event.title}
                        </h5>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-blue-700 dark:text-blue-300">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.event.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{post.event.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{post.event.attendees} attending</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Image */}
                {post.type === 'image' && post.media && (
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={post.media} 
                      alt="Post content" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}

                {/* Announcement Banner */}
                {post.type === 'announcement' && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-3 rounded">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-red-600 dark:text-red-400" />
                      <span className="text-sm font-medium text-red-800 dark:text-red-200">
                        Official Announcement
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      post.isLiked 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">{post.shares}</span>
                  </button>
                </div>
                
                <button
                  onClick={() => handleBookmark(post.id)}
                  className={`transition-colors ${
                    post.isBookmarked 
                      ? 'text-yellow-600 dark:text-yellow-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {activeTab === 'bookmarked' 
                ? "You haven't bookmarked any posts yet."
                : "Be the first to share something with the community!"
              }
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Feed;