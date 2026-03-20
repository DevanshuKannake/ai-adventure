import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface Activity {
  time: string;
  task: string;
  description: string;
}

interface ItineraryDay {
  day: number;
  theme: string;
  activities: Activity[];
}

const ItineraryCard = ({ dayData, index }: { dayData: ItineraryDay; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.15, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
    className="rounded-2xl p-5 bg-card shadow-card space-y-4"
  >
    <div className="flex items-baseline gap-3">
      <span className="text-xs font-semibold uppercase tracking-wider text-accent tabular-nums">
        Day {dayData.day}
      </span>
      <h3 className="font-semibold text-card-foreground tracking-tight">{dayData.theme}</h3>
    </div>

    <div className="space-y-3">
      {dayData.activities.map((activity, i) => (
        <div key={i} className="flex gap-3 group">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground tabular-nums shrink-0 w-16 pt-0.5">
            <Clock className="h-3 w-3" />
            {activity.time}
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-sm font-medium text-card-foreground">{activity.task}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{activity.description}</p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

export default ItineraryCard;
export type { ItineraryDay, Activity };
