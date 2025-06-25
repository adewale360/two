// CentralizedFeed.tsx
import React, { useEffect, useState } from 'react';
import { Calendar, Heart, MessageCircle, Share2, Bookmark, Send, Plus, X, Image, Video, MapPin, Users, Clock, CheckCircle, BookOpen, MoreHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Avatar from '../components/Common/Avatar';

interface Post {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  type: 'text' | 'image' | 'video' | 'event' | 'announcement' | 'news';
  media?: string;
  likes: number;
  bookmarks: number;
  comments_count: number;
  author: {
    name: string;
    avatar_url?: string;
    role: string;
    department: string;
    is_verified: boolean;
    is_governor: boolean;
  };
}

const CentralizedFeed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`*, profiles(name, avatar_url, role, department, is_verified, is_governor)`)
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching posts', error);
      else
        setPosts(
          data.map(post => ({
            ...post,
            author: post.profiles,
            comments_count: 0,
          }))
        );
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!user || !newPost.trim()) return;

    const { error } = await supabase.from('posts').insert({
      user_id: user.id,
      content: newPost,
      type: 'text',
    });
    if (!error) setNewPost('');
  };

  const getPostTime = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} mins ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hrs ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  if (loading) return <div className="text-center py-20">Loading feed...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Create Post */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleCreatePost}
          className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          Post
        </button>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <div className="flex items-center space-x-3">
              <Avatar name={post.author.name} imageUrl={post.author.avatar_url} type={post.author.role} size="sm" />
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">{post.author.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{post.author.department} • {getPostTime(post.created_at)}</p>
              </div>
              <div className="ml-auto">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <p className="mt-3 text-gray-700 dark:text-gray-300">{post.content}</p>
            <div className="flex items-center space-x-4 mt-3 text-gray-500 dark:text-gray-400">
              <button className="flex items-center space-x-1">
                <Heart className="w-4 h-4" /> <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" /> <span>{post.comments_count}</span>
              </button>
              <button className="flex items-center space-x-1">
                <Share2 className="w-4 h-4" /> <span>Share</span>
              </button>
              <button className="ml-auto">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CentralizedFeed;
