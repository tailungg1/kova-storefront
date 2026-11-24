import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { label: 'Collection', href: '#collection' },
  { label: 'About', href: '#about' },
  { label: 'Customer Feedback', href: '#feedback' },
  { label: 'Contact', href: '#contact' },
];

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2DDD4] bg-[#F7F4EF]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-5 sm:px-8 lg:px-10">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="font-editorial text-2xl font-medium tracking-[0.18em] text-[#1A1A1A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E352F]"
        >
          KOVA
        </a>

        {/* Zone 2: Single-line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 lg:gap-9"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-sm text-[#5B574F] transition-colors duration-200 hover:text-[#1E352F] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#1E352F] after:transition-all after:duration-200 hover:after:w-full whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E352F]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Cart Action + Mobile Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            className="inline-flex min-h-[40px] items-center gap-2 border border-[#1E352F] bg-[#1E352F] px-4 py-2 text-xs font-medium tracking-wide text-[#F7F4EF] transition-colors duration-200 hover:bg-[#152722] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
          >
            <ShoppingBag className="h-3.5 w-3.5 stroke-[1.75]" aria-hidden="true" />
            <span>Bag</span>
            <span className="tabular-nums">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-[#E2DDD4] text-[#1A1A1A] transition-colors duration-200 hover:bg-[#EFECE6] md:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-[#E2DDD4] bg-[#F7F4EF] px-5 py-4 md:hidden"
        >
          <ul className="flex flex-col divide-y divide-[#E2DDD4]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[44px] items-center text-sm text-[#1A1A1A] transition-colors hover:text-[#1E352F]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}