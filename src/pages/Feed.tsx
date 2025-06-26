import React, { useEffect, useState } from 'react';
import { Image, Video, Calendar, X, Send, Plus, Users, Heart, MessageCircle, Bookmark, Share2, MoreHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Avatar from '../components/Common/Avatar';

interface Post {
  id: string;
  content: string;
  media_url?: string;
  type: 'text' | 'image' | 'video' | 'event' | 'announcement';
  created_at: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  author: {
    id: string;
    full_name: string;
    role: string;
    department?: string;
    avatar_url?: string;
  };
  is_liked?: boolean;
  is_bookmarked?: boolean;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: {
    id: string;
    full_name: string;
    role: string;
    avatar_url?: string;
  };
}

const CentralizedFeed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'following' | 'saved'>('all');
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchPosts();
  }, []);

  // Generate or retrieve demo user UUID
  const getDemoUserUUID = () => {
    let demoUUID = localStorage.getItem('demo_user_uuid');
    if (!demoUUID) {
      // Generate a proper UUID format for demo users
      demoUUID = 'demo-' + crypto.randomUUID();
      localStorage.setItem('demo_user_uuid', demoUUID);
    }
    return demoUUID;
  };

  // Get current user info (authenticated or demo)
  const getCurrentUser = () => {
    if (user) {
      return {
        id: user.id,
        full_name: user.name,
        role: user.role,
        department: user.department,
        avatar_url: user.avatarUrl
      };
    } else {
      // Demo user
      const demoUUID = getDemoUserUUID();
      const demoUserData = localStorage.getItem('demo_user_data');
      
      if (demoUserData) {
        return JSON.parse(demoUserData);
      } else {
        const newDemoUser = {
          id: demoUUID,
          full_name: 'Demo User',
          role: 'student',
          department: 'Computer Science',
          avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
        };
        localStorage.setItem('demo_user_data', JSON.stringify(newDemoUser));
        return newDemoUser;
      }
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let allPosts: Post[] = [];

      // Fetch from Supabase (including demo posts stored there)
      try {
        const { data: supabasePosts, error } = await supabase
          .from('feed_posts')
          .select(`
            *,
            profiles!feed_posts_author_id_fkey (
              id,
              full_name,
              role,
              avatar_url,
              departments (name)
            )
          `)
          .order('created_at', { ascending: false });

        if (!error && supabasePosts) {
          allPosts = supabasePosts.map(post => ({
            id: post.id,
            content: post.content,
            media_url: post.media_url,
            type: post.type || 'text',
            created_at: post.created_at,
            likes_count: 0, // Will be calculated from likes table
            comments_count: 0, // Will be calculated from comments table
            shares_count: 0,
            author: {
              id: post.profiles?.id || post.author_id,
              full_name: post.profiles?.full_name || 'Unknown User',
              role: post.profiles?.role || 'student',
              department: post.profiles?.departments?.name,
              avatar_url: post.profiles?.avatar_url
            }
          }));
        }
      } catch (error) {
        console.log('Supabase not available, using local storage');
      }

      // Get posts from localStorage (for demo users and offline persistence)
      const localPosts = localStorage.getItem('feed_posts');
      if (localPosts) {
        const parsedLocalPosts: Post[] = JSON.parse(localPosts);
        // Merge with Supabase posts, avoiding duplicates
        const supabaseIds = new Set(allPosts.map(p => p.id));
        const uniqueLocalPosts = parsedLocalPosts.filter(p => !supabaseIds.has(p.id));
        allPosts = [...allPosts, ...uniqueLocalPosts];
      }

      // Add some initial demo posts if no posts exist
      if (allPosts.length === 0) {
        const demoPosts: Post[] = [
          {
            id: 'demo-initial-1',
            content: 'Welcome to the University Feed! This is where you can share updates, achievements, and connect with the university community. Feel free to create your first post!',
            type: 'announcement',
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            likes_count: 15,
            comments_count: 3,
            shares_count: 2,
            author: {
              id: 'system-admin',
              full_name: 'University Administration',
              role: 'admin',
              department: 'Administration',
              avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
            }
          },
          {
            id: 'demo-initial-2',
            content: 'Excited to announce that our Machine Learning research paper has been accepted for publication! This collaborative effort showcases the incredible talent of our students and faculty. #Research #MachineLearning',
            type: 'text',
            created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            likes_count: 45,
            comments_count: 12,
            shares_count: 8,
            author: {
              id: 'demo-lecturer-1',
              full_name: 'Dr. Sarah Wilson',
              role: 'lecturer',
              department: 'Computer Science',
              avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
            }
          },
          {
            id: 'demo-initial-3',
            content: 'Just completed my final year project on sustainable architecture! Special thanks to my supervisor and classmates for their support throughout this journey. The future of green building design looks promising! 🌱🏗️',
            type: 'text',
            created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            likes_count: 23,
            comments_count: 8,
            shares_count: 5,
            author: {
              id: 'demo-student-1',
              full_name: 'Adebayo Johnson',
              role: 'student',
              department: 'Architecture',
              avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
            }
          }
        ];

        allPosts = demoPosts;
        // Save initial posts to localStorage
        localStorage.setItem('feed_posts', JSON.stringify(demoPosts));
      }

      // Sort all posts by creation date
      allPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setPosts(allPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaFile(file);
    const reader = new FileReader();
    reader.onload = (event) => setMediaPreview(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const savePostToLocalStorage = (post: Post) => {
    const existingPosts = localStorage.getItem('feed_posts');
    const posts = existingPosts ? JSON.parse(existingPosts) : [];
    const updatedPosts = [post, ...posts];
    localStorage.setItem('feed_posts', JSON.stringify(updatedPosts));
  };

  const handleCreatePost = async () => {
    if (!newPost.trim()) return alert('Post content is required.');

    const currentUser = getCurrentUser();
    let media_url = null;
    let type: 'text' | 'image' | 'video' = 'text';

    // Handle media upload
    if (mediaFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        media_url = event.target?.result as string;
      };
      reader.readAsDataURL(mediaFile);
      type = mediaFile.type.startsWith('image') ? 'image' : 'video';
      
      // For demo purposes, we'll use the preview URL
      media_url = mediaPreview;
    }

    const newPostData: Post = {
      id: crypto.randomUUID(),
      content: newPost,
      media_url,
      type,
      created_at: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
      shares_count: 0,
      author: currentUser
    };

    // Always save to localStorage first for persistence
    savePostToLocalStorage(newPostData);

    // Try to save to Supabase if possible
    if (user?.id) {
      try {
        const { error } = await supabase.from('feed_posts').insert({
          id: newPostData.id,
          content: newPost,
          media_url,
          type,
          author_id: user.id,
          visibility: 'public'
        });

        if (error) {
          console.log('Supabase insert failed, using localStorage only:', error);
        }
      } catch (error) {
        console.log('Supabase not available, using localStorage only');
      }
    } else {
      // For demo users, we can still try to insert with the demo UUID
      try {
        const { error } = await supabase.from('feed_posts').insert({
          id: newPostData.id,
          content: newPost,
          media_url,
          type,
          author_id: currentUser.id,
          visibility: 'public'
        });

        if (error) {
          console.log('Demo user Supabase insert failed, using localStorage only:', error);
        }
      } catch (error) {
        console.log('Supabase not available for demo user, using localStorage only');
      }
    }

    // Update local state
    setPosts(prevPosts => [newPostData, ...prevPosts]);
    
    // Reset form
    setNewPost('');
    setMediaFile(null);
    setMediaPreview(null);
    setShowCreatePost(false);
  };

  const handleLike = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const currentUser = getCurrentUser();
    const isLiked = post.is_liked;
    const newLikesCount = isLiked ? post.likes_count - 1 : post.likes_count + 1;

    // Update local state immediately
    setPosts(prevPosts => 
      prevPosts.map(p => 
        p.id === postId 
          ? { ...p, is_liked: !isLiked, likes_count: newLikesCount }
          : p
      )
    );

    // Save likes to localStorage
    const likesKey = `post_likes_${currentUser.id}`;
    const existingLikes = JSON.parse(localStorage.getItem(likesKey) || '[]');
    
    if (isLiked) {
      const updatedLikes = existingLikes.filter((id: string) => id !== postId);
      localStorage.setItem(likesKey, JSON.stringify(updatedLikes));
    } else {
      localStorage.setItem(likesKey, JSON.stringify([...existingLikes, postId]));
    }

    // Try to update in Supabase
    try {
      if (isLiked) {
        await supabase
          .from('feed_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', currentUser.id);
      } else {
        await supabase
          .from('feed_likes')
          .insert({ 
            post_id: postId, 
            user_id: currentUser.id 
          });
      }
    } catch (error) {
      console.log('Supabase like update failed, using localStorage only');
    }
  };

  const handleComment = async (postId: string) => {
    const commentText = newComment[postId]?.trim();
    if (!commentText) return;

    const currentUser = getCurrentUser();
    const newCommentData: Comment = {
      id: crypto.randomUUID(),
      content: commentText,
      created_at: new Date().toISOString(),
      user: currentUser
    };

    // Save comment to localStorage
    const commentsKey = `post_comments_${postId}`;
    const existingComments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
    const updatedComments = [...existingComments, newCommentData];
    localStorage.setItem(commentsKey, JSON.stringify(updatedComments));

    // Update local state
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newCommentData]
    }));

    setPosts(prevPosts => 
      prevPosts.map(p => 
        p.id === postId 
          ? { ...p, comments_count: p.comments_count + 1 }
          : p
      )
    );

    setNewComment(prev => ({ ...prev, [postId]: '' }));

    // Try to save to Supabase
    try {
      await supabase.from('feed_comments').insert({
        id: newCommentData.id,
        post_id: postId,
        user_id: currentUser.id,
        content: commentText
      });
    } catch (error) {
      console.log('Supabase comment insert failed, using localStorage only');
    }
  };

  const toggleComments = async (postId: string) => {
    if (expandedComments.has(postId)) {
      setExpandedComments(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    } else {
      setExpandedComments(prev => new Set([...prev, postId]));
      
      // Load comments if not already loaded
      if (!comments[postId]) {
        // First try localStorage
        const commentsKey = `post_comments_${postId}`;
        const localComments = localStorage.getItem(commentsKey);
        
        if (localComments) {
          setComments(prev => ({
            ...prev,
            [postId]: JSON.parse(localComments)
          }));
        }

        // Then try Supabase
        try {
          const { data, error } = await supabase
            .from('feed_comments')
            .select(`
              *,
              profiles (
                id,
                full_name,
                role,
                avatar_url
              )
            `)
            .eq('post_id', postId)
            .order('created_at', { ascending: true });

          if (!error && data) {
            const formattedComments: Comment[] = data.map(comment => ({
              id: comment.id,
              content: comment.content,
              created_at: comment.created_at,
              user: {
                id: comment.profiles?.id || comment.user_id,
                full_name: comment.profiles?.full_name || 'Unknown User',
                role: comment.profiles?.role || 'student',
                avatar_url: comment.profiles?.avatar_url
              }
            }));

            setComments(prev => ({
              ...prev,
              [postId]: formattedComments
            }));

            // Save to localStorage for future use
            localStorage.setItem(commentsKey, JSON.stringify(formattedComments));
          }
        } catch (error) {
          console.log('Supabase comments fetch failed, using localStorage only');
        }
      }
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  // Load user's likes from localStorage
  useEffect(() => {
    const currentUser = getCurrentUser();
    const likesKey = `post_likes_${currentUser.id}`;
    const userLikes = JSON.parse(localStorage.getItem(likesKey) || '[]');
    
    setPosts(prevPosts => 
      prevPosts.map(post => ({
        ...post,
        is_liked: userLikes.includes(post.id)
      }))
    );
  }, [user]);

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    if (activeTab === 'following') return false; // Implement following logic
    if (activeTab === 'saved') return post.is_bookmarked;
    return true;
  });

  return (
    <div className="p-4 max-w-2xl mx-auto min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">University Feed</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Stay connected with your university community</p>
        </div>
        <button
          onClick={() => setShowCreatePost(true)}
          className="flex items-center space-x-2 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Post</span>
        </button>
      </div>

      <div className="flex space-x-3 mb-4">
        {['all', 'following', 'saved'].map(tab => (
          <button
            key={tab}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab === 'all' ? 'All Posts' : tab === 'following' ? 'Following' : 'Saved'}
          </button>
        ))}
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              onClick={() => {
                setShowCreatePost(false);
                setMediaPreview(null);
                setMediaFile(null);
                setNewPost('');
              }}
            >
              <X className="h-5 w-5" />
            </button>
            
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Create Post</h3>
            
            <div className="flex items-center space-x-3 mb-4">
              <Avatar 
                name={getCurrentUser().full_name} 
                type={getCurrentUser().role as any} 
                size="md" 
                imageUrl={getCurrentUser().avatar_url}
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{getCurrentUser().full_name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{getCurrentUser().role}</p>
              </div>
            </div>

            <textarea
              rows={4}
              placeholder="What's on your mind?"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 dark:bg-gray-700 dark:text-white resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            
            {mediaPreview && (
              <div className="mb-4">
                <img src={mediaPreview} alt="preview" className="w-full max-h-48 object-cover rounded-lg" />
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <label className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Image className="h-5 w-5 text-gray-500" />
                  <input type="file" accept="image/*" onChange={handleMediaUpload} className="hidden" />
                </label>
                <label className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Video className="h-5 w-5 text-gray-500" />
                  <input type="file" accept="video/*" onChange={handleMediaUpload} className="hidden" />
                </label>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Calendar className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <button
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={!newPost.trim()}
                onClick={handleCreatePost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading posts...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No posts found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {activeTab === 'saved' ? "You haven't saved any posts yet." : 'Be the first to share something with the community!'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 overflow-hidden">
              {/* Post Header */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar 
                      name={post.author.full_name} 
                      type={post.author.role as any} 
                      size="md" 
                      imageUrl={post.author.avatar_url}
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {post.author.full_name}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="capitalize">{post.author.role}</span>
                        {post.author.department && (
                          <>
                            <span>•</span>
                            <span>{post.author.department}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{formatTimeAgo(post.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                  </button>
                </div>

                {/* Post Content */}
                <p className="text-gray-900 dark:text-white mb-3 leading-relaxed">{post.content}</p>

                {/* Media */}
                {post.media_url && post.type === 'image' && (
                  <div className="mb-3">
                    <img
                      src={post.media_url}
                      alt="Post media"
                      className="w-full max-h-96 object-cover rounded-lg cursor-pointer"
                      onClick={() => window.open(post.media_url, '_blank')}
                    />
                  </div>
                )}

                {post.media_url && post.type === 'video' && (
                  <div className="mb-3">
                    <video controls className="w-full rounded-lg">
                      <source src={post.media_url} />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        post.is_liked 
                          ? 'text-red-600 hover:text-red-700' 
                          : 'text-gray-600 dark:text-gray-400 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${post.is_liked ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{post.likes_count}</span>
                    </button>

                    <button
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">{post.comments_count}</span>
                    </button>

                    <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span className="text-sm font-medium">{post.shares_count}</span>
                    </button>
                  </div>

                  <button className="text-gray-600 dark:text-gray-400 hover:text-yellow-600 transition-colors">
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>

                {/* Comments Section */}
                {expandedComments.has(post.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {/* Comment Input */}
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar 
                        name={getCurrentUser().full_name} 
                        type={getCurrentUser().role as any} 
                        size="sm" 
                        imageUrl={getCurrentUser().avatar_url}
                      />
                      <div className="flex-1 flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={newComment[post.id] || ''}
                          onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleComment(post.id);
                            }
                          }}
                        />
                        <button
                          onClick={() => handleComment(post.id)}
                          disabled={!newComment[post.id]?.trim()}
                          className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-3">
                      {(comments[post.id] || []).map(comment => (
                        <div key={comment.id} className="flex items-start space-x-3">
                          <Avatar 
                            name={comment.user.full_name} 
                            type={comment.user.role as any} 
                            size="sm" 
                            imageUrl={comment.user.avatar_url}
                          />
                          <div className="flex-1">
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
                              <p className="font-medium text-sm text-gray-900 dark:text-white">
                                {comment.user.full_name}
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {comment.content}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-3">
                              {formatTimeAgo(comment.created_at)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CentralizedFeed;