import { useState } from "react";
import { formatDate, formatTime } from "../utils/Event.utils";
import type { EventTimelineItem } from "../type/Event.type";
import { motion } from "framer-motion";

const Timeline = ({ timeline }: { timeline: EventTimelineItem[] }) => {
  const [now] = useState(() => Date.now());
  if (!timeline || timeline.length === 0) return null;

  // Sort timeline by start date
  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
  );

  return (
    <div className="relative py-4 sm:py-8">
      {/* Vertical Line - dynamically positioned for mobile/tablet/desktop */}
      <div className="absolute left-[19px] sm:left-[27px] md:left-[180px] top-4 sm:top-8 bottom-4 sm:bottom-8 w-px bg-white/10" />

      <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
        {sortedTimeline.map((item, index) => {
          const startMs = new Date(item.startAt).getTime();
          const endMs = item.endAt ? new Date(item.endAt).getTime() : startMs;

          const isPast = endMs < now;
          const isLive = startMs <= now && endMs >= now;

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={item._id || index}
              className="relative flex flex-col md:flex-row items-start group"
            >
              {/* Dot Marker */}
              <div
                className={`absolute left-[7px] sm:left-[15px] md:left-[168px] top-[4px] md:top-[6px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[3px] bg-[#0a0a0a] transition-colors duration-500
                  ${
                    isLive
                      ? "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                      : isPast
                      ? "border-white/20"
                      : "border-blue-500/50 group-hover:border-blue-400"
                  }
                `}
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    isLive ? "bg-emerald-400 animate-pulse" : isPast ? "bg-transparent" : "bg-transparent group-hover:bg-blue-400"
                  }`}
                />
              </div>

              {/* Time Section */}
              <div className="md:w-[180px] flex-shrink-0 md:text-right pb-2 md:pb-0 pl-10 sm:pl-16 md:pl-0 pr-0 md:pr-10 pt-0.5">
                <span className={`text-sm sm:text-base font-bold block ${isLive ? "text-emerald-400" : "text-white/90"}`}>
                  {formatDate(item.startAt)}
                </span>
                <span className={`text-xs sm:text-sm mt-0.5 sm:mt-1 font-semibold block ${isLive ? "text-emerald-400/80" : "text-white/40"}`}>
                  {formatTime(item.startAt)}
                  {item.endAt && item.endAt !== item.startAt && ` - ${formatTime(item.endAt)}`}
                </span>
              </div>

              {/* Content Section */}
              <div className="flex-1 pl-10 sm:pl-16 md:pl-10 w-full">
                <div
                  className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300
                    ${
                      isLive
                        ? "border-emerald-500/30 bg-emerald-500/5 shadow-xl shadow-emerald-500/5"
                        : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                    }
                  `}
                >
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h3
                      className={`text-base sm:text-lg lg:text-xl font-bold ${
                        isLive ? "text-emerald-400" : "text-white"
                      }`}
                    >
                      {item.title}
                    </h3>
                    {isLive && (
                      <span className="rounded-full bg-emerald-500/20 px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30 shrink-0">
                        Live
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
