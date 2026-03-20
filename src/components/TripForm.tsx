import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Wallet, Users, ArrowRight } from "lucide-react";

const DESTINATIONS = [
  "Paris, France", "Tokyo, Japan", "New York, USA", "Bali, Indonesia",
  "Rome, Italy", "Barcelona, Spain", "London, UK", "Dubai, UAE",
  "Bangkok, Thailand", "Istanbul, Turkey", "Sydney, Australia",
  "Cape Town, South Africa", "Rio de Janeiro, Brazil", "Marrakech, Morocco",
  "Santorini, Greece", "Kyoto, Japan", "Amsterdam, Netherlands",
  "Reykjavik, Iceland", "Lisbon, Portugal", "Singapore",
  "Maldives", "Swiss Alps, Switzerland", "Machu Picchu, Peru",
  "Cairo, Egypt", "Prague, Czech Republic", "Vienna, Austria",
  "Seoul, South Korea", "Mexico City, Mexico", "Queenstown, New Zealand",
  "Havana, Cuba",
];

const DAYS = Array.from({ length: 14 }, (_, i) => i + 1);

const BUDGETS = [
  { value: "budget", label: "Budget", desc: "Cost-conscious" },
  { value: "moderate", label: "Moderate", desc: "Balanced comfort" },
  { value: "luxury", label: "Luxury", desc: "Premium experience" },
];

const PARTNERS = [
  { value: "solo", label: "Solo", icon: "🧳" },
  { value: "couple", label: "Couple", icon: "💑" },
  { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
  { value: "friends", label: "Friends", icon: "👯" },
];

interface TripFormData {
  destination: string;
  days: number;
  budget: string;
  partner: string;
}

interface TripFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading: boolean;
}

const TripForm = ({ onSubmit, isLoading }: TripFormProps) => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("moderate");
  const [partner, setPartner] = useState("solo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    onSubmit({ destination, days, budget, partner });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Plan your next journey
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Provide your preferences and our AI will build a custom itinerary.
        </p>
      </header>

      <div className="space-y-5">
        {/* Destination */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            Destination
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full h-11 px-4 rounded-lg border-0 ring-1 ring-input bg-background text-foreground focus:ring-2 focus:ring-accent transition-all shadow-sm appearance-none cursor-pointer"
          >
            <option value="">Select a destination</option>
            {DESTINATIONS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Days */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              Number of Days
            </label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full h-11 px-4 rounded-lg border-0 ring-1 ring-input bg-background text-foreground focus:ring-2 focus:ring-accent transition-all shadow-sm appearance-none cursor-pointer tabular-nums"
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d} {d === 1 ? "day" : "days"}
                </option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
              Budget
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border-0 ring-1 ring-input bg-background text-foreground focus:ring-2 focus:ring-accent transition-all shadow-sm appearance-none cursor-pointer"
            >
              {BUDGETS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label} — {b.desc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Travel Partner */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            Travel Partner
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PARTNERS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPartner(p.value)}
                className={`h-11 rounded-lg text-sm font-medium transition-all ${
                  partner === p.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <span className="mr-1.5">{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!destination || isLoading}
        className="w-full h-12 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Generating itinerary…
          </div>
        ) : (
          <>
            Generate Itinerary
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </motion.form>
  );
};

export default TripForm;
export type { TripFormData };
