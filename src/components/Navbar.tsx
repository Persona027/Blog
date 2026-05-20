import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, LayoutGrid, Archive, Layers } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { ROUTES } from '@/constants';

const Navbar = () => {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);
    useClickOutside(dropdownRef, closeDropdown);

    const isActive = (path: string) => {
        if (path.includes('?')) {
            return location.pathname + location.search === path;
        }
        return location.pathname === path;
    };

    const linkStyle = (path: string) => {
        return isActive(path) ? "text-white font-bold" : "text-gray-300 hover:text-white transition";
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 h-16 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 md:px-10">
            <Link to={ROUTES.HOME} className="text-2xl font-heading font-black tracking-tighter text-white hover:text-cyan-400 hover:scale-[1.02] transition-all inline-block">
                Persona
            </Link>

            <div className="flex space-x-6 md:space-x-8 text-sm md:text-base items-center">
                <Link to={ROUTES.HOME} className={linkStyle(ROUTES.HOME)}>首页</Link>

                <div ref={dropdownRef} className="relative dropdown-container">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`flex items-center gap-1 py-4 ${location.pathname.startsWith('/articles') ? 'text-white font-bold' : 'text-gray-300 hover:text-white transition'}`}
                    >
                        文章 <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <div className={`absolute top-full right-0 mt-0 w-40 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl py-2 transition-all duration-200 shadow-2xl ${isDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-1 pointer-events-none'}`}>
                        <Link
                            to={ROUTES.ARTICLES}
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

                <Link to={ROUTES.ABOUT} className={linkStyle('/about')}>关于</Link>
                <Link to={ROUTES.COLLECTIONS_BASE} className={linkStyle(ROUTES.COLLECTIONS_BASE)}>收藏</Link>
            </div>
        </nav>
    );
};

export default Navbar;
