import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Wallet, Trash2, ChevronRight } from "lucide-react";
import type { TripData } from "../components/TripResults";
import TripResults from "../components/TripResults";
import { useNavigate } from "react-router-dom";

const SAVED_TRIPS_KEY = "nomadai_trips";

const MyTrips = () => {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setTrips(JSON.parse(localStorage.getItem(SAVED_TRIPS_KEY) || "[]"));
    } catch {
      setTrips([]);
    }
  }, []);

  const handleDelete = (index: number) => {
    const updated = trips.filter((_, i) => i !== index);
    setTrips(updated);
    localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(updated));
  };

  if (selectedTrip) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <TripResults trip={selectedTrip} onBack={() => setSelectedTrip(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <header className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Trips</h1>
        <p className="text-muted-foreground leading-relaxed">
          {trips.length === 0
            ? "No trips planned yet. Start by defining your destination."
            : `${trips.length} saved ${trips.length === 1 ? "trip" : "trips"}`}
        </p>
      </header>

      {trips.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-5xl mb-4">🗺️</div>
          <p className="text-muted-foreground mb-4">Your saved trips will appear here.</p>
          <button
            onClick={() => navigate("/")}
            className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all"
          >
            Plan a Trip
          </button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {trips.map((trip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl p-4 bg-card shadow-card hover:shadow-card-hover hover:-translate-y-px transition-all duration-150 cursor-pointer flex items-center justify-between gap-4"
              onClick={() => setSelectedTrip(trip)}
            >
              <div className="space-y-1.5 min-w-0">
                <h3 className="font-semibold text-card-foreground tracking-tight truncate">
                  {trip.tripName}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {trip.destination}
                  </span>
                  <span className="flex items-center gap-1 tabular-nums">
                    <Calendar className="h-3 w-3" /> {trip.days} days
                  </span>
                  <span className="flex items-center gap-1 capitalize">
                    <Wallet className="h-3 w-3" /> {trip.budget}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(i);
                  }}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
