import { useCallback, useState } from 'react';
import { Check } from 'lucide-react';
import { AboutSection } from './components/AboutSection';
import { AnnouncementBar } from './components/AnnouncementBar';
import { CartDrawer } from './components/CartDrawer';
import { CollectionSection } from './components/CollectionSection';
import { FeedbackSection } from './components/FeedbackSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductDetailModal } from './components/ProductDetailModal';
import { INITIAL_REVIEWS, PRODUCTS } from './data/products';
import {
  CartItem,
  CategoryFilter,
  CustomerReview,
  Product,
  ProductSize,
} from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedJustNow, setCopiedJustNow] = useState(false);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3000);
  }, []);

  const handleAddToCart = useCallback((product: Product, size: ProductSize) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === size
      );
      if (existingIndex >= 0) {
        return prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId: product.id, size, quantity: 1 }];
    });
  }, []);

  const handleUpdateQuantity = useCallback(
    (productId: string, size: ProductSize, delta: number) => {
      setCartItems((prev) =>
        prev
          .map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, quantity: item.quantity + delta }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    },
    []
  );

  const handleRemoveItem = useCallback((productId: string, size: ProductSize) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );
  }, []);

  const handleApplyPromoCode = useCallback((rawCode: string): boolean => {
    const normalized = rawCode.trim().toUpperCase();
    if (normalized === 'KOVA15') {
      setAppliedPromoCode('KOVA15');
      return true;
    }
    return false;
  }, []);

  const handleRemovePromoCode = useCallback(() => {
    setAppliedPromoCode(null);
  }, []);

  const handleAddReview = useCallback(
    (newReview: Omit<CustomerReview, 'id' | 'date' | 'verified'>) => {
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date());

      const reviewEntry: CustomerReview = {
        ...newReview,
        id: `rev-${Date.now()}`,
        date: formattedDate,
        verified: false,
      };

      setReviews((prev) => [reviewEntry, ...prev]);
    },
    []
  );

  const handleCopyStoreLink = useCallback(async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setCopiedJustNow(true);
    showToast('Store link copied!');
    window.setTimeout(() => {
      setCopiedJustNow(false);
    }, 2500);
  }, [showToast]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#1A1A1A]">
      <AnnouncementBar />
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        <Hero />

        <CollectionSection
          products={PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onQuickView={setSelectedProduct}
          onAddToCart={handleAddToCart}
        />

        <AboutSection />

        <FeedbackSection
          products={PRODUCTS}
          reviews={reviews}
          onAddReview={handleAddReview}
        />
      </main>

      <Footer
        onCopyStoreLink={handleCopyStoreLink}
        copiedJustNow={copiedJustNow}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        products={PRODUCTS}
        appliedPromoCode={appliedPromoCode}
        onApplyPromoCode={handleApplyPromoCode}
        onRemovePromoCode={handleRemovePromoCode}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 bottom-5 z-50 flex items-center gap-2.5 border border-[#1E352F] bg-[#1E352F] px-4 py-3 text-xs font-medium tracking-wide text-[#F7F4EF] shadow-lg"
        >
          <Check className="h-3.5 w-3.5 stroke-[2]" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}