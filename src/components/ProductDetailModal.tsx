import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { Product, ProductSize } from '../types';
import { formatGbp, getEffectivePrice } from '../data/products';
import { ProductImage } from './ProductImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSize) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize>('S');
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] ?? 'One Size');
      setAddedFeedback(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) {
    return null;
  }

  const effectivePrice = getEffectivePrice(product);
  const hasSale = typeof product.salePriceGbp === 'number';

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAddedFeedback(true);
    window.setTimeout(() => {
      setAddedFeedback(false);
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/55 p-4 backdrop-blur-[2px] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-y-auto border border-[#E2DDD4] bg-[#F7F4EF] shadow-2xl md:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 inline-flex min-h-[40px] min-w-[40px] items-center justify-center border border-[#E2DDD4] bg-[#F7F4EF]/95 text-[#1A1A1A] transition-colors hover:bg-[#EFECE6] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
        >
          <X className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
        </button>

        {/* Left: Product Image */}
        <div className="relative aspect-[3/4] w-full border-b border-[#E2DDD4] bg-[#EFECE6] md:col-span-6 md:aspect-auto md:min-h-[540px] md:border-r md:border-b-0">
          <ProductImage
            src={product.imageSrc}
            alt={product.imageAlt}
            title={product.title}
          />
          {product.discountLabel && (
            <span className="pointer-events-none absolute top-4 left-4 bg-[#7A2E3A] px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] text-[#F7F4EF] uppercase">
              {product.discountLabel}
            </span>
          )}
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs tracking-[0.14em] text-[#5B574F] uppercase">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.colorName}</span>
              </div>

              <h2
                id="pdp-modal-title"
                className="font-editorial mt-2 text-3xl font-normal leading-tight text-[#1A1A1A]"
              >
                {product.title}
              </h2>

              <div className="mt-2.5 flex items-baseline gap-2.5 tabular-nums">
                {hasSale && product.salePriceGbp !== undefined ? (
                  <>
                    <span className="text-xl font-semibold text-[#7A2E3A]">
                      {formatGbp(product.salePriceGbp)}
                    </span>
                    <span className="text-sm text-[#8E897F] line-through">
                      {formatGbp(product.priceGbp)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-medium text-[#1A1A1A]">
                    {formatGbp(product.priceGbp)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[#3D3A34]">
              {product.description}
            </p>

            {/* Material & Care */}
            <div className="space-y-3 border-t border-[#E2DDD4] pt-5 text-xs leading-relaxed">
              <div>
                <span className="block font-medium tracking-wider text-[#1A1A1A] uppercase">
                  Composition
                </span>
                <span className="mt-1 block text-[#5B574F]">{product.material}</span>
              </div>
              <div>
                <span className="block font-medium tracking-wider text-[#1A1A1A] uppercase">
                  Garment Care
                </span>
                <span className="mt-1 block text-[#5B574F]">{product.care}</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="border-t border-[#E2DDD4] pt-5">
              <div className="mb-2.5 flex items-center justify-between text-xs">
                <span className="font-medium tracking-wider text-[#1A1A1A] uppercase">
                  Select Size
                </span>
                <span className="text-[#5B574F]">Selected: {selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={isSelected}
                      className={`min-h-[40px] min-w-[52px] border px-4 py-2 text-xs font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F] ${
                        isSelected
                          ? 'border-[#1E352F] bg-[#1E352F] text-[#F7F4EF]'
                          : 'border-[#E2DDD4] bg-[#F7F4EF] text-[#1A1A1A] hover:border-[#1E352F]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[#E2DDD4] pt-6">
            <button
              type="button"
              onClick={handleAdd}
              className="flex min-h-[46px] w-full items-center justify-center gap-2 bg-[#1E352F] px-6 py-3 text-xs font-medium tracking-[0.12em] text-[#F7F4EF] uppercase transition-colors duration-200 hover:bg-[#152722] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
            >
              {addedFeedback ? (
                <>
                  <Check className="h-4 w-4 stroke-[2]" aria-hidden="true" />
                  <span>Added to Bag ({selectedSize})</span>
                </>
              ) : (
                <span>
                  Add to Bag — {formatGbp(effectivePrice)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}