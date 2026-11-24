import { FormEvent, useState } from 'react';
import { Check, Star } from 'lucide-react';
import { CustomerReview, Product } from '../types';

interface FeedbackSectionProps {
  products: Product[];
  reviews: CustomerReview[];
  onAddReview: (review: Omit<CustomerReview, 'id' | 'date' | 'verified'>) => void;
}

export function FeedbackSection({
  products,
  reviews,
  onAddReview,
}: FeedbackSectionProps) {
  const [name, setName] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id ?? '');
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedComment = comment.trim();
    const product = products.find((p) => p.id === selectedProductId);

    if (!trimmedName || !trimmedComment || !product) {
      setErrorMessage('Please enter your name, select a product, and share your thoughts.');
      return;
    }

    onAddReview({
      name: trimmedName,
      productId: product.id,
      productTitle: product.title,
      rating,
      comment: trimmedComment,
    });

    setName('');
    setComment('');
    setRating(5);
    setErrorMessage('');
    setSubmittedNotice(true);

    window.setTimeout(() => {
      setSubmittedNotice(false);
    }, 4000);
  };

  const activeStars = hoveredRating ?? rating;

  return (
    <section
      id="feedback"
      className="scroll-mt-16 border-b border-[#E2DDD4] bg-[#F7F4EF]"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mb-10 border-b border-[#E2DDD4] pb-6">
          <p className="text-xs tracking-[0.14em] text-[#5B574F] uppercase">
            Client Notes
          </p>
          <h2 className="font-editorial mt-2 text-3xl font-normal tracking-[-0.01em] text-[#1A1A1A] sm:text-4xl">
            Customer Feedback & Reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left: Verified Reviews List */}
          <div className="space-y-6 lg:col-span-7">
            <div className="flex items-center justify-between text-xs text-[#5B574F]">
              <span>Showing verified & community reviews</span>
              <span className="tabular-nums">{reviews.length} total</span>
            </div>

            <div className="divide-y divide-[#E2DDD4] border-t border-b border-[#E2DDD4]">
              {reviews.map((review) => (
                <article key={review.id} className="py-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <Star
                          key={starValue}
                          className={`h-3.5 w-3.5 ${
                            starValue <= review.rating
                              ? 'fill-[#1E352F] text-[#1E352F]'
                              : 'text-[#D4CFC5]'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <span className="text-xs text-[#5B574F]">{review.date}</span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-[#2C2A26]">
                    &ldquo;{review.comment}&rdquo;
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#5B574F]">
                    <span className="font-medium text-[#1A1A1A]">{review.name}</span>
                    <span aria-hidden="true">·</span>
                    <span>{review.productTitle}</span>
                    {review.verified && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#1E352F]">Verified Buyer</span>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right: Interactive Review Form */}
          <div className="lg:col-span-5">
            <form
              onSubmit={handleSubmit}
              className="border border-[#E2DDD4] bg-[#EFECE6] p-6 sm:p-8"
              noValidate
            >
              <h3 className="font-editorial text-2xl font-normal text-[#1A1A1A]">
                Leave Your Feedback
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5B574F]">
                Share your experience with fit, finish, or fabric on any piece or set
                from the current capsule.
              </p>

              <div className="mt-6 space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="review-name"
                    className="block text-xs font-medium tracking-wider text-[#1A1A1A] uppercase"
                  >
                    Name
                  </label>
                  <input
                    id="review-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor Grant"
                    className="mt-2 block min-h-[42px] w-full border border-[#D4CFC5] bg-[#F7F4EF] px-3.5 py-2 text-sm text-[#1A1A1A] placeholder:text-[#8E897F] focus:border-[#1E352F] focus:outline-none"
                  />
                </div>

                {/* Product Purchased */}
                <div>
                  <label
                    htmlFor="review-product"
                    className="block text-xs font-medium tracking-wider text-[#1A1A1A] uppercase"
                  >
                    Product Purchased
                  </label>
                  <select
                    id="review-product"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="mt-2 block min-h-[42px] w-full border border-[#D4CFC5] bg-[#F7F4EF] px-3.5 py-2 text-sm text-[#1A1A1A] focus:border-[#1E352F] focus:outline-none"
                  >
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Star Rating Selector */}
                <div>
                  <span className="block text-xs font-medium tracking-wider text-[#1A1A1A] uppercase">
                    Star Rating
                  </span>
                  <div
                    className="mt-2 flex items-center gap-1.5"
                    role="radiogroup"
                    aria-label="Star rating"
                    onMouseLeave={() => setHoveredRating(null)}
                  >
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      const isFilled = starValue <= activeStars;
                      return (
                        <button
                          key={starValue}
                          type="button"
                          role="radio"
                          aria-checked={rating === starValue}
                          aria-label={`${starValue} ${starValue === 1 ? 'star' : 'stars'}`}
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoveredRating(starValue)}
                          className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center border border-[#E2DDD4] bg-[#F7F4EF] transition-colors hover:border-[#1E352F] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
                        >
                          <Star
                            className={`h-4 w-4 transition-colors ${
                              isFilled
                                ? 'fill-[#1E352F] text-[#1E352F]'
                                : 'text-[#B8B3A9]'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      );
                    })}
                    <span className="ml-2 text-xs text-[#5B574F] tabular-nums">
                      {rating} / 5
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label
                    htmlFor="review-comment"
                    className="block text-xs font-medium tracking-wider text-[#1A1A1A] uppercase"
                  >
                    Comment
                  </label>
                  <textarea
                    id="review-comment"
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comment on sizing, drape, material warmth, or construction..."
                    className="mt-2 block w-full resize-y border border-[#D4CFC5] bg-[#F7F4EF] px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#8E897F] focus:border-[#1E352F] focus:outline-none"
                  />
                </div>

                {errorMessage && (
                  <p role="alert" className="text-xs text-[#7A2E3A]">
                    {errorMessage}
                  </p>
                )}

                {submittedNotice && (
                  <div
                    role="status"
                    className="flex items-center gap-2 border border-[#1E352F]/25 bg-[#F7F4EF] px-3.5 py-2.5 text-xs text-[#1E352F]"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 stroke-[2]" aria-hidden="true" />
                    <span>Thank you — your review has been published.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="flex min-h-[44px] w-full items-center justify-center bg-[#1E352F] px-6 py-3 text-xs font-medium tracking-[0.12em] text-[#F7F4EF] uppercase transition-colors duration-200 hover:bg-[#152722] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352F]"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}