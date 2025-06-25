// CentralizedFeed.tsx
import React, { useState, useEffect } from 'react';
import {
  Plus, Send, Image as ImageIcon, Video as VideoIcon, Calendar,
  X, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal,
  Clock, MapPin, Users, CheckCircle, BookOpen
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import Avatar from '../components/Common/Avatar';
import { useAuth } from '../contexts/AuthContext';

interface Post {
  id: string;
  content: string;
  media_url?: string;
  media_type?: 'image' | 'video';
  created_at: string;
  user_id: string;
  user_name: string;
  user_role: 'student' | 'lecturer' | 'admin';
  user_department: string;
  user_avatar?: string;
}

const CentralizedFeed: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onload = () => setMediaPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async () => {
    if (!content.trim() || !user) return;
    setLoading(true);
    let media_url = null;
    let media_type: 'image' | 'video' | undefined;

    if (mediaFile) {
      const fileExt = mediaFile.name.split('.').pop();
      const filePath = `posts/${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage.from('media').upload(filePath, mediaFile);
      if (!error) {
        const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(filePath);
        media_url = publicUrlData?.publicUrl;
        media_type = mediaFile.type.startsWith('image') ? 'image' : 'video';
      }
    }

    const { data: newPost, error } = await supabase.from('posts').insert({
      content,
      user_id: user.id,
      user_name: user.name,
      user_role: user.role,
      user_department: user.department,
      user_avatar: user.avatarUrl,
      media_url,
      media_type
    }).select().single();

    if (!error && newPost) {
      setPosts(prev => [newPost, ...prev]);
      setContent('');
      setMediaFile(null);
      setMediaPreview(null);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">University Feed</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Stay connected with your university community</p>
        </div>
        <button className="flex items-center px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700" onClick={handleCreatePost} disabled={loading}>
          <Plus className="w-4 h-4" /> <span className="ml-1">Post</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <textarea
          className="w-full resize-none border border-gray-300 dark:border-gray-600 rounded-lg p-2 mb-3 dark:bg-gray-700 dark:text-white"
          placeholder="What's on your mind?"
          rows={3}
          value={content}
          onChange={e => setContent(e.target.value)}
        ></textarea>

        {mediaPreview && (
          <div className="mb-3 relative">
            {mediaFile?.type.startsWith('image') ? (
              <img src={mediaPreview} alt="preview" className="w-full h-auto rounded-lg" />
            ) : (
              <video src={mediaPreview} controls className="w-full rounded-lg" />
            )}
            <button className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full" onClick={() => { setMediaPreview(null); setMediaFile(null); }}>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <label className="cursor-pointer">
              <ImageIcon className="h-5 w-5 text-gray-600" />
              <input type="file" accept="image/*" className="hidden" onChange={handleMediaUpload} />
            </label>
            <label className="cursor-pointer">
              <VideoIcon className="h-5 w-5 text-gray-600" />
              <input type="file" accept="video/*" className="hidden" onChange={handleMediaUpload} />
            </label>
            <Calendar className="h-5 w-5 text-gray-600" />
          </div>
          <button
            onClick={handleCreatePost}
            disabled={!content.trim() || loading}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            <Send className="h-4 w-4 inline-block mr-1" /> Post
          </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No posts found</h3>
          <p className="text-gray-600 dark:text-gray-400">Be the first to share something with the community!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex items-center space-x-3 mb-2">
                <Avatar name={post.user_name} type={post.user_role} imageUrl={post.user_avatar} size="md" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{post.user_name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{post.user_department} • {new Date(post.created_at).toLocaleString()}</p>
                </div>
              </div>
              <p className="text-gray-800 dark:text-gray-200 mb-2">{post.content}</p>
              {post.media_url && post.media_type === 'image' && (
                <img src={post.media_url} alt="media" className="rounded-lg w-full cursor-pointer" onClick={() => setSelectedImage(post.media_url!)} />
              )}
              {post.media_url && post.media_type === 'video' && (
                <video src={post.media_url} className="rounded-lg w-full" controls />
              )}
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-full p-4">
            <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 bg-white p-2 rounded-full">
              <X className="h-5 w-5 text-black" />
            </button>
            <img src={selectedImage} alt="Expanded" className="max-w-full max-h-full object-contain rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CentralizedFeed;
