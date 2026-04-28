import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

import GlobalExplorer from './pages/GlobalExplorer';
import CurrencyConverter from './pages/CurrencyConverter';
import WealthInsights from './pages/WealthInsights';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import AdminBlog from './pages/AdminBlog';
import AdminEditPost from './pages/AdminEditPost';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-slate-900 font-sans selection:bg-teal-500/30">
        <Header />
        <main className="flex-grow">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<GlobalExplorer />} />
              <Route path="/converter" element={<CurrencyConverter />} />
              <Route path="/insights" element={<WealthInsights />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<AdminBlog />} />
              <Route path="/admin/new" element={<AdminEditPost />} />
              <Route path="/admin/edit/:id" element={<AdminEditPost />} />
              <Route path="*" element={<GlobalExplorer />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
