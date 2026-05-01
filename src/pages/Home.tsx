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
            <div className="h-screen flex flex-col items-center justify-center relative">
                <div
                    ref={heroRef}
                    className="text-center transition-opacity duration-75 ease-out"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
                        Welcome to Persona's Blog
                    </h1>
                </div>

                {/* Scroll Indicator */}
                <button
                    ref={buttonRef}
                    onClick={scrollToContent}
                    aria-label="Scroll down to content"
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-all animate-bounce"
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
