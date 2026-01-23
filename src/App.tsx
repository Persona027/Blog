import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import Collections from './pages/Collections';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans text-gray-100 relative selection:bg-cyan-500 selection:text-white">
        
        {/* 1. 背景层：全屏固定，z-index 为负值 */}
        <div 
            className="fixed inset-0 w-full h-full z-[-1]"
            style={{
                backgroundImage: `url('/1.jpg')`, // 引用 public/1.jpg
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed', // 视差效果核心
            }}
        >
            {/* 2. 遮罩层：确保背景不抢文字的风头 */}
            <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* 3. 导航栏 */}
        <Navbar />

        {/* 4. 内容区域：由于导航栏 fixed 高度约 64px(h-16)，我们需要给 main 加 padding-top */}
        <main className="pt-20 px-4 pb-12">
            <Routes>
                <Route path="/" element={<ArticleList />} />
                <Route path="/article/:slug" element={<ArticleDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/collections" element={<Collections />} />
            </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

