import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

const GlobalExplorer = lazy(() => import('./pages/GlobalExplorer'));
const CurrencyConverter = lazy(() => import('./pages/CurrencyConverter'));
const WealthInsights = lazy(() => import('./pages/WealthInsights'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const About = lazy(() => import('./pages/About'));
const AdminBlog = lazy(() => import('./pages/AdminBlog'));
const AdminEditPost = lazy(() => import('./pages/AdminEditPost'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 selection:bg-teal-500/30">
        <Header />
        <main className="flex-grow">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
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
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
  </div>
);

export default App;
