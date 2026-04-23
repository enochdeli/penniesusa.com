import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Calculator } from 'lucide-react';
import { mockPosts } from '../services/blogService';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = mockPosts.find(p => p.slug === id);

  if (!post) {
    return <Navigate to="/blog" />;
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-400 transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>
      </motion.div>

      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tight"
        >
          {post.title}
        </motion.h1>

        <div className="flex flex-wrap items-center gap-6 text-slate-400 border-b border-white/5 pb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500 text-sm font-bold">
              PS
            </div>
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{post.date}</span>
          </div>
          <button className="flex items-center gap-2 hover:text-teal-400 transition-colors ml-auto">
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-[2.5rem] overflow-hidden mb-12"
      >
        <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
      </motion.div>

      <div className="prose prose-invert prose-teal max-w-none prose-h2:text-3xl prose-h2:font-black prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300">
        <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 p-10 glass rounded-[2.5rem] border border-teal-500/30 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Calculator className="w-24 h-24" />
        </div>
        
        <h3 className="text-3xl font-black mb-4">Stop Guessing. Know Your Reality.</h3>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Reading the math is one thing. Seeing it work for your own bank account is another.
          Try our explorer and discover where you are actually rich.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl transition-all shadow-xl shadow-teal-500/20 scale-110"
        >
          Explore Your Wealth Now
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </Link>
      </motion.div>
    </article>
  );
};

// Simple markdown-ish to HTML formatter
function formatContent(content: string) {
  return content
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-black mt-12 mb-6 text-white">$1</h2>')
    .replace(/^---$/gim, '<hr class="my-12 border-white/10" />')
    .replace(/\*\*(.*)\*\*/gim, '<strong class="text-teal-400">$1</strong>')
    .replace(/\*(.*)\*/gim, '<em class="text-slate-200 italic">$1</em>')
    .replace(/^\* (.*$)/gim, '<li class="ml-4 mb-2 text-slate-300">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-6">')
    .replace(/\n/g, '<br />');
}

export default BlogPost;
