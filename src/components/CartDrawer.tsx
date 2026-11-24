import { FormEvent, useEffect, useState } from 'react';
import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from 'lucide-react';
import { CartItem, Product, ProductSize } from '../types';
import { formatGbp, getEffectivePrice } from '../data/products';
import { ProductImage } from './ProductImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  products: Product[];
  appliedPromoCode: string | null;
  onApplyPromoCode: (code: string) => boolean;
  onRemovePromoCode: () => void;
  onClose: () => void;
  onUpdateQuantity: (productId: string, size: ProductSize, delta: number) => void;
  onRemoveItem: (productId: string, size: ProductSize) => void;
}

export function CartDrawer({
  isOpen,
  items,
  products,
  appliedPromoCode,
  onApplyPromoCode,
  onRemovePromoCode,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  const resolvedItems = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((entry): entry is CartItem & { product: Product } => entry !== null);

  const subtotal = resolvedItems.reduce(
    (sum, item) => sum + getEffectivePrice(item.product) * item.quantity,
    0
  );

  const discountRate = appliedPromoCode === 'KOVA15' ? 0.15 : 0;
  const discountAmount = subtotal * discountRate;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const totalItems = resolvedItems.reduce((sum, item) => sum + item.quantity, 0);

  const handlePromoSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = promoInput.trim();
    if (!cleaned) {
      setPromoError('Enter a promo code (try KOVA15).');
      return;
    }
    const accepted = onApplyPromoCode(cleaned);
    if (accepted) {
      setPromoInput('');
      setPromoError('');
    } else {
      setPromoError('Code not recognised. Enter KOVA15 for 15% off.');
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A1A1A]/45 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-[#E2DDD4] bg-[#F7F4EF] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-16 items-center justify-between border-b border-[#E2DDD4] px-6">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-4 w-4 stroke-[1.75] text-[#1E352F]" aria-hidden="true" />
            <h2 className="text-sm font-medium tracking-[0.12em] text-[#1A1A1A] uppercase">
              Shopping Bag{' '}
              <span className="text-[#5B574F] tabular-nums">({totalItems})</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center text-[#1A1A1A] transition-colors hover:bg-[#EFECE6] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
          >
            <X className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {resolvedItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <ShoppingBag
                className="mb-4 h-7 w-7 stroke-[1.25] text-[#7A756B]"
                aria-hidden="true"
              />
              <p className="font-editorial text-2xl text-[#1A1A1A]">
                Your bag is currently empty.
              </p>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#5B574F]">
                Explore the Autumn/Winter capsule to add apparel, accessories, or
                curated seasonal sets.
              </p>
              <a
                href="#collection"
                onClick={onClose}
                className="mt-6 inline-flex min-h-[42px] items-center border border-[#1E352F] bg-[#1E352F] px-6 py-2.5 text-xs font-medium tracking-[0.12em] text-[#F7F4EF] uppercase transition-colors hover:bg-[#152722]"
              >
                Browse Collection
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-[#E2DDD4]">
              {resolvedItems.map(({ product, size, quantity }) => {
                const effectiveUnit = getEffectivePrice(product);
                const hasSale = typeof product.salePriceGbp === 'number';

                return (
                  <li
                    key={`${product.id}-${size}`}
                    className="flex gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <div className="h-28 w-22 shrink-0 overflow-hidden border border-[#E2DDD4] bg-[#EFECE6]">
                      <ProductImage
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        title={product.title}
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-medium leading-snug text-[#1A1A1A]">
                            {product.title}
                          </h3>
                          <div className="text-right shrink-0 tabular-nums">
                            <span
                              className={`block text-sm font-medium ${
                                hasSale ? 'text-[#7A2E3A]' : 'text-[#1A1A1A]'
                              }`}
                            >
                              {formatGbp(effectiveUnit * quantity)}
                            </span>
                            {hasSale && (
                              <span className="block text-[11px] text-[#8E897F] line-through">
                                {formatGbp(product.priceGbp * quantity)}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="mt-1 text-xs text-[#5B574F]">
                          {product.colorName} · Size {size}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity Stepper */}
                        <div className="inline-flex items-center border border-[#E2DDD4] bg-[#EFECE6]/50">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, size, -1)}
                            aria-label={`Decrease quantity of ${product.title}`}
                            className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center text-[#1A1A1A] transition-colors hover:bg-[#EFECE6] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1E352F]"
                          >
                            <Minus className="h-3 w-3 stroke-[1.75]" aria-hidden="true" />
                          </button>
                          <span className="min-w-[32px] text-center text-xs font-medium text-[#1A1A1A] tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, size, 1)}
                            aria-label={`Increase quantity of ${product.title}`}
                            className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center text-[#1A1A1A] transition-colors hover:bg-[#EFECE6] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1E352F]"
                          >
                            <Plus className="h-3 w-3 stroke-[1.75]" aria-hidden="true" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id, size)}
                          aria-label={`Remove ${product.title} size ${size} from bag`}
                          className="inline-flex min-h-[36px] items-center gap-1 px-2 text-xs text-[#5B574F] transition-colors hover:text-[#7A2E3A] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
                        >
                          <Trash2 className="h-3.5 w-3.5 stroke-[1.5]" aria-hidden="true" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Drawer Footer with Interactive Promo Code */}
        <div className="border-t border-[#E2DDD4] bg-[#EFECE6]/70 p-6">
          {/* Promo Code Input */}
          <div className="mb-5 border-b border-[#E2DDD4] pb-5">
            <label
              htmlFor="bag-promo-code"
              className="block text-[11px] font-medium tracking-[0.12em] text-[#5B574F] uppercase"
            >
              Promo Code
            </label>

            {appliedPromoCode ? (
              <div className="mt-2.5 flex items-center justify-between border border-[#1E352F]/25 bg-[#F7F4EF] px-3 py-2">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-[#1E352F]">
                  <Tag className="h-3.5 w-3.5 stroke-[1.75]" aria-hidden="true" />
                  <span>{appliedPromoCode} -15%</span>
                </span>
                <button
                  type="button"
                  onClick={onRemovePromoCode}
                  aria-label="Remove promo code"
                  className="inline-flex min-h-[28px] min-w-[28px] items-center justify-center text-[#5B574F] transition-colors hover:text-[#7A2E3A] cursor-pointer"
                >
                  <X className="h-3.5 w-3.5 stroke-[1.75]" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <form onSubmit={handlePromoSubmit} className="mt-2 flex gap-2">
                <input
                  id="bag-promo-code"
                  type="text"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value);
                    if (promoError) setPromoError('');
                  }}
                  placeholder="Enter code (e.g. KOVA15)"
                  className="min-h-[40px] flex-1 border border-[#D4CFC5] bg-[#F7F4EF] px-3 py-2 text-xs text-[#1A1A1A] uppercase placeholder:normal-case placeholder:text-[#8E897F] focus:border-[#1E352F] focus:outline-none"
                />
                <button
                  type="submit"
                  className="min-h-[40px] border border-[#1E352F] bg-[#1E352F] px-4 py-2 text-xs font-medium tracking-wider text-[#F7F4EF] uppercase transition-colors hover:bg-[#152722] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
                >
                  Apply
                </button>
              </form>
            )}

            {promoError && (
              <p role="alert" className="mt-2 text-xs text-[#7A2E3A]">
                {promoError}
              </p>
            )}
          </div>

          {/* Totals Summary */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5B574F]">Subtotal</span>
              <span className="font-medium text-[#1A1A1A] tabular-nums">
                {formatGbp(subtotal)}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex items-center justify-between text-xs font-medium text-[#1E352F]">
                <span>Promo Savings ({appliedPromoCode} · 15%)</span>
                <span className="tabular-nums">-{formatGbp(discountAmount)}</span>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-[#E2DDD4] pt-2.5 text-sm">
              <span className="font-medium text-[#1A1A1A]">Estimated Total</span>
              <span className="text-base font-semibold text-[#1A1A1A] tabular-nums">
                {formatGbp(finalTotal)}
              </span>
            </div>
          </div>

          <p className="mt-4 border border-[#E2DDD4] bg-[#F7F4EF] px-3.5 py-2.5 text-center text-xs text-[#5B574F] italic">
            Demo Storefront — Checkout disabled for preview.
          </p>
        </div>
      </aside>
    </div>
  );
}