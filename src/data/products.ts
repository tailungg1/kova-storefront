import { CustomerReview, Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'sheer-yoke-collared-mini-dress',
    title: 'Sheer Yoke Collared Mini Dress',
    subtitle: 'Tailored black crêpe with sheer organza yoke',
    category: 'Apparel',
    priceGbp: 125.0,
    salePriceGbp: 99.0,
    discountLabel: '-20%',
    imageSrc: './images/Dress-2.jpg',
    imageAlt:
      'Black tailored short-sleeve A-line mini dress with sheer mesh shoulder yoke, structured shirt collar, and keyhole neckline',
    colorName: 'Jet Black',
    sizes: ['S', 'M', 'L'],
    description:
      'Cut in a clean A-line silhouette, this short-sleeve black mini dress pairs a matte structured bodice with a delicate sheer organza yoke across the shoulders. Finished with a sharp pointed shirt collar, subtle front keyhole fastening, sweetheart bodice line, and neat cuffed sleeves for evening or day-to-night dressing.',
    material:
      '72% Viscose, 23% Polyamide, 5% Elastane; Contrast Yoke: 100% Silk-Blend Sheer Organza',
    care: 'Dry clean recommended, or gentle cold hand wash inside out. Do not tumble dry; steam lightly on reverse.',
  },
  {
    id: 'light-wash-straight-denim',
    title: 'Light-Wash Straight Denim',
    subtitle: 'Vintage ice-blue organic cotton, straight leg',
    category: 'Apparel',
    priceGbp: 85.0,
    imageSrc: './images/Jeans.jpg',
    imageAlt:
      'Light-wash ice-blue straight-leg five-pocket denim jeans with pale contrast stitching',
    colorName: 'Pale Ice Blue',
    sizes: ['S', 'M', 'L'],
    description:
      'Crafted from substantial non-stretch organic cotton denim in a softly faded pale ice-blue wash. Designed with a classic mid-rise waist, five-pocket construction, subtle tonal topstitching, brushed metal rivets, and an easy straight-leg cut that drapes cleanly over minimalist footwear.',
    material: '100% Organic Cotton Non-Stretch Denim (13.5 oz)',
    care: 'Machine wash cold inside out with similar colours. Reshape while damp and line dry away from direct heat.',
  },
  {
    id: 'supple-nappa-leather-gloves',
    title: 'Supple Nappa Leather Gloves',
    subtitle: 'Full-grain black lambskin with cashmere lining',
    category: 'Accessories',
    priceGbp: 65.0,
    imageSrc: './images/Leather_gloves.jpg',
    imageAlt:
      'Smooth jet-black full-grain leather dress gloves with fine tonal wrist stitching',
    colorName: 'Deep Black',
    sizes: ['S', 'M', 'L'],
    description:
      'Tailored from butter-soft, full-grain black lambskin with a subtle natural satin sheen. Contoured finger seams and tonal fine-gauge wrist stitching deliver a refined close fit, lined in brushed cashmere for warmth through northern winters.',
    material:
      'Outer: 100% Italian Nappa Lambskin Leather; Lining: 100% Fine-Gauge Cashmere',
    care: 'Specialist leather clean only. Wipe dry with a soft cloth if damp and store flat away from direct heat.',
  },
  {
    id: 'ribbed-merino-fringe-scarf',
    title: 'Ribbed Merino Fringe Scarf',
    subtitle: 'Deep midnight navy fisherman rib with twisted fringe',
    category: 'Accessories',
    priceGbp: 48.0,
    salePriceGbp: 38.0,
    discountLabel: '-20%',
    imageSrc: './images/Scarf.jpg',
    imageAlt:
      'Chunky deep midnight-navy ribbed knit wool scarf with generous twisted fringe tassels at both ends',
    colorName: 'Midnight Navy',
    sizes: ['One Size'],
    description:
      'Knitted in a tactile, lofty fisherman rib stitch from extra-fine merino wool in a rich midnight navy hue. Generously proportioned for effortless wrapping against cold coastal winds, finished with hand-knotted twisted fringe tassels along both hems.',
    material: '100% Extra-Fine Responsible Merino Wool (5-gauge chunky rib)',
    care: 'Hand wash cold with mild wool detergent. Gently press out excess water in a towel and dry flat.',
  },
  {
    id: 'heritage-tailored-set',
    title: 'The Heritage Tailored Set',
    subtitle: 'Espresso leather blouson, Oxford shirt, burgundy tie & ecru trousers',
    category: 'Curated Sets',
    priceGbp: 310.0,
    salePriceGbp: 248.0,
    discountLabel: '-20% Set Deal',
    imageSrc: './images/manequimgravatavermelha.jpg',
    imageAlt:
      'Curated menswear-inspired outfit with cropped dark espresso leather zip blouson, cream shirt, deep burgundy tie, oxblood belt, and wide-leg pleated cream trousers',
    colorName: 'Espresso & Cream',
    sizes: ['S', 'M', 'L'],
    description:
      'A complete four-piece heritage ensemble anchored by a cropped espresso-brown full-grain leather zip blouson. Styled over a crisp ivory brushed-cotton button-down shirt, deep burgundy matte wool-silk tie, oxblood leather belt, and wide-leg front-pleated cream twill trousers with sharp pressed creases.',
    material:
      'Blouson: 100% Full-Grain Calfskin; Shirt: 100% Brushed Organic Cotton; Trousers: 100% Compact Cotton-Wool Twill; Tie: Silk-Wool Blend',
    care: 'Specialist leather clean jacket; machine wash shirt cold; dry clean trousers and tie to maintain crisp pleat structure.',
  },
  {
    id: 'grey-denim-charcoal-stack-set',
    title: 'Grey Denim & Charcoal Stack Set',
    subtitle: 'Dove-grey suede zip jacket, black knit & wide-leg charcoal denim',
    category: 'Curated Sets',
    priceGbp: 290.0,
    salePriceGbp: 232.0,
    discountLabel: '-20% Set Deal',
    imageSrc: './images/jaquetacinza.png',
    imageAlt:
      'Dove-grey brushed suede zip workwear jacket layered over a black knit and paired with wide-leg washed charcoal-black denim jeans',
    colorName: 'Dove Grey & Charcoal',
    sizes: ['S', 'M', 'L'],
    description:
      'Architectural monochrome layering combining a boxy dove-grey brushed suede zip jacket—detailed with twin chest flap pockets and a structured collar—over a fine-gauge jet-black crewneck knit. Grounded by oversized wide-leg washed charcoal denim jeans with subtle vintage fading and clean seam lines.',
    material:
      'Jacket: 100% Brushed Goat Suede; Knit: 100% Extra-Fine Merino Wool; Denim: 14 oz Washed Organic Cotton',
    care: 'Brush suede softly with a suede care brush and protect from heavy rain. Hand wash knit cold; wash denim inside out.',
  },
  {
    id: 'northern-layered-winter-set',
    title: 'Northern Layered Winter Set',
    subtitle: 'Distressed umber leather bomber, claret scarf & wide vintage denim',
    category: 'Curated Sets',
    priceGbp: 340.0,
    salePriceGbp: 272.0,
    discountLabel: '-20% Set Deal',
    imageSrc: './images/cachecolkitfeminino.jpg',
    imageAlt:
      'Distressed dark umber leather bomber jacket paired with a deep burgundy fringed wool scarf, dark leather shoulder bag, and wide-leg faded charcoal denim',
    colorName: 'Dark Umber & Claret',
    sizes: ['S', 'M', 'L'],
    description:
      'Built for brisk coastal mornings, this layered winter set pairs a richly patinaed dark umber leather bomber jacket with a deep claret brushed-wool fringe scarf and an understated chocolate leather shoulder bag. Finished with relaxed, wide-leg charcoal-indigo faded denim that drapes cleanly over winter boots.',
    material:
      'Bomber & Bag: 100% Waxed Pull-Up Cowhide Leather; Scarf: 100% Brushed Lambswool; Jeans: 100% Cotton Vintage-Fade Denim',
    care: 'Condition waxed leather seasonally; dry clean wool scarf; wash denim cold separately.',
  },
  {
    id: 'autumn-weekend-capsule-set',
    title: 'Autumn Weekend Capsule Set',
    subtitle: 'Espresso ribbed knit, lace-trim cami, denim mini, leather boots & bag',
    category: 'Curated Sets',
    priceGbp: 360.0,
    salePriceGbp: 288.0,
    discountLabel: '-20% Set Deal',
    imageSrc: './images/kitfeminino.jpg',
    imageAlt:
      'Coordinated autumn capsule flatlay featuring an espresso oversized knit sweater, ivory lace camisole, indigo denim mini skirt, brown leather belt, crescent buckle bag, knee-high chocolate boots, and gold accessories',
    colorName: 'Espresso & Indigo',
    sizes: ['S', 'M', 'L'],
    description:
      'An effortlessly coordinated weekend wardrobe in warm espresso, ivory, and raw indigo. Includes an oversized ribbed espresso crewneck sweater, delicate ivory lace-trim camisole, dark indigo washed denim mini skirt with an oval-buckle leather belt, crescent buckle shoulder bag, and slouchy knee-high chocolate leather wedge boots.',
    material:
      'Sweater: 80% Merino Wool, 20% Alpaca; Camisole: 100% Modal-Silk; Skirt: 100% Cotton Denim; Bag & Boots: 100% Smooth Calfskin Leather',
    care: 'Hand wash knitwear cold and dry flat; delicate wash camisole; wipe leather boots and bag clean with a dry soft cloth.',
  },
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Clara Henderson',
    productId: 'sheer-yoke-collared-mini-dress',
    productTitle: 'Sheer Yoke Collared Mini Dress',
    rating: 5,
    comment:
      'The sheer organza yoke and crisp collar give this dress such quiet poise. The fabric holds its A-line shape without feeling rigid, and the sleeve cuffs sit cleanly.',
    date: '14 November 2026',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Thomas Reid',
    productId: 'light-wash-straight-denim',
    productTitle: 'Light-Wash Straight Denim',
    rating: 5,
    comment:
      'Authentic heavyweight denim feel straight out of the parcel. The pale wash is clean without artificial distressing, and the straight leg falls well over trainers or boots.',
    date: '06 November 2026',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Maeve Gallagher',
    productId: 'northern-layered-winter-set',
    productTitle: 'Northern Layered Winter Set',
    rating: 5,
    comment:
      'Wore the umber bomber and claret scarf walking along the Tyne last weekend—incredibly warm, and the proportions of the wide-leg denim feel effortless.',
    date: '29 October 2026',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Oliver Bennett',
    productId: 'heritage-tailored-set',
    productTitle: 'The Heritage Tailored Set',
    rating: 5,
    comment:
      'The espresso leather jacket and pleated ecru trousers work together seamlessly, and I have already worn both pieces separately to the office. Exceptional finishing.',
    date: '19 October 2026',
    verified: true,
  },
];

export function getEffectivePrice(product: Product): number {
  return product.salePriceGbp ?? product.priceGbp;
}

export function formatGbp(amount: number): string {
  return `£${amount.toFixed(2)}`;
}