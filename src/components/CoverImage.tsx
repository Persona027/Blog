import { useState } from 'react';
import type { CoverImageProps } from '@/types';

export type { CoverImageProps };

export const CoverImage = ({ src, alt, className = "", hoverEffect = true }: CoverImageProps) => {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const fallbackSrc = 'https://placehold.co/600x600?text=No+Cover';
    const displaySrc = hasError || !src ? fallbackSrc : src;

    return (
        <div className={`bg-gray-800 relative overflow-hidden shrink-0 ${className} ${!isLoaded ? 'animate-shimmer' : ''}`}
             style={!isLoaded ? { backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)', backgroundSize: '200% 100%' } : undefined}>
            <img
                src={displaySrc}
                alt={alt}
                loading="lazy"
                className={`w-full h-full object-cover transition-all duration-500
                    ${!isLoaded ? 'opacity-0' : 'opacity-100'}
                    ${hoverEffect ? 'group-hover:opacity-100 group-hover:scale-105' : ''}
                `}
                onLoad={() => setIsLoaded(true)}
                onError={() => { setHasError(true); setIsLoaded(true); }}
            />
        </div>
    );
};
