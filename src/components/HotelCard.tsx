import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

interface Hotel {
  name: string;
  price: string;
  rating: number;
  description: string;
}

const HotelCard = ({ hotel, index }: { hotel: Hotel; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.15, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
    className="group rounded-2xl p-2 bg-card shadow-card hover:shadow-card-hover hover:-translate-y-px transition-all duration-150"
  >
    <div className="aspect-video rounded-lg bg-muted overflow-hidden flex items-center justify-center">
      <span className="text-4xl">🏨</span>
    </div>
    <div className="p-3 space-y-1.5">
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold text-card-foreground text-sm leading-tight">{hotel.name}</h3>
        <span className="flex items-center gap-0.5 text-xs text-muted-foreground tabular-nums shrink-0">
          <Star className="h-3 w-3 fill-current text-amber-500" />
          {hotel.rating}
        </span>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{hotel.description}</p>
      <p className="text-sm font-medium text-card-foreground tabular-nums">{hotel.price}</p>
      <button
        onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(hotel.name + " hotel booking")}`, "_blank")}
        className="mt-2 w-full py-2 text-xs font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center justify-center gap-1.5"
      >
        View Details
        <ExternalLink className="h-3 w-3" />
      </button>
    </div>
  </motion.div>
);

export default HotelCard;
export type { Hotel };
