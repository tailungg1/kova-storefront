import { Leaf, Scissors, ShieldCheck } from 'lucide-react';

const BRAND_PILLARS = [
  {
    number: '01.',
    title: 'Traceable Natural Fibres',
    description:
      'Responsible extra-fine merino wool, 13.5–14 oz organic cotton denim, and vegetable-tanned full-grain Italian lambskin.',
    icon: Leaf,
  },
  {
    number: '02.',
    title: 'Small-Batch Precision',
    description:
      'Low-waste seasonal capsule runs patterned in-house to eliminate overproduction while refining every seam and pleat.',
    icon: Scissors,
  },
  {
    number: '03.',
    title: 'Built for Longevity',
    description:
      'Timeless architectural silhouettes designed to endure northern winters, backed by complimentary minor studio repairs.',
    icon: ShieldCheck,
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-16 border-b border-[#E2DDD4] bg-[#EFECE6]"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-8 border-b border-[#E2DDD4] pb-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs tracking-[0.14em] text-[#5B574F] uppercase">
              Brand Story & Craftsmanship · Newcastle upon Tyne
            </p>
            <h2 className="font-editorial mt-3 text-3xl font-normal leading-tight text-[#1A1A1A] sm:text-4xl [text-wrap:balance]">
              Tailored for North Sea weather and quiet endurance.
            </h2>
          </div>

          <div className="space-y-4 text-base leading-relaxed text-[#3D3A34] lg:col-span-7">
            <p>
              Founded in Newcastle upon Tyne by designers shaped by North Sea
              coastal weather and enduring architectural tailoring, KOVA builds
              concise seasonal editions meant to outlast passing trends.
            </p>
            <p className="text-sm text-[#5B574F]">
              From our Grey Street studio, every fabric weight, collar angle, and
              winter layer is tested against brisk coastal wind and rain—balancing
              unhurried proportions with practical warmth.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {BRAND_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                style={{ animationDelay: `${index * 80}ms` }}
                className="animate-fade-up border border-[#E2DDD4] bg-[#F7F4EF] p-6 sm:p-7"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-[#E2DDD4] bg-[#EFECE6] text-[#1E352F]">
                  <Icon className="h-4 w-4 stroke-[1.6]" aria-hidden="true" />
                </div>

                <h3 className="text-xs font-semibold tracking-[0.12em] text-[#1A1A1A] uppercase">
                  {pillar.number} {pillar.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-[#5B574F]">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}