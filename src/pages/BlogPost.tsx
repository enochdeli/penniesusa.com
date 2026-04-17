import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost as IBlogPost } from '../types';
import { format } from 'date-fns';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';
import Markdown from 'react-markdown';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const q = query(
          collection(db, 'posts'),
          where('slug', '==', slug),
          limit(1)
        );
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
          setPost(null);
        } else {
          const doc = snapshot.docs[0];
          setPost({ ...doc.data(), id: doc.id } as IBlogPost);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-20 animate-pulse">
        <div className="h-4 bg-gray-200 w-24 rounded mb-8"></div>
        <div className="h-12 bg-gray-200 w-3/4 rounded mb-6"></div>
        <div className="h-6 bg-gray-200 w-1/4 rounded mb-12"></div>
        <div className="h-96 bg-gray-200 w-full rounded-2xl mb-12"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 w-full rounded"></div>
          <div className="h-4 bg-gray-200 w-full rounded"></div>
          <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-32 pb-32 text-center">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </button>
      </div>
    );
  }

  return (
    <article className="pb-20 font-sans">
      {/* Header section (without cover image constraint) */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to all articles
        </Link>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs font-semibold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight"
        >
          {post.title}
        </motion.h1>

        {post.summary && (
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-8 leading-relaxed"
          >
            {post.summary}
          </motion.p>
        )}

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between py-6 border-y border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {post.authorName.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{post.authorName}</div>
              <div className="flex items-center text-sm text-gray-500 gap-2">
                <time dateTime={post.createdAt}>
                  {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                </time>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {Math.max(1, Math.ceil(post.content.split(' ').length / 200))} min read
                </span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }
            }}
            className="p-3 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors"
            title="Share article"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Cover Image */}
      {post.coverImageUrl && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <img 
            src={post.coverImageUrl} 
            alt={post.title}
            className="w-full rounded-3xl shadow-xl border border-gray-200"
          />
        </motion.div>
      )}

      {/* Content */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="prose prose-lg prose-brand max-w-none prose-headings:font-display prose-headings:font-bold prose-img:rounded-2xl prose-a:text-brand-600">
          <Markdown>{post.content}</Markdown>
        </div>
      </motion.div>
    </article>
  );
}
