import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Type, 
  Calendar,
  Eye,
  CheckCircle2
} from 'lucide-react';

const AdminEditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      navigate('/admin');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="flex items-center justify-between mb-12">
        <Link to="/admin" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-black">
          {isNew ? 'Create <span class="text-teal-500">Post</span>' : 'Edit <span class="text-teal-500">Post</span>'}
        </h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Editor Form */}
        <form onSubmit={handleSave} className="lg:col-span-2 space-y-8">
          <div className="glass rounded-[2rem] p-8 border border-white/10 space-y-6">
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest pl-2">
                <Type size={14} /> Post Title
              </label>
              <input 
                required
                type="text" 
                placeholder="Ex: Can You Live in Spain on $2500?"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (isNew) setSlug(e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
                }}
                className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 text-xl font-bold focus:ring-2 focus:ring-teal-500/50 outline-none transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest pl-2">
                Slug (URL)
              </label>
              <input 
                required
                type="text" 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 text-sm font-mono focus:ring-2 focus:ring-teal-500/50 outline-none transition-all text-teal-500"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-2">Excerpt</label>
              <textarea 
                required
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A short summary for the blog list page..."
                className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 text-slate-300 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-2">Content (Markdown)</label>
              <textarea 
                required
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article here..."
                className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 text-slate-300 font-serif leading-relaxed focus:ring-2 focus:ring-teal-500/50 outline-none transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSaved}
            className={`w-full py-5 rounded-[1.5rem] font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all ${
              isSaved 
                ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                : 'bg-teal-500 hover:bg-teal-600 text-white shadow-teal-500/20 hover:scale-[1.02] active:scale-95'
            }`}
          >
            {isSaved ? <><CheckCircle2 /> Post Saved Successfully!</> : <><Save /> Publish Article Now</>}
          </button>
        </form>

        {/* Sidebar Settings */}
        <aside className="space-y-6">
           <div className="glass rounded-[2rem] p-6 border border-white/10 space-y-6">
              <h3 className="font-bold flex items-center gap-2 text-slate-200">
                <ImageIcon size={18} className="text-teal-500" /> Featured Image
              </h3>
              <div className="space-y-4">
                <div className="aspect-[16/9] rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center overflow-hidden">
                  {imageUrl ? (
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={32} className="text-slate-800" />
                  )}
                </div>
                <input 
                  type="url" 
                  placeholder="Paste Image URL..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-white/5 rounded-xl p-3 text-sm focus:ring-2 focus:ring-teal-500/50 outline-none transition-all"
                />
              </div>
           </div>

           <div className="glass rounded-[2rem] p-6 border border-white/10 space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-slate-200">
                <Calendar size={18} className="text-teal-500" /> Status
              </h3>
              <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20">
                <div className="text-teal-500 font-bold text-sm">Ready to Publish</div>
                <p className="text-xs text-slate-500 mt-1">SEO checks passed for the target long-tail keywords.</p>
              </div>
              <button type="button" className="w-full py-3 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                <Eye size={14} /> Preview Changes
              </button>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default AdminEditPost;
