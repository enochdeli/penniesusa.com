import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { BlogPost } from '../types';
import { useAuth } from '../AuthContext';
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import slugify from 'slugify';

export default function AdminEditPost() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    takeaways: '' as string, // Newline separated temporarily for editing
    content: '',
    coverImageUrl: '',
    galleryImages: '', // newline separated
    tags: '', // comma separated temporarily
    published: false,
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }

    if (!isNew && id) {
      const fetchPost = async () => {
        try {
          const docSnap = await getDoc(doc(db, 'posts', id));
          if (docSnap.exists()) {
            const data = docSnap.data() as BlogPost;
            setFormData({
              title: data.title,
              slug: data.slug,
              summary: data.summary || '',
              takeaways: data.takeaways ? data.takeaways.join('\n') : '',
              content: data.content,
              coverImageUrl: data.coverImageUrl || '',
              galleryImages: data.galleryImages ? data.galleryImages.join('\n') : '',
              tags: data.tags ? data.tags.join(', ') : '',
              published: data.published,
            });
          } else {
            setError('Post not found');
          }
        } catch (err) {
          console.error("Error fetching post:", err);
          setError('Failed to fetch post data');
        } finally {
          setLoading(false);
        }
      };
      
      fetchPost();
    }
  }, [id, isAdmin, isNew, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Auto-generate slug when title changes on new post
    if (name === 'title' && isNew && formData.slug === slugify(formData.title, { lower: true, strict: true })) {
      const newSlug = slugify(value, { lower: true, strict: true });
      setFormData(prev => ({ ...prev, title: value, slug: newSlug }));
      return;
    }
    
    const parsedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const generateSlug = () => {
    setFormData(prev => ({
      ...prev,
      slug: slugify(prev.title, { lower: true, strict: true })
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.content) {
      setError('Title, slug, and content are required.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const postId = isNew ? formData.slug : id!; // Use generated slug or existing ID
      const tagsArray = formData.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);
      
      const takeawaysArray = formData.takeaways
        .split('\n')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const galleryArray = formData.galleryImages
        .split('\n')
        .map(t => t.trim())
        .filter(t => t.length > 0);
        
      const now = new Date().toISOString();

      const postData: Partial<BlogPost> = {
        title: formData.title,
        slug: formData.slug,
        summary: formData.summary,
        takeaways: takeawaysArray,
        content: formData.content,
        coverImageUrl: formData.coverImageUrl,
        galleryImages: galleryArray,
        tags: tagsArray,
        published: formData.published,
        updatedAt: now,
      };

      if (isNew) {
        postData.id = postId;
        postData.authorId = user!.uid;
        postData.authorName = user!.displayName || user!.email?.split('@')[0] || 'Admin';
        postData.createdAt = now;
      }

      await setDoc(doc(db, 'posts', postId), postData, { merge: true });
      
      if (isNew) {
        navigate(`/admin/blog/edit/${postId}`);
      } else {
        alert('Post saved successfully!');
      }
    } catch (err: any) {
      console.error("Error saving post:", err);
      setError(err.message || 'Failed to save post.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id || isNew) return;
    
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        setSaving(true);
        await setDoc(doc(db, 'posts', id), { published: false }, { merge: true }); // Soft block
        // Actual delete
        const { deleteDoc, doc } = await import('firebase/firestore');
        await deleteDoc(doc(db, 'posts', id));
        navigate('/admin/blog');
      } catch (err) {
        console.error("Error deleting post:", err);
        setError('Failed to delete post.');
      } finally {
        setSaving(false);
      }
    }
  };

  if (!isAdmin) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 font-sans">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          to="/admin/blog"
          className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-display font-bold text-gray-900">
          {isNew ? 'Create New Post' : 'Edit Post'}
        </h1>
        <div className="flex-1" />
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-brand-700 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? 'Saving...' : 'Save Post'}
        </button>
        {!isNew && (
          <button
            onClick={handleDelete}
            disabled={saving}
            className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-gray-200"
            title="Delete Post"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        )}
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow text-lg font-medium"
                  placeholder="The definitive guide to arbitrage..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown)</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={20}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow font-mono text-sm leading-relaxed bg-gray-50 bg-opacity-50"
                  placeholder="# Introduction\n\nStart writing your amazing article here..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    readOnly={!isNew}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 bg-gray-50 text-sm"
                  />
                  {isNew && (
                    <button 
                      onClick={generateSlug}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                    >
                      Generate
                    </button>
                  )}
                </div>
                {!isNew && <p className="text-xs text-gray-500 mt-1">Slug cannot be changed after creation.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                    Publish immediately
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Summary snippet</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 text-sm"
                  placeholder="A brief 1-2 sentence overview for the index page..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Takeaways (One per line)</label>
                <textarea
                  name="takeaways"
                  value={formData.takeaways}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 text-sm"
                  placeholder="The first key point...\nThe second key point..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Gallery Image URLs (One per line)
                </label>
                <textarea
                  name="galleryImages"
                  value={formData.galleryImages}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 text-sm"
                  placeholder="https://image1.jpg\nhttps://image2.jpg..."
                />
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter font-bold font-mono">Visible in post gallery</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 text-sm"
                  placeholder="nomad, taxes, lifestyle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Cover Image URL
                </label>
                <input
                  type="text"
                  name="coverImageUrl"
                  value={formData.coverImageUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 text-sm"
                  placeholder="https://..."
                />
                {formData.coverImageUrl && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 aspect-video relative">
                    <img src={formData.coverImageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
