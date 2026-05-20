import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import ArticleList from './ArticleList';
import { useScrollFade } from '@/hooks/useScrollFade';

const Home = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useScrollFade([heroRef, buttonRef], 600);

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className="relative">
            {/* Hero Section */}
            <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
                {/* 装饰光圈 — 外层 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_70%)] pointer-events-none" />
                {/* 装饰光圈 — 内层 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.12),transparent_65%)] pointer-events-none" />

                <div
                    ref={heroRef}
                    className="text-center transition-opacity duration-75 ease-out relative z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-lg font-heading animate-fade-in-up">
                        Persona's Blog
                    </h1>
                    <p className="mt-6 text-base md:text-lg text-gray-400 max-w-md mx-auto leading-relaxed animate-fade-in-up delay-200">
                        记录<span className="text-cyan-400 font-semibold">学习</span>轨迹，
                        整理<span className="text-cyan-400 font-semibold">技术</span>思考
                    </p>
                    <div className="mt-8 h-px w-16 bg-gradient-to-r from-cyan-400 to-transparent mx-auto animate-scale-in delay-400"></div>
                </div>

                {/* Scroll Indicator */}
                <button
                    ref={buttonRef}
                    onClick={scrollToContent}
                    type="button"
                    aria-label="Scroll down to content"
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 hover:text-white transition-all"
                    style={{ animation: 'bounce-subtle 2s ease-in-out infinite' }}
                >
                    <ChevronDown size={40} />
                </button>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <ArticleList />
            </div>
        </div>
    );
};

export default Home;
