import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Plus, Image, Video, Calendar, MapPin, Users, Clock, CheckCircle, Crown, Award, Send, BookOpen, X } from 'lucide-react';
import Card from '../components/Common/Card';
import Avatar from '../components/Common/Avatar';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { mockNews } from '../data/mockData';

interface Post {
  id: string;
  author: {
    id: string;
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
  type: 'text' | 'image' | 'video' | 'event' | 'announcement' | 'news';
  media?: string;
  event?: {
    title: string;
    date: string;
    location: string;
    attendees: number;
  };
}

interface Comment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    role: 'student' | 'lecturer' | 'admin';
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

const Feed: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [commentingOnPost, setCommentingOnPost] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  // Load posts from localStorage on mount
  useEffect(() => {
    const loadPosts = () => {
      try {
        setLoading(true);
        
        // Load posts from localStorage
        const savedPosts = localStorage.getItem('pineappl_posts');
        const savedComments = localStorage.getItem('pineappl_comments');
        
        if (savedPosts) {
          setPosts(JSON.parse(savedPosts));
        } else {
          // Initialize with demo data including news
          const initialPosts = getDemoPosts();
          setPosts(initialPosts);
          localStorage.setItem('pineappl_posts', JSON.stringify(initialPosts));
        }
        
        if (savedComments) {
          setComments(JSON.parse(savedComments));
        }
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts(getDemoPosts());
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('pineappl_posts', JSON.stringify(posts));
    }
  }, [posts]);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem('pineappl_comments', JSON.stringify(comments));
    }
  }, [comments]);

  // Format timestamp to relative time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    
    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  // Get demo posts including news
  const getDemoPosts = (): Post[] => {
    const demoPosts: Post[] = [
      {
        id: '1',
        author: {
          id: 'lecturer-1',
          name: 'Dr. Sarah Wilson',
          role: 'lecturer',
          department: 'Computer Science',
          isVerified: true
        },
        content: 'Excited to announce that our Machine Learning research paper has been accepted for publication in the International Journal of AI! This is a collaborative effort with our brilliant students. #Research #MachineLearning #ProudMoment',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
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
          id: 'admin-1',
          name: 'Student Union',
          role: 'admin',
          department: 'Administration',
          isVerified: true
        },
        content: 'Join us for the Annual Tech Innovation Fair! Showcase your projects, network with industry professionals, and compete for amazing prizes.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
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
          id: 'student-1',
          name: 'Adebayo Johnson',
          role: 'student',
          department: 'Computer Science',
          isDepartmentGovernor: true
        },
        content: 'Just completed my final year project on blockchain-based voting systems! Special thanks to Dr. Wilson for her guidance throughout this journey. The future of secure digital democracy looks promising! 🚀',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
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
          id: 'lecturer-2',
          name: 'Prof. Michael Brown',
          role: 'lecturer',
          department: 'Architecture',
          isVerified: true
        },
        content: 'Our students\' sustainable architecture designs are truly inspiring! Here are some highlights from this semester\'s final presentations. The creativity and environmental consciousness shown is remarkable.',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        likes: 67,
        comments: 18,
        shares: 22,
        isLiked: false,
        isBookmarked: true,
        type: 'image',
        media: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'
      }
    ];

    // Add news as posts
    const newsPosts: Post[] = mockNews.slice(0, 5).map(newsItem => ({
      id: `news-${newsItem.id}`,
      author: {
        id: 'news-admin',
        name: newsItem.author,
        role: 'admin' as const,
        department: 'Administration',
        isVerified: true
      },
      content: newsItem.content,
      timestamp: new Date(newsItem.date).toISOString(),
      likes: Math.floor(Math.random() * 50) + 10,
      comments: Math.floor(Math.random() * 20) + 5,
      shares: Math.floor(Math.random() * 15) + 3,
      isLiked: false,
      isBookmarked: newsItem.featured,
      type: 'news',
      event: newsItem.category === 'event' ? {
        title: newsItem.title,
        date: newsItem.date,
        location: 'University Campus',
        attendees: Math.floor(Math.random() * 200) + 50
      } : undefined
    }));

    return [...demoPosts, ...newsPosts];
  };

  const getVerificationBadge = (author: Post['author']) => {
    if (author.role === 'admin' && author.isVerified) {
      return <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
        <CheckCircle className="h-3 w-3 text-white" />
      </div>;
    }
    if (author.role === 'lecturer' && author.isVerified) {
      return <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
        <CheckCircle className="h-3 w-3 text-white" />
      </div>;
    }
    if (author.role === 'student' && author.isDepartmentGovernor) {
      return <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
        <CheckCircle className="h-3 w-3 text-white" />
      </div>;
    }
    return null;
  };

  const handleLike = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post || !user) return;
    
    const isLiked = post.isLiked;
    
    // Optimistically update UI
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

  const handleBookmark = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post || !user) return;
    
    // Optimistically update UI
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setMediaFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (event) => {
      setMediaPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = async () => {
    if (!newPost.trim() || !user) return;
    
    try {
      let mediaUrl = null;
      let postType: 'text' | 'image' | 'video' = 'text';
      
      // Handle media upload
      if (mediaFile && mediaPreview) {
        mediaUrl = mediaPreview; // In a real app, you'd upload to storage
        postType = mediaFile.type.startsWith('image/') ? 'image' : 'video';
      }
      
      // Create post object
      const newPostObj: Post = {
        id: Date.now().toString(),
        author: {
          id: user.id,
          name: user.name,
          role: user.role,
          department: user.department || 'General',
          isVerified: user.role === 'lecturer' || user.role === 'admin',
          avatar: user.avatarUrl
        },
        content: newPost,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isBookmarked: false,
        type: postType,
        media: mediaUrl || undefined
      };
      
      setPosts([newPostObj, ...posts]);
      setNewPost('');
      setMediaFile(null);
      setMediaPreview(null);
      setShowCreatePost(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const handleAddComment = async (postId: string) => {
    if (!newComment.trim() || !user) return;
    
    try {
      // Add to local state
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        postId,
        author: {
          id: user.id,
          name: user.name,
          role: user.role,
          avatar: user.avatarUrl
        },
        content: newComment,
        timestamp: new Date().toISOString()
      };
      
      setComments([...comments, newCommentObj]);
      
      // Update post comment count
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: post.comments + 1 }
          : post
      ));
      
      setNewComment('');
      setCommentingOnPost(null);
    } catch (error) {
      console.error('Error adding comment:', error);
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
      case 'news': return <BookOpen className="h-4 w-4 text-orange-500" />;
      default: return null;
    }
  };

  const getPostComments = (postId: string) => {
    return comments.filter(comment => comment.postId === postId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen max-w-2xl mx-auto">
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
          className="flex items-center space-x-2 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Post</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white dark:bg-gray-800 p-1 rounded-lg mb-4 border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => setActiveTab('following')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'following'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Following
        </button>
        <button
          onClick={() => setActiveTab('bookmarked')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'bookmarked'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Saved
        </button>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create Post</h3>
              <button
                onClick={() => {
                  setShowCreatePost(false);
                  setMediaFile(null);
                  setMediaPreview(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="flex items-start space-x-3 mb-3">
              <Avatar 
                name={user?.name || 'Demo User'} 
                type={user?.role === 'student' ? 'student' : user?.role === 'lecturer' ? 'lecturer' : 'admin'} 
                size="md" 
                imageUrl={user?.avatarUrl}
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white resize-none"
            />

            {/* Media Preview */}
            {mediaPreview && (
              <div className="mt-3 relative">
                {mediaFile?.type.startsWith('image/') ? (
                  <img 
                    src={mediaPreview} 
                    alt="Preview" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ) : (
                  <video 
                    src={mediaPreview} 
                    className="w-full h-32 object-cover rounded-lg"
                    controls
                  />
                )}
                <button
                  onClick={() => {
                    setMediaFile(null);
                    setMediaPreview(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mt-3">
              <div className="flex space-x-2">
                <label className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full cursor-pointer">
                  <Image className="h-5 w-5 text-gray-500" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                </label>
                <label className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full cursor-pointer">
                  <Video className="h-5 w-5 text-gray-500" />
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                </label>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <Calendar className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <button
                onClick={handleCreatePost}
                disabled={!newPost.trim()}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="Full size view" 
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={() => setSelectedVideo(null)}>
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>
            <video 
              src={selectedVideo} 
              className="max-w-full max-h-full object-contain rounded-lg"
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="space-y-3">
        {filteredPosts.map((post) => (
          <div key={post.id} className="feed-post">
            {/* Post Header */}
            <div className="feed-post-header">
              <Avatar 
                name={post.author.name} 
                type={post.author.role} 
                size="md" 
                imageUrl={post.author.avatar}
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {post.author.name}
                  </h4>
                  {getVerificationBadge(post.author)}
                  {getPostTypeIcon(post.type)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {post.author.department} • {formatTimestamp(post.timestamp)}
                </p>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <MoreHorizontal className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* Post Content */}
            <div className="space-y-3">
              <p className="feed-post-content">
                {post.content}
              </p>

              {/* Event Card */}
              {post.type === 'event' && post.event && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
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
                <div className="rounded-lg overflow-hidden cursor-pointer" onClick={() => handleImageClick(post.media!)}>
                  <img 
                    src={post.media} 
                    alt="Post content" 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}

              {/* Video */}
              {post.type === 'video' && post.media && (
                <div className="rounded-lg overflow-hidden cursor-pointer" onClick={() => handleVideoClick(post.media!)}>
                  <video 
                    src={post.media} 
                    className="w-full h-48 object-cover"
                    controls={false}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <Video className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              )}

              {/* News Banner */}
              {post.type === 'news' && (
                <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-3 rounded">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                      University News
                    </span>
                  </div>
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
            <div className="feed-post-actions">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`feed-post-action ${
                    post.isLiked 
                      ? 'text-red-600 dark:text-red-400' 
                      : ''
                  }`}
                >
                  <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                
                <button 
                  className="feed-post-action"
                  onClick={() => setCommentingOnPost(commentingOnPost === post.id ? null : post.id)}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                
                <button className="feed-post-action">
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

            {/* Comments Section */}
            {commentingOnPost === post.id && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="mb-3">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Comments</h5>
                  
                  {/* Comment List */}
                  <div className="space-y-3 mb-3">
                    {getPostComments(post.id).map(comment => (
                      <div key={comment.id} className="flex space-x-2">
                        <Avatar 
                          name={comment.author.name} 
                          type={comment.author.role} 
                          size="sm" 
                          imageUrl={comment.author.avatar}
                        />
                        <div className="flex-1 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-gray-900 dark:text-white text-sm">
                              {comment.author.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatTimestamp(comment.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Comment */}
                  <div className="flex space-x-2">
                    <Avatar 
                      name={user?.name || 'Demo User'} 
                      type={user?.role === 'student' ? 'student' : user?.role === 'lecturer' ? 'lecturer' : 'admin'} 
                      size="sm" 
                      imageUrl={user?.avatarUrl}
                    />
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white text-sm"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!newComment.trim()}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {activeTab === 'bookmarked' 
              ? "You haven't saved any posts yet."
              : "Be the first to share something with the community!"
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Feed;