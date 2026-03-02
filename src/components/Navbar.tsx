// filepath: D:/myWebsite/personal-site/src/components/Navbar.tsx
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, LayoutGrid, Archive, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // 点击外部关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as Element).closest('.dropdown-container')) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // 根据当前路径判断激活状态
    const isActive = (path: string) => {
        // 如果是带参数的路径，需要精确匹配
        if (path.includes('?')) {
            return location.pathname + location.search === path;
        }
        return location.pathname === path;
    };

    const linkStyle = (path: string) => {
        return isActive(path) ? "text-white font-bold" : "text-gray-300 hover:text-white transition";
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 h-16 bg-black/30 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 md:px-10">
            {/* 左上角：统一 Logo */}
            <Link to="/" className="text-2xl font-black tracking-tighter text-white hover:text-cyan-400 transition-colors">
                Persona
            </Link>

            {/* 右上角：导航菜单 */}
            <div className="flex space-x-6 md:space-x-8 text-sm md:text-base items-center">
                <Link to="/" className={linkStyle('/')}>首页</Link>
                
                {/* 文章下拉菜单 */}
                <div className="relative dropdown-container">
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`flex items-center gap-1 py-4 ${location.pathname.startsWith('/articles') ? 'text-white font-bold' : 'text-gray-300 hover:text-white transition'}`}
                    >
                        文章 <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* 下拉列表容器 */}
                    <div className={`absolute top-full right-0 mt-0 w-40 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl py-2 transition-all duration-300 shadow-2xl ${isDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                        <Link 
                            to="/articles" 
                            className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 transition-colors ${isActive('/articles') ? 'text-cyan-400' : 'text-gray-300'}`}
                        >
                            <LayoutGrid size={14} /> 所有文章
                        </Link>
                        <Link 
                            to="/articles?view=archive" 
                            className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 transition-colors ${location.search === '?view=archive' ? 'text-cyan-400' : 'text-gray-300'}`}
                        >
                            <Archive size={14} /> 归档总览
                        </Link>
                        <Link 
                            to="/articles?view=category" 
                            className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 transition-colors ${location.search === '?view=category' ? 'text-cyan-400' : 'text-gray-300'}`}
                        >
                            <Layers size={14} /> 分类探索
                        </Link>
                    </div>
                </div>

                <Link to="/about" className={linkStyle('/about')}>关于</Link>
                <Link to="/collections" className={linkStyle('/collections')}>收藏</Link>
            </div>
        </nav>
    );
};

export default Navbar;
