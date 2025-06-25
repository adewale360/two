import React, { useEffect, useState } from 'react';
import {
  Plus, Image, Video, Calendar, X, Send,
  Heart, MessageCircle, Share2, Bookmark
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const CentralizedFeed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    const reader = new FileReader();
    reader.onloadend = () => setMediaPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!user || !content.trim()) return;

    let mediaUrl = null;
    if (media) {
      const { data, error } = await supabase.storage.from('media').upload(`${Date.now()}-${media.name}`, media);
      if (!error) {
        const { data: publicUrl } = supabase.storage.from('media').getPublicUrl(data.path);
        mediaUrl = publicUrl.publicUrl;
      }
    }

    const { error: insertError } = await supabase.from('posts').insert([
      {
        content,
        user_id: user.id,
        media_url: mediaUrl,
        media_type: media?.type || 'text',
      }
    ]);

    if (!insertError) {
      setContent('');
      setMedia(null);
      setMediaPreview(null);
      setShowModal(false);
      fetchPosts();
    }
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'following') return user?.following?.includes(post.user_id);
    if (activeTab === 'saved') return user?.savedPosts?.includes(post.id);
    return true;
  });

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">University Feed</h1>
        <p className="text-sm text-gray-500">Stay connected with your university community</p>
      </header>

      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button onClick={() => setActiveTab('all')} className={`px-3 py-1 rounded ${activeTab === 'all' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>All Posts</button>
          <button onClick={() => setActiveTab('following')} className={`px-3 py-1 rounded ${activeTab === 'following' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>Following</button>
          <button onClick={() => setActiveTab('saved')} className={`px-3 py-1 rounded ${activeTab === 'saved' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>Saved</button>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center bg-emerald-600 text-white px-3 py-1 rounded">
          <Plus className="w-4 h-4 mr-1" /> Post
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded w-full max-w-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Create Post</h2>
              <button onClick={() => setShowModal(false)}><X /></button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded p-2 mb-2"
              placeholder="What's on your mind?"
            />
            {mediaPreview && <img src={mediaPreview} className="w-full h-48 object-cover mb-2 rounded" />}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <label className="cursor-pointer">
                  <Image className="w-5 h-5" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleMediaUpload} />
                </label>
                <label className="cursor-pointer">
                  <Video className="w-5 h-5" />
                  <input type="file" accept="video/*" className="hidden" onChange={handleMediaUpload} />
                </label>
                <button><Calendar className="w-5 h-5" /></button>
              </div>
              <button onClick={handleSubmit} className="bg-emerald-600 text-white px-3 py-1 rounded flex items-center space-x-1">
                <Send className="w-4 h-4" /> <span>Post</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredPosts.length === 0 && (
          <div className="text-center py-10 bg-gray-100 rounded">
            <p className="text-gray-500">No posts found</p>
            <p className="text-sm text-gray-400">Be the first to share something with the community!</p>
          </div>
        )}

        {filteredPosts.map(post => (
          <div key={post.id} className="p-4 bg-white shadow rounded">
            <p>{post.content}</p>
            {post.media_url && post.media_type.startsWith('image') && (
              <img src={post.media_url} className="mt-2 rounded max-h-64 w-full object-cover cursor-pointer" />
            )}
            <div className="flex justify-between mt-2 text-gray-600">
              <div className="flex space-x-4">
                <button><Heart className="w-4 h-4" /></button>
                <button><MessageCircle className="w-4 h-4" /></button>
                <button><Share2 className="w-4 h-4" /></button>
              </div>
              <button><Bookmark className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CentralizedFeed;
