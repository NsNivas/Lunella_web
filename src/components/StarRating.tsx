import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showNumber?: boolean;
  reviewCount?: number;
}

export default function StarRating({ rating, size = 14, showNumber = false, reviewCount }: StarRatingProps) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full;
          const half = i === full && hasHalf;
          return (
            <Star
              key={i}
              size={size}
              className={filled || half ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
            />
          );
        })}
      </div>
      {showNumber && (
        <span className="text-sm font-semibold text-charcoal">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-deep-mauve">({reviewCount})</span>
      )}
    </div>
  );
}
