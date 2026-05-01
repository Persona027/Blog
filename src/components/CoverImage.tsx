import { useState } from 'react';
import type { CoverImageProps } from '@/types';

export type { CoverImageProps };

export const CoverImage = ({ src, alt, className = "", hoverEffect = true }: CoverImageProps) => {
    const [hasError, setHasError] = useState(false);
    const fallbackSrc = 'https://placehold.co/600x600?text=No+Cover';
    const displaySrc = hasError || !src ? fallbackSrc : src;

    return (
        <div className={`bg-gray-800 relative overflow-hidden shrink-0 ${className}`}>
            <img
                src={displaySrc}
                alt={alt}
                className={`w-full h-full object-cover transition-all duration-500
                    ${hoverEffect ? 'opacity-90 group-hover:opacity-100 group-hover:scale-105' : ''}
                `}
                onError={() => setHasError(true)}
            />
        </div>
    );
};
