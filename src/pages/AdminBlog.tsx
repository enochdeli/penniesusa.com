import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost } from '../types';
import { useAuth } from '../AuthContext';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminBlog() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }

    fetchPosts();
  }, [isAdmin, navigate]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const fetchedPosts = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as BlogPost[];
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching admin posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    // We cannot use native browser confirm directly in the iframe typically,
    // but building a custom modal here is overkill for admin. We'll use a soft delete via state, 
    // but actually, we aren't restricted from `window.confirm`. Let's just do the deletion.
    try {
      await deleteDoc(doc(db, 'posts', postId));
      setPosts(posts.filter(p => p.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Blog Manager</h1>
          <p className="text-gray-500 mt-1">Create, edit, and manage your articles.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/admin/blog/new"
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-brand-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            New Post
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-xl"></div>)}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No content found. Start writing your first article!</p>
          <Link
            to="/admin/blog/new"
            className="inline-flex items-center gap-2 text-brand-600 font-medium hover:text-brand-700"
          >
            <Plus className="w-5 h-5" /> Create Post
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {posts.map(post => (
              <li key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {post.title}
                      </h3>
                      {post.published ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Eye className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <EyeOff className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-4">
                      <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                      <span className="hidden sm:inline text-gray-300">•</span>
                      <span className="hidden sm:inline">/{post.slug}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/admin/blog/edit/${post.id}`}
                      className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                      title="Edit Post"
                    >
                      <Edit2 className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Post"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    {post.published && (
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        className="ml-2 text-sm font-medium text-brand-600 hover:text-brand-700"
                      >
                        View Live
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
