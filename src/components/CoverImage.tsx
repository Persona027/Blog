import { useState } from 'react';
import type { CoverImageProps } from '@/types';
export type { CoverImageProps };
export const CoverImage = ({ src, alt, className = '', hoverEffect = true }: CoverImageProps) => {
  const [failed, setFailed] = useState<string>();
  const valid = src && failed !== src && !/^[a-z]:/i.test(src);
  return (
    <div className={`cover-image ${className}`}>
      {valid ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover ${hoverEffect ? 'transition-transform duration-300 group-hover:scale-[1.03]' : ''}`}
          onError={() => setFailed(src)}
        />
      ) : (
        <div className="cover-placeholder" role="img" aria-label={`${alt}：暂无封面`}>
          <span>{alt.slice(0, 1)}</span>
        </div>
      )}
    </div>
  );
};
