import { motion } from "framer-motion";
import { Save, ArrowLeft, MapPin, Calendar, Wallet, Users } from "lucide-react";
import HotelCard from "./HotelCard";
import ItineraryCard from "./ItineraryCard";
import type { Hotel } from "./HotelCard";
import type { ItineraryDay } from "./ItineraryCard";

interface TripData {
  tripName: string;
  destination: string;
  days: number;
  budget: string;
  partner: string;
  hotels: Hotel[];
  itinerary: ItineraryDay[];
}

interface TripResultsProps {
  trip: TripData;
  onBack: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}

const TripResults = ({ trip, onBack, onSave, isSaved }: TripResultsProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="space-y-8"
  >
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="space-y-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to planner
        </button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{trip.tripName}</h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 bg-secondary px-2.5 py-1 rounded-md">
            <MapPin className="h-3 w-3" /> {trip.destination}
          </span>
          <span className="flex items-center gap-1 bg-secondary px-2.5 py-1 rounded-md tabular-nums">
            <Calendar className="h-3 w-3" /> {trip.days} days
          </span>
          <span className="flex items-center gap-1 bg-secondary px-2.5 py-1 rounded-md capitalize">
            <Wallet className="h-3 w-3" /> {trip.budget}
          </span>
          <span className="flex items-center gap-1 bg-secondary px-2.5 py-1 rounded-md capitalize">
            <Users className="h-3 w-3" /> {trip.partner}
          </span>
        </div>
      </div>

      {onSave && (
        <button
          onClick={onSave}
          disabled={isSaved}
          className="shrink-0 h-10 px-5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isSaved ? "Saved" : "Save Trip"}
        </button>
      )}
    </div>

    {/* Hotels */}
    {trip.hotels.length > 0 && (
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Recommended Hotels
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trip.hotels.map((hotel, i) => (
            <HotelCard key={i} hotel={hotel} index={i} />
          ))}
        </div>
      </section>
    )}

    {/* Itinerary */}
    <section className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Day-by-Day Itinerary
      </h2>
      <div className="space-y-4">
        {trip.itinerary.map((day, i) => (
          <ItineraryCard key={day.day} dayData={day} index={i} />
        ))}
      </div>
    </section>
  </motion.div>
);

export default TripResults;
export type { TripData };
