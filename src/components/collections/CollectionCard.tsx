import { type ReactNode } from 'react';
import { CoverImage } from '@/components/CoverImage';
import type { CoverImageProps } from '@/types';

interface CollectionCardProps {
  cover?: string;
  coverAlt: string;
  coverClassName?: CoverImageProps['className'];
  hoverBorderColor?: string;
  children: ReactNode;
  sidebar: ReactNode;
  mobileFooter?: ReactNode;
}

export const CollectionCard = ({
  cover,
  coverAlt,
  coverClassName,
  hoverBorderColor = 'hover:border-white/20',
  children,
  sidebar,
  mobileFooter,
}: CollectionCardProps) => (
  <div
    className={`bg-[#17232e] border border-[#2c3b47] rounded-lg overflow-hidden ${hoverBorderColor} transition-all duration-300 group hover:shadow-lg `}
  >
    <div className="flex flex-col md:flex-row h-full">
      <CoverImage src={cover} alt={coverAlt} className={coverClassName} />
      <div className="flex-1 p-6 flex flex-col justify-between">
        {children}
        {mobileFooter && (
          <div className="mt-4 pt-4 border-t border-white/5 md:hidden">{mobileFooter}</div>
        )}
      </div>
      <div className="hidden md:flex flex-col items-center justify-center p-6 w-32 border-l border-white/10 bg-gradient-to-l from-white/[0.02] to-transparent">
        {sidebar}
      </div>
    </div>
  </div>
);
