import { useState } from 'react';
import { Check, Eye, Plus } from 'lucide-react';
import { CategoryFilter, Product, ProductSize } from '../types';
import { formatGbp } from '../data/products';
import { ProductImage } from './ProductImage';

interface CollectionSectionProps {
  products: Product[];
  activeCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: ProductSize) => void;
}

const CATEGORIES: CategoryFilter[] = [
  'All',
  'Apparel',
  'Accessories',
  'Curated Sets',
];

export function CollectionSection({
  products,
  activeCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart,
}: CollectionSectionProps) {
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[0] ?? 'One Size';
    onAddToCart(product, defaultSize);
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((current) => (current === product.id ? null : current));
    }, 1400);
  };

  return (
    <section
      id="collection"
      className="scroll-mt-16 border-b border-[#E2DDD4] bg-[#F7F4EF]"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {/* Section Header + Interactive Category Filter Tabs */}
        <div className="mb-10 flex flex-col gap-6 border-b border-[#E2DDD4] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs tracking-[0.14em] text-[#5B574F] uppercase">
              Autumn / Winter Edit
            </p>
            <h2 className="font-editorial mt-2 text-3xl font-normal tracking-[-0.01em] text-[#1A1A1A] sm:text-4xl">
              The Collection
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter collection by category"
            className="inline-flex flex-wrap items-center gap-1 border border-[#E2DDD4] bg-[#EFECE6] p-1 self-start md:self-auto"
          >
            {CATEGORIES.map((category) => {
              const count =
                category === 'All'
                  ? products.length
                  : products.filter((p) => p.category === category).length;
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectCategory(category)}
                  className={`min-h-[38px] px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F] ${
                    isActive
                      ? 'bg-[#1E352F] text-[#F7F4EF] shadow-xs'
                      : 'text-[#5B574F] hover:text-[#1A1A1A]'
                  }`}
                >
                  {category}{' '}
                  <span
                    className={`ml-0.5 tabular-nums ${
                      isActive ? 'text-[#F7F4EF]/80' : 'text-[#7A756B]'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid (8 Products) */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product, index) => {
            const isJustAdded = recentlyAddedId === product.id;
            const hasSale = typeof product.salePriceGbp === 'number';

            return (
              <article
                key={product.id}
                style={{ animationDelay: `${index * 60}ms` }}
                className="animate-fade-up group flex flex-col justify-between transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#E2DDD4] bg-[#EFECE6]">
                    <button
                      type="button"
                      onClick={() => onQuickView(product)}
                      aria-label={`View details for ${product.title}`}
                      className="block h-full w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
                    >
                      <ProductImage
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        title={product.title}
                        className="group-hover:scale-[1.04]"
                      />
                    </button>

                    {product.discountLabel && (
                      <span className="pointer-events-none absolute top-3 left-3 bg-[#7A2E3A] px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] text-[#F7F4EF] uppercase">
                        {product.discountLabel}
                      </span>
                    )}
                  </div>

                  {/* Product Metadata & Title */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2 text-xs text-[#5B574F]">
                      <span className="tracking-wider uppercase truncate">
                        {product.category} · {product.colorName}
                      </span>

                      <div className="flex items-baseline gap-1.5 shrink-0 tabular-nums">
                        {hasSale && product.salePriceGbp !== undefined ? (
                          <>
                            <span className="text-xs text-[#8E897F] line-through">
                              {formatGbp(product.priceGbp)}
                            </span>
                            <span className="text-[15px] font-semibold text-[#7A2E3A]">
                              {formatGbp(product.salePriceGbp)}
                            </span>
                          </>
                        ) : (
                          <span className="text-[15px] font-medium text-[#1A1A1A]">
                            {formatGbp(product.priceGbp)}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-medium leading-snug text-[#1A1A1A]">
                      <button
                        type="button"
                        onClick={() => onQuickView(product)}
                        className="text-left transition-colors hover:text-[#1E352F] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
                      >
                        {product.title}
                      </button>
                    </h3>

                    <p className="text-xs leading-relaxed text-[#5B574F]">
                      {product.subtitle}
                    </p>
                  </div>
                </div>

                {/* Action Row */}
                <div className="mt-5 grid grid-cols-2 gap-2 border-t border-[#E2DDD4] pt-4">
                  <button
                    type="button"
                    onClick={() => onQuickView(product)}
                    className="inline-flex min-h-[40px] items-center justify-center gap-1.5 border border-[#E2DDD4] bg-transparent px-3 py-2 text-xs font-medium text-[#1A1A1A] transition-colors duration-200 hover:border-[#1E352F] hover:bg-[#EFECE6] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
                  >
                    <Eye className="h-3.5 w-3.5 stroke-[1.5]" aria-hidden="true" />
                    <span>Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(product)}
                    className="inline-flex min-h-[40px] items-center justify-center gap-1.5 border border-[#1E352F] bg-[#1E352F] px-3 py-2 text-xs font-medium text-[#F7F4EF] transition-colors duration-200 hover:bg-[#152722] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="h-3.5 w-3.5 stroke-[2]" aria-hidden="true" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5 stroke-[1.75]" aria-hidden="true" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}