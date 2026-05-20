import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import ArticleList from '@/pages/ArticleList';
import ArticleDetail from '@/pages/ArticleDetail';
import Collections from '@/pages/Collections';
import About from '@/pages/About';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans text-gray-100 relative selection:bg-cyan-500 selection:text-white">

        <div className="fixed inset-0 w-full h-full z-[-1] site-background">
            <div className="absolute inset-0 bg-black/65"></div>
        </div>

        <Navbar />

        <main className="pb-12">
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/articles" element={<Layout><ArticleList /></Layout>} />
                    <Route path="/article/:slug" element={<div className="pt-20"><ArticleDetail /></div>} />
                    <Route path="/about" element={<Layout><About /></Layout>} />
                    <Route path="/collections/:category?" element={<Layout><Collections /></Layout>} />
                </Routes>
            </ErrorBoundary>
        </main>
      </div>
    </Router>
  )
}

export default App
