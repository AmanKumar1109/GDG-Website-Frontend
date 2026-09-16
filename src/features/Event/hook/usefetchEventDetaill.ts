import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import type { EventResponse } from "../type/Event.type";

function useFetchEventDetaill(slug: string) {
  return useQuery({
    queryKey: ["findSingleEvent", { slug }],
    queryFn: async () => {
      const response = await api.get(`/api/v1/event/${slug}`);
      if (response.data?.data?.[0]) {
        return response.data.data[0] as EventResponse;
      }
      throw new Error("Event not found");
    },
    enabled: !!slug,
    retry: 1,
  });
}

export default useFetchEventDetaill;
