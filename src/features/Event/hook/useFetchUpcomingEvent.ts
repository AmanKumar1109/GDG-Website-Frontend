
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
