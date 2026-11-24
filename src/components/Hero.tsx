import { ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="border-b border-[#E2DDD4] bg-[#F7F4EF]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-20">
        {/* Left Column: Editorial Headline & Single Dominant CTA */}
        <div className="animate-fade-up flex flex-col justify-between lg:col-span-7 lg:py-4">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs tracking-[0.14em] text-[#5B574F] uppercase">
              <span>Autumn / Winter Capsule</span>
              <span aria-hidden="true">·</span>
              <span>Newcastle upon Tyne</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-[#7A2E3A]">Up to 20% Off Curated Sets</span>
            </div>

            <h1 className="font-editorial text-[clamp(2.5rem,4.5vw,4.15rem)] leading-[1.05] font-normal tracking-[-0.01em] text-[#1A1A1A] [text-wrap:balance]">
              Quiet tailoring for the northern winter.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-[#4A463F]">
              Eight considered essentials and coordinated sets designed in our
              Newcastle studio—uniting crisp organza tailoring, heavyweight organic
              denim, supple calfskin leather, and lofty merino wool built for North
              Sea air.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#collection"
              className="inline-flex min-h-[46px] items-center gap-3 bg-[#1E352F] px-7 py-3 text-xs font-medium tracking-[0.12em] text-[#F7F4EF] uppercase transition-colors duration-200 hover:bg-[#152722] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
            >
              <span>Explore Collection</span>
              <ArrowDown className="h-3.5 w-3.5 stroke-[1.75]" aria-hidden="true" />
            </a>

            <span className="text-xs text-[#5B574F]">
              8-Piece Seasonal Edit · Code{' '}
              <strong className="font-medium text-[#1E352F]">KOVA15</strong> for 15% off
            </span>
          </div>
        </div>

        {/* Right Column: Vertical Studio Video Showcase */}
        <div
          className="animate-fade-up flex justify-center lg:col-span-5 lg:justify-end"
          style={{ animationDelay: '120ms' }}
        >
          <div className="relative aspect-[9/16] max-h-[540px] w-full max-w-[304px] overflow-hidden rounded-2xl border border-[#E2DDD4] bg-[#EFECE6] shadow-md">
            <video
              src="./images/Woman_holding_clutch_in_studio_36a621c8_1080p.mp4"
              poster="./images/Dress-2.jpg"
              autoPlay
              loop
              muted
              playsInline
              aria-label="KOVA studio lookbook preview featuring the Autumn/Winter Capsule"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}