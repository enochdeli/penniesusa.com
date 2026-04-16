import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import GlobalExplorer from './pages/GlobalExplorer';
import WealthInsights from './pages/WealthInsights';
import About from './pages/About';
import CurrencyConverter from './pages/CurrencyConverter';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GlobalExplorer />} />
          <Route path="insights" element={<WealthInsights />} />
          <Route path="converter" element={<CurrencyConverter />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}
