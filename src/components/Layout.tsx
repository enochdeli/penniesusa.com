import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#fcfaf7] selection:bg-brand-200">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
