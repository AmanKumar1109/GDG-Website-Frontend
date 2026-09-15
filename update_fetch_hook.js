const fs = require('fs');
const content = `import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import { singleEventData } from "../data/singleEventData";
import { fallbackUpcomingEvents } from "./useFetchUpcomingEvent";
import { fallbackPastEvents } from "./useFetchPastEvent";
import type { EventResponse } from "../type/Event.type";

function useFetchEventDetaill(slug: string) {
  return useQuery({
    queryKey: ["findSingleEvent", { slug }],
    queryFn: async () => {
      try {
        const response = await api.get(\`/api/v1/event/\${slug}\`);
        if (response.data?.data?.[0]) {
          const apiEvent = response.data.data[0];
          return {
            ...apiEvent,
            mentors: apiEvent.mentors && apiEvent.mentors.length > 0 ? apiEvent.mentors : singleEventData.mentors,
            judges: apiEvent.judges && apiEvent.judges.length > 0 ? apiEvent.judges : singleEventData.judges,
            rules: apiEvent.rules && apiEvent.rules.length > 0 ? apiEvent.rules : singleEventData.rules,
            timeline: apiEvent.timeline && apiEvent.timeline.length > 0 ? apiEvent.timeline : singleEventData.timeline,
            requirements: apiEvent.requirements && apiEvent.requirements.length > 0 ? apiEvent.requirements : singleEventData.requirements,
          };
        }
      } catch {
        console.warn(\`[GDG Ranchi] Failed to fetch live event for \${slug}, using fallback.\`);
      }

      // Check known upcoming and past events
      const allEvents: EventResponse[] = [
        singleEventData,
        ...fallbackUpcomingEvents,
        ...fallbackPastEvents,
      ];
      const found = allEvents.find(
        (e) => e.Slug?.toLowerCase() === slug.toLowerCase() || e._id === slug,
      );

      if (found) {
        return {
          ...found,
          descriptionMarkdown: found.descriptionMarkdown || singleEventData.descriptionMarkdown,
          rules: found.rules?.length ? found.rules : singleEventData.rules,
          requirements: found.requirements?.length
            ? found.requirements
            : singleEventData.requirements,
          timeline: found.timeline?.length ? found.timeline : singleEventData.timeline,
          mentors: found.mentors?.length ? found.mentors : singleEventData.mentors,
          judges: found.judges?.length ? found.judges : singleEventData.judges,
        };
      }

      // Fallback with current slug
      return {
        ...singleEventData,
        Slug: slug,
        title: slug.replace(/-/g, " ").replace(/\\b\\w/g, (c) => c.toUpperCase()),
      };
    },
  });
}

export default useFetchEventDetaill;
`
fs.writeFileSync('src/features/Event/hook/usefetchEventDetaill.ts', content);
