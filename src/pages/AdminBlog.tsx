import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Table, PenSquare, Trash2 } from 'lucide-react';
import { mockPosts } from '../services/blogService';

const AdminBlog: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-black">Content <span className="text-teal-500">Manager</span></h1>
        <Link to="/admin/new" className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-2xl font-bold transition-all">
          <Plus size={20} />
          Create New Post
        </Link>
      </div>

      <div className="glass rounded-[2rem] border border-white/10 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center gap-2 text-slate-500">
           <Table size={18} />
           <span className="font-bold text-sm uppercase tracking-widest">Active Articles</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-slate-400 text-sm uppercase">
                <th className="px-8 py-4 font-bold tracking-tighter">Title</th>
                <th className="px-8 py-4 font-bold tracking-tighter">Date</th>
                <th className="px-8 py-4 font-bold tracking-tighter text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockPosts.map((post) => (
                <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="font-bold text-white group-hover:text-teal-400 transition-colors">{post.title}</div>
                    <div className="text-xs text-slate-500">Slug: /{post.slug}</div>
                  </td>
                  <td className="px-8 py-6 text-slate-400 text-sm">{post.date}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Link to={`/admin/edit/${post.id}`} className="p-2 hover:bg-teal-500/20 text-slate-400 hover:text-teal-400 rounded-lg transition-colors">
                         <PenSquare size={18} />
                       </Link>
                       <button className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors">
                         <Trash2 size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 p-6 rounded-2xl bg-teal-500/5 border border-teal-500/20 text-sm text-slate-400 flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex-shrink-0 flex items-center justify-center text-teal-500 font-bold">!</div>
        <p>
          <strong className="text-white block mb-1">Developer Notice:</strong>
          This manager is currently in "View Only" mode. To enable real database persistence (Firebase), please use the setup tool or reconnect your configuration file.
        </p>
      </div>
    </div>
  );
};

export default AdminBlog;
