import { Bookmark, Check, Instagram, Share2, Twitter, Video } from 'lucide-react';

interface FooterProps {
  onCopyStoreLink: () => void;
  copiedJustNow: boolean;
}

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: Instagram,
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com',
    icon: Video,
  },
  {
    name: 'Pinterest',
    href: 'https://pinterest.com',
    icon: Bookmark,
  },
  {
    name: 'X / Twitter',
    href: 'https://x.com',
    icon: Twitter,
  },
];

export function Footer({ onCopyStoreLink, copiedJustNow }: FooterProps) {
  return (
    <footer id="contact" className="scroll-mt-16 bg-[#EFECE6]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 border-b border-[#E2DDD4] pb-12 md:grid-cols-12">
          {/* Brand & Newcastle Studio Contact */}
          <div className="space-y-4 md:col-span-5">
            <span className="font-editorial block text-2xl font-medium tracking-[0.18em] text-[#1A1A1A]">
              KOVA
            </span>
            <p className="max-w-sm text-sm leading-relaxed text-[#5B574F]">
              Contemporary womenswear, menswear sets, and winter accessories, designed
              in Newcastle upon Tyne.
            </p>
            <address className="not-italic text-xs leading-relaxed text-[#5B574F]">
              14 Grey Street, Newcastle upon Tyne, NE1 6EE, United Kingdom
              <br />
              studio@kova-atelier.co.uk · +44 (0)191 498 0142
            </address>
          </div>

          {/* Navigation Anchors */}
          <div className="space-y-3 md:col-span-3">
            <h3 className="text-xs font-medium tracking-[0.12em] text-[#1A1A1A] uppercase">
              Storefront
            </h3>
            <ul className="space-y-2.5 text-sm text-[#5B574F]">
              <li>
                <a
                  href="#collection"
                  className="transition-colors hover:text-[#1E352F]"
                >
                  Collection
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-[#1E352F]">
                  About Studio
                </a>
              </li>
              <li>
                <a
                  href="#feedback"
                  className="transition-colors hover:text-[#1E352F]"
                >
                  Customer Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Share Store */}
          <div className="space-y-4 md:col-span-4">
            <h3 className="text-xs font-medium tracking-[0.12em] text-[#1A1A1A] uppercase">
              Connect & Share
            </h3>

            <div className="flex flex-wrap items-center gap-2.5">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`KOVA on ${item.name}`}
                    title={item.name}
                    className="inline-flex min-h-[42px] items-center gap-2 border border-[#D4CFC5] bg-[#F7F4EF] px-3.5 py-2 text-xs text-[#1A1A1A] transition-colors duration-200 hover:border-[#1E352F] hover:text-[#1E352F] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
                  >
                    <Icon className="h-3.5 w-3.5 stroke-[1.5]" aria-hidden="true" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>

            <div>
              <button
                type="button"
                onClick={onCopyStoreLink}
                className="inline-flex min-h-[42px] items-center gap-2 border border-[#1E352F] bg-transparent px-4 py-2 text-xs font-medium tracking-[0.08em] text-[#1E352F] uppercase transition-colors duration-200 hover:bg-[#1E352F] hover:text-[#F7F4EF] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
              >
                {copiedJustNow ? (
                  <>
                    <Check className="h-3.5 w-3.5 stroke-[2]" aria-hidden="true" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5 stroke-[1.5]" aria-hidden="true" />
                    <span>Share Store</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-8 text-xs text-[#7A756B] sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} KOVA Atelier, Newcastle upon Tyne.</span>
          <span>Autumn / Winter Capsule · GBP (£)</span>
        </div>
      </div>
    </footer>
  );
}