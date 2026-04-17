import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import Layout from './components/Layout';
import GlobalExplorer from './pages/GlobalExplorer';
import WealthInsights from './pages/WealthInsights';
import About from './pages/About';
import CurrencyConverter from './pages/CurrencyConverter';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminBlog from './pages/AdminBlog';
import AdminEditPost from './pages/AdminEditPost';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<GlobalExplorer />} />
              <Route path="insights" element={<WealthInsights />} />
              <Route path="converter" element={<CurrencyConverter />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="admin/blog" element={<AdminBlog />} />
              <Route path="admin/blog/:id" element={<AdminEditPost />} />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
