// filepath: D:/myWebsite/personal-site/src/components/CoverImage.tsx

interface CoverImageProps {
    src?: string;
    alt: string;
    className?: string; // 允许外部传入宽高、aspect-ratio 等布局类
    hoverEffect?: boolean;
}

export const CoverImage = ({ src, alt, className = "", hoverEffect = true }: CoverImageProps) => {
    return (
        <div className={`bg-gray-800 relative overflow-hidden shrink-0 ${className}`}>
            <img 
                src={src || 'https://placehold.co/600x600?text=No+Cover'} 
                alt={alt} 
                className={`w-full h-full object-cover transition-all duration-500 
                    ${hoverEffect ? 'opacity-90 group-hover:opacity-100 group-hover:scale-105' : ''}
                `}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // 防止无线循环
                    if (target.src !== 'https://placehold.co/600x600?text=No+Cover') {
                        target.src = 'https://placehold.co/600x600?text=No+Cover';
                        target.style.objectFit = 'contain';
                        target.style.padding = '10%';
                    }
                }}
            />
        </div>
    );
};
