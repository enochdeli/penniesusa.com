import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost as IBlogPost } from '../types';
import { format } from 'date-fns';
import { ArrowLeft, Clock, Share2, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import Markdown from 'react-markdown';
import SEO from '../components/SEO';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [netWorth, setNetWorth] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        // First try: Query by slug field
        const q = query(
          collection(db, 'posts'),
          where('slug', '==', slug),
          limit(1)
        );
        const snapshot = await getDocs(q);
        
        let foundPost: IBlogPost | null = null;

        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          foundPost = { ...doc.data(), id: doc.id } as IBlogPost;
        } else {
          // Second try: Maybe the slug is actually the document ID
          const { getDoc, doc: firestoreDoc } = await import('firebase/firestore');
          const docSnap = await getDoc(firestoreDoc(db, 'posts', slug));
          if (docSnap.exists()) {
            foundPost = { ...docSnap.data(), id: docSnap.id } as IBlogPost;
          }
        }

        if (foundPost) {
          setPost(foundPost);
          
          // Extract headings for Table of Contents
          const extractedHeadings: Heading[] = [];
          const lines = foundPost.content.split('\n');
          lines.forEach(line => {
            const match = line.match(/^(#{2,3})\s+(.+)$/);
            if (match) {
              const level = match[1].length;
              const text = match[2];
              const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              extractedHeadings.push({ id, text, level });
            }
          });
          setHeadings(extractedHeadings);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 w-32 rounded mb-8"></div>
          <div className="h-16 bg-gray-200 w-full rounded mb-6"></div>
          <div className="h-20 bg-gray-100 w-full rounded-2xl mb-12"></div>
          <div className="h-96 bg-gray-200 w-full rounded-3xl mb-12"></div>
        </div>
        <div className="hidden lg:block space-y-6">
          <div className="h-64 bg-gray-100 rounded-3xl animate-pulse"></div>
          <div className="h-96 bg-gray-100 rounded-3xl animate-pulse"></div>
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

  const category = post.tags?.[0] || 'Resources';

  return (
    <div className="bg-[#fcfdfd] min-h-screen">
      <SEO 
        title={`${post.title} | penniesusa Blog`}
        description={post.summary || `Read more about ${post.title} on penniesusa.`}
      />

      <article className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
          <Link to="/blog" className="hover:text-brand-600 transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-600">{category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 items-start">
          {/* Main Content Column */}
          <div className="space-y-8">
            <header className="space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-[#0a192f] leading-[1.1]"
              >
                {post.title}
              </motion.h1>

              {/* Author Bio Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-5 py-8 border-y border-brand-100"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-brand-900/10 shrink-0">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-500 text-sm">Authored by</span>
                    <span className="font-bold text-[#0a192f]">{post.authorName}</span>
                  </div>
                  <div className="text-sm text-brand-600 font-bold uppercase tracking-tighter">
                    Senior Financial Data Analyst, penniesusa
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <time dateTime={post.createdAt}>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</time>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {Math.max(1, Math.ceil(post.content.split(' ').length / 200))} min read
                    </span>
                  </div>
                </div>
              </motion.div>
            </header>

            {/* Top CTA Link */}
            <div className="bg-brand-50/50 p-4 rounded-xl border border-brand-100/50 text-sm italic text-brand-700">
              I hope you enjoy reading this update. If you want to see exactly where your money goes furthest,{' '}
              <Link to="/" className="font-bold underline decoration-brand-300 underline-offset-4 hover:text-brand-800 transition-colors">
                click here to use our Global Explorer tool.
              </Link>
            </div>

            {/* Key Takeaways Section */}
            {(post.takeaways && post.takeaways.length > 0) ? (
              <section className="bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-brand-100 shadow-xl shadow-brand-900/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h2 className="text-2xl font-display font-black text-[#0a192f] mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  Key Takeaways
                </h2>
                <ul className="space-y-6">
                  {post.takeaways.map((point, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="w-2 h-2 rounded bg-brand-500 mt-2.5 shrink-0 transition-transform group-hover:scale-150 group-hover:rotate-45" />
                      <p className="text-lg text-gray-700 font-light leading-relaxed">
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : (
              // Fallback takeaways if none provided
              <section className="bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-brand-100 shadow-xl shadow-brand-900/5">
                <h2 className="text-2xl font-display font-black text-[#0a192f] mb-8">Key Takeaways</h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded bg-brand-500 mt-2.5 shrink-0" />
                    <p className="text-lg text-gray-700 font-light leading-relaxed">
                      {post.summary || "Actionable insights for global wealth management and currency optimization."}
                    </p>
                  </li>
                </ul>
              </section>
            )}

            {/* Main Content Area */}
            <div className="prose prose-lg prose-brand max-w-none prose-headings:font-display prose-headings:font-black prose-headings:text-[#0a192f] prose-p:text-gray-700 prose-p:font-light prose-p:leading-loose prose-img:rounded-[2rem] prose-strong:text-brand-900">
              <Markdown 
                components={{
                  h2: ({node, ...props}) => {
                    const id = String(props.children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return <h2 id={id} {...props} />;
                  },
                  h3: ({node, ...props}) => {
                    const id = String(props.children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return <h3 id={id} {...props} />;
                  }
                }}
              >
                {post.content}
              </Markdown>
            </div>

            {/* Image Gallery */}
            {post.galleryImages && post.galleryImages.length > 0 && (
              <section className="pt-12 border-t border-brand-100">
                <h3 className="text-2xl font-display font-black text-[#0a192f] mb-8">Article Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {post.galleryImages.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="aspect-[4/3] rounded-3xl overflow-hidden border border-brand-100 shadow-lg hover:shadow-2xl transition-all duration-500 group"
                    >
                      <img 
                        src={img} 
                        alt={`Gallery item ${i + 1} for ${post.title}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Area */}
          <aside className="space-y-8 sticky top-28 hidden lg:block">
            {/* Lead Gen Box */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-brand-100 shadow-2xl shadow-brand-900/5 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50/50 blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-2xl font-display font-black text-[#0a192f] mb-4 leading-tight">
                Do you want to be a <span className="text-brand-600 italic underline decoration-brand-200">Millionaire?</span>
              </h3>
              <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">
                Check where your current net worth makes you a millionaire instantly.
              </p>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
                  <input 
                    type="number"
                    value={netWorth}
                    onChange={(e) => setNetWorth(e.target.value)}
                    placeholder="Your Net Worth"
                    className="w-full pl-8 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:bg-white transition-all text-lg font-bold"
                  />
                </div>
                <button 
                  onClick={() => navigate('/', { state: { amount: netWorth } })}
                  className="w-full py-4 rounded-xl bg-brand-600 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  CONTINUE <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Table of Contents Card */}
            {headings.length > 0 && (
              <div className="bg-[#fcfdfd] p-10 rounded-[2.5rem] border border-brand-100">
                <h3 className="text-xl font-display font-black text-[#0a192f] mb-8 pb-6 border-b border-brand-200/50">
                  Table of contents
                </h3>
                <nav className="space-y-6">
                  {headings.map((h, i) => (
                    <a 
                      key={i}
                      href={`#${h.id}`}
                      className={cn(
                        "flex items-start gap-4 group transition-colors",
                        h.level === 3 ? "ml-6" : ""
                      )}
                    >
                      <div className="w-1.5 h-1.5 rounded-sm bg-brand-200 mt-2 shrink-0 group-hover:bg-brand-500 transition-colors" />
                      <span className="text-sm font-bold text-gray-600 group-hover:text-brand-700 leading-tight">
                        {h.text}
                      </span>
                    </a>
                  ))}
                  {/* FAQs entry if appropriate or just manual */}
                  <a href="#faqs" className="flex items-start gap-4 group transition-colors">
                    <div className="w-1.5 h-1.5 rounded-sm bg-brand-200 mt-2 shrink-0 group-hover:bg-brand-500 transition-colors" />
                    <span className="text-sm font-bold text-gray-600 group-hover:text-brand-700 leading-tight">
                      FAQs
                    </span>
                  </a>
                </nav>
              </div>
            )}
          </aside>
        </div>
      </article>

      {/* Share Actions Float Area */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-3 bg-[#0a192f] rounded-2xl shadow-2xl backdrop-blur-md">
        <button 
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-700 transition-all"
        >
          <ArrowLeft className="w-3 h-3" /> Feed
        </button>
        <div className="w-[1px] h-4 bg-white/20 mx-1" />
        <button 
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Article link copied!");
          }}
          className="p-2 text-white/70 hover:text-white transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Utility function duplicated for clarity if not imported
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
