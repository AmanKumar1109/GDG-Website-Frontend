const fs = require('fs');

let highlightContent = fs.readFileSync('src/features/Event/Section/HIGHLIGHTS_Sec.tsx', 'utf8');

// I will re-implement the highlight section dynamically based on mentors.
const newHighlightCode = `import Highlight from "../Components/Highlight";
import { Clock3, ShieldCheck, Users, Zap } from "lucide-react";
import { formatStatus } from "../utils/Event.utils";
import type { EventResponse } from "../type/Event.type";

interface EventHignLightsProps {
  event: EventResponse;
}

const HIGHLIGHTS_Sec = ({ event }: EventHignLightsProps) => {
  const getEventDuration = () => {
    if (!event.registrationStartAt || !event.registrationEndAt) {
      return "N/A";
    }
    const start = new Date(event.registrationStartAt);
    const end = new Date(event.registrationEndAt);
    const difference = end.getTime() - start.getTime();
    if (difference <= 0) return "Same day";

    const totalHours = Math.ceil(difference / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    if (days > 0 && hours > 0) {
      return \`\${days}d \${hours}h\`;
    }
    if (days > 0) {
      return \`\${days} \${days === 1 ? "Day" : "Days"}\`;
    }
    return \`\${totalHours} \${totalHours === 1 ? "Hour" : "Hours"}\`;
  };

  const mentorCount = event.mentors?.length ?? 0;
  
  // Conditionally include mentors if there are any
  const highlightItems = [
    {
      icon: <Zap size={18} />,
      value: event.category || "General",
      label: "Event Type"
    },
    {
      icon: <Clock3 size={18} />,
      value: getEventDuration(),
      label: "Registration Period"
    },
    ...(mentorCount > 0 ? [{
      icon: <Users size={18} />,
      value: \`\${mentorCount}+ Expert Mentors\`,
      label: "Mentorship"
    }] : []),
    {
      icon: <ShieldCheck size={18} />,
      value: event.venue?.mode ? formatStatus(event.venue.mode) : "TBA",
      label: "Event Mode"
    }
  ];

  // Adjust grid columns based on number of items (3 or 4)
  const colsClass = highlightItems.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section className="block mt-4 sm:mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-md">
      <div className={\`grid grid-cols-2 \${colsClass} [&>*:nth-child(odd)]:border-r [&>*:nth-child(1)]:border-b [&>*:nth-child(2)]:border-b lg:[&>*:nth-child(odd)]:border-r-0 lg:[&>*:nth-child(1)]:border-b-0 lg:[&>*:nth-child(2)]:border-b-0 lg:divide-x border-white/[0.07] divide-white/[0.07]\`}>
        {highlightItems.map((item, idx) => (
          <Highlight
            key={idx}
            icon={item.icon}
            value={item.value}
            label={item.label}
          />
        ))}
      </div>
    </section>
  );
};

export default HIGHLIGHTS_Sec;
`;

fs.writeFileSync('src/features/Event/Section/HIGHLIGHTS_Sec.tsx', newHighlightCode);

