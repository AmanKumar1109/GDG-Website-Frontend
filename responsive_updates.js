const fs = require('fs');

// 1. Update Timeline
const timelineContent = `import { useState } from "react";
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
              {/* Dot Marker (Absolute for perfectly aligning with the line across breakpoints) */}
              <div
                className={\`absolute left-[7px] sm:left-[15px] md:left-[168px] top-[4px] md:top-[6px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[3px] bg-[#0a0a0a] transition-colors duration-500
                  \${
                    isLive
                      ? "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                      : isPast
                      ? "border-white/20"
                      : "border-blue-500/50 group-hover:border-blue-400"
                  }
                \`}
              >
                <div
                  className={\`h-2 w-2 rounded-full \${
                    isLive ? "bg-emerald-400 animate-pulse" : isPast ? "bg-transparent" : "bg-transparent group-hover:bg-blue-400"
                  }\`}
                />
              </div>

              {/* Time Section */}
              <div className="md:w-[180px] flex-shrink-0 md:text-right pb-2 md:pb-0 pl-12 sm:pl-16 md:pl-0 pr-0 md:pr-10 pt-0.5">
                  <span className={\`text-sm sm:text-base font-bold block \${isLive ? 'text-emerald-400' : 'text-white/90'}\`}>
                    {formatDate(item.startAt)}
                  </span>
                  <span className={\`text-xs sm:text-sm mt-0.5 sm:mt-1 font-semibold block \${isLive ? 'text-emerald-400/80' : 'text-white/40'}\`}>
                    {formatTime(item.startAt)}
                    {item.endAt && item.endAt !== item.startAt && \` - \${formatTime(item.endAt)}\`}
                  </span>
              </div>

              {/* Content Section */}
              <div className="flex-1 pl-12 sm:pl-16 md:pl-10 w-full">
                <div
                  className={\`rounded-2xl border p-4 sm:p-5 transition-all duration-300
                    \${
                      isLive
                        ? "border-emerald-500/30 bg-emerald-500/5 shadow-xl shadow-emerald-500/5"
                        : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                    }
                  \`}
                >
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h3
                      className={\`text-base sm:text-lg lg:text-xl font-bold \${
                        isLive ? "text-emerald-400" : "text-white"
                      }\`}
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
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-2xl mt-2 sm:mt-3">
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
\`;
fs.writeFileSync('src/features/Event/Components/Timeline.tsx', timelineContent);

// 2. Update PersonCard
const personCardContent = `import { ExternalLink, Globe, Link2, MessageSquare, Briefcase, Video, Camera } from "lucide-react";
import { motion } from "framer-motion";
import type { ApiSocialLinks } from "../../Member/v1/type/MemberDetails.type";

interface PersonProps {
  firstName: string;
  lastName: string;
  imageUrl?: string;
  Bio?: string;
  role?: string;
  socialLinks?: ApiSocialLinks;
}

const getSocialIcon = (key: string) => {
  const k = key.toLowerCase();
  if (k.includes("github")) return <ExternalLink size={14} strokeWidth={2.5} />;
  if (k.includes("linkedin")) return <Briefcase size={14} strokeWidth={2.5} />;
  if (k.includes("twitter") || k.includes("x.com")) return <MessageSquare size={14} strokeWidth={2.5} />;
  if (k.includes("youtube")) return <Video size={14} strokeWidth={2.5} />;
  if (k.includes("instagram")) return <Camera size={14} strokeWidth={2.5} />;
  if (k.includes("website") || k.includes("portfolio") || k.includes("medium")) return <Globe size={14} strokeWidth={2.5} />;
  return <Link2 size={14} strokeWidth={2.5} />;
};

const PersonCard = ({ firstName, lastName, imageUrl, Bio, role, socialLinks }: PersonProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-1.5 transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      {/* Inner wrapper for padding and content */}
      <div className="flex h-full flex-col rounded-[1.75rem] bg-white/[0.02] p-5 sm:p-6">
        
        {/* Header: Avatar + Name/Role */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full border border-white/20 bg-black">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={\`\${firstName} \${lastName}\`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/5 text-lg sm:text-xl font-bold text-white/50">
                {firstName.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
              {firstName} {lastName}
            </h4>
            {role && (
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-400 mt-1 truncate">
                {role}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        {Bio && (
          <p className="text-xs sm:text-sm text-white/50 leading-relaxed line-clamp-3 mb-5 sm:mb-6 flex-1">
            {Bio}
          </p>
        )}

        {/* Footer: Social Links */}
        {socialLinks && Object.values(socialLinks).some(url => url) && (
          <div className="mt-auto pt-4 flex flex-wrap items-center gap-2 border-t border-white/5">
            {Object.entries(socialLinks).map(([key, url]) => {
              if (!url) return null;
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white"
                  title={key}
                >
                  {getSocialIcon(key)}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PersonCard;
\`;
fs.writeFileSync('src/features/Event/Components/PersonCard.tsx', personCardContent);

// 3. Update EventDetailPage Layout Responsiveness
const detailPagePath = 'src/features/Event/Pages/EventDetailPage.tsx';
let detailPage = fs.readFileSync(detailPagePath, 'utf8');
// Fix BentoRow icon shrinking
detailPage = detailPage.replace(
  'const BentoRow = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) => (\\n  <div className="flex items-start gap-4">',
  'const BentoRow = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) => (\\n  <div className="flex items-start gap-3 sm:gap-4">'
);
detailPage = detailPage.replace(
  '<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08]">',
  '<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08]">'
); // ensure it's correct

// Add safe scrollbar hiding for tabs
detailPage = detailPage.replace(
  'className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar border-b border-white/10 mb-8 relative"',
  'className="flex gap-4 sm:gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-b border-white/10 mb-6 sm:mb-8 relative px-1"'
);

// Reduce top padding slightly on mobile for tighter layout
detailPage = detailPage.replace(
  'className="mt-10 lg:mt-16 w-full max-w-7xl mx-auto py-16 sm:py-24"',
  'className="mt-8 lg:mt-16 w-full max-w-7xl mx-auto py-12 sm:py-24"'
);

// Optimize gap on mobile grid
detailPage = detailPage.replace(
  'className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"',
  'className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"'
);

fs.writeFileSync(detailPagePath, detailPage);
