import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
}

export function ProductImage({ src, alt, title, className = '' }: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center bg-[#EFECE6] p-6 text-center text-[#5B574F] ${className}`}
        role="img"
        aria-label={alt}
      >
        <ShoppingBag className="mb-3 h-6 w-6 stroke-[1.25]" aria-hidden="true" />
        <span className="text-xs tracking-wide">{title}</span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#EFECE6]">
      {!loaded && (
        <div
          className="absolute inset-0 bg-[#E7E3DB] transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`h-full w-full object-cover object-top transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
}