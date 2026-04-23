import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { mockPosts } from '../services/blogService';

const Blog: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-16 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-black mb-6">Pennies<span className="text-teal-500 italic">Insights</span></h1>
        <p className="text-slate-400 text-lg">
          Expert guides on geo-arbitrage, cost of living, and making your wealth work harder around the world.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col glass rounded-[2rem] border border-white/10 overflow-hidden hover:border-teal-500/50 transition-all duration-500"
          >
            <div className="aspect-[16/10] overflow-hidden relative">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
              </div>
              
              <h2 className="text-xl font-bold mb-4 group-hover:text-teal-400 transition-colors leading-snug">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              
              <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              
              <Link 
                to={`/blog/${post.slug}`}
                className="mt-auto inline-flex items-center gap-2 text-teal-400 font-bold text-sm group/btn"
              >
                Read Article
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
