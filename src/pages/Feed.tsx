import React, { useEffect, useState } from 'react';
import { Image, Video, Calendar, X, Send, Plus, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Post {
  id: number;
  content: string;
  media_url?: string;
  type: 'text' | 'image' | 'video';
  created_at: string;
  author: {
    id: string;
    full_name: string;
    role: string;
    department?: string;
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

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('user_posts')
      .select(`*, author:profiles(id, full_name, role, department_id, avatar_url)`)
      .order('created_at', { ascending: false });

    if (!error && data) setPosts(data);
    setLoading(false);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaFile(file);
    const reader = new FileReader();
    reader.onload = (event) => setMediaPreview(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleCreatePost = async () => {
    if (!newPost.trim()) return alert('Post content is required.');
    if (!user) return alert('You must be logged in to post.');

    let media_url = null;
    let type: 'text' | 'image' | 'video' = 'text';

    if (mediaFile) {
      const fileExt = mediaFile.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('media').upload(filePath, mediaFile);
      if (uploadError) {
        alert('Failed to upload media.');
        console.error('Upload failed:', uploadError.message);
        return;
      }
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);
      media_url = urlData.publicUrl;
      type = mediaFile.type.startsWith('image') ? 'image' : 'video';
    }

    const { error: insertError } = await supabase.from('user_posts').insert({
      content: newPost,
      media_url,
      type,
      author_id: user.id,
    });

    if (insertError) {
      alert('Failed to create post.');
      console.error('Post insert error:', insertError.message);
      return;
    }

    setNewPost('');
    setMediaFile(null);
    setMediaPreview(null);
    setShowCreatePost(false);
    fetchPosts();
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    if (activeTab === 'following') return user?.following?.includes(post.author.id);
    if (activeTab === 'saved') return user?.savedPosts?.includes(post.id);
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
          className="flex items-center space-x-2 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700"
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
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab === 'all' ? 'All Posts' : tab === 'following' ? 'Following' : 'Saved'}
          </button>
        ))}
      </div>

      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => {
                setShowCreatePost(false);
                setMediaPreview(null);
                setMediaFile(null);
              }}
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Create Post</h3>
            <textarea
              rows={3}
              placeholder="What's on your mind?"
              className="w-full p-2 border rounded mb-3 dark:bg-gray-700 dark:text-white"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            {mediaPreview && (
              <img src={mediaPreview} alt="preview" className="w-full max-h-48 object-cover rounded mb-3" />
            )}
            <div className="flex justify-between items-center mb-3">
              <div className="flex gap-3">
                <label className="cursor-pointer">
                  <Image className="h-5 w-5 text-gray-500" />
                  <input type="file" accept="image/*" onChange={handleMediaUpload} className="hidden" />
                </label>
                <label className="cursor-pointer">
                  <Video className="h-5 w-5 text-gray-500" />
                  <input type="file" accept="video/*" onChange={handleMediaUpload} className="hidden" />
                </label>
                <button>
                  <Calendar className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <button
                className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                disabled={!newPost.trim()}
                onClick={handleCreatePost}
              >
                <Send className="w-4 h-4 inline mr-1" /> Post
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded border dark:border-gray-700">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No posts found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {activeTab === 'saved' ? "You haven't saved any posts yet." : 'Be the first to share something with the community!'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex items-center mb-2 space-x-3">
                {post.author?.avatar_url && (
                  <img src={post.author.avatar_url} className="h-8 w-8 rounded-full" />
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {post.author?.full_name} • {post.author?.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-900 dark:text-white mb-2">{post.content}</p>
              {post.media_url && post.type === 'image' && (
                <img
                  src={post.media_url}
                  alt="post"
                  className="w-full max-h-60 object-cover rounded cursor-pointer"
                  onClick={() => window.open(post.media_url, '_blank')}
                />
              )}
              {post.media_url && post.type === 'video' && (
                <video controls className="w-full rounded">
                  <source src={post.media_url} />
                </video>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CentralizedFeed;
