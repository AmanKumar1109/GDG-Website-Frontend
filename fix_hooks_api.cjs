const fs = require('fs');

// 1. usefetchEventDetaill.ts
const useFetchEventDetaillCode = `
import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import type { EventResponse } from "../type/Event.type";

function useFetchEventDetaill(slug: string) {
  return useQuery({
    queryKey: ["findSingleEvent", { slug }],
    queryFn: async () => {
      const response = await api.get(\`/api/v1/event/\${slug}\`);
      if (response.data?.data?.[0]) {
        return response.data.data[0] as EventResponse;
      }
      throw new Error("Event not found");
    },
    retry: 1
  });
}

export default useFetchEventDetaill;
`;

fs.writeFileSync('src/features/Event/hook/usefetchEventDetaill.ts', useFetchEventDetaillCode);

// 2. useFetchUpcomingEvent.ts
const useFetchUpcomingEventCode = `
import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import type { EventResponse } from "../type/Event.type";

const useFetchUpcomingEvent = () => {
  return useQuery({
    queryKey: ["upcomingEvent"],
    queryFn: async () => {
      const res = await api.get("/api/v1/find/upcomingEvents");
      if (res.data?.data && Array.isArray(res.data.data)) {
        return res.data.data as EventResponse[];
      }
      return [];
    },
    retry: 1
  });
};

export default useFetchUpcomingEvent;
`;

fs.writeFileSync('src/features/Event/hook/useFetchUpcomingEvent.ts', useFetchUpcomingEventCode);


// 3. useFetchPastEvent.ts
const useFetchPastEventCode = `
import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import type { EventResponse } from "../type/Event.type";

const useFetchPasrEvent = () => {
  return useQuery({
    queryKey: ["pastEvent"],
    queryFn: async () => {
      const res = await api.get("/api/v1/find/pastEvents");
      if (res.data?.data && Array.isArray(res.data.data)) {
        return res.data.data as EventResponse[];
      }
      return [];
    },
    retry: 1
  });
};

export default useFetchPasrEvent;
`;

fs.writeFileSync('src/features/Event/hook/useFetchPastEvent.ts', useFetchPastEventCode);


// 4. useFetchEventWithFilter.ts
const useFetchEventWithFilterCode = `
import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import type { PublicEvent } from "../type/Event.type";

export interface EventFilters {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  tags?: string;
  status?: string;
}

const useFetchEventWithFilter = (filters: EventFilters) => {
  return useQuery({
    queryKey: ["events", filters],
    queryFn: async () => {
      const res = await api.get("/api/v1/events", {
        params: {
          page: filters.page,
          limit: filters.limit,
          search: filters.search,
          category: filters.category,
          tags: filters.tags,
          status: filters.status,
        },
      });
      if (res.data?.data?.events) {
        return res.data.data;
      }
      return { events: [], pagination: { total: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: false } };
    },
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    staleTime: 30_000,
    placeholderData: (previousData) => previousData,
    retry: 1
  });
};

export default useFetchEventWithFilter;
`;

fs.writeFileSync('src/features/Event/hook/useFetchEventWithFilter.ts', useFetchEventWithFilterCode);

