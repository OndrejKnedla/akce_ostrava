import { useState } from 'react';
import { cn } from '@/utils/cn';

interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export function ImageWithPlaceholder({ src, alt, className, aspectRatio = '16/9' }: ImageWithPlaceholderProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-dark-elevated', className)} style={{ aspectRatio }}>
      {!loaded && (
        <div className="absolute inset-0 shimmer-bar bg-dark-mid" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
}
