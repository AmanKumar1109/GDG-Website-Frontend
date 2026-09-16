import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";

export interface EventNameItem {
  _id?: string;
  title: string;
  Slug?: string;
}

export interface FetchEventNamesResponse {
  success: boolean;
  message?: string;
  data: EventNameItem[];
}

export const FALLBACK_EVENT_NAMES: EventNameItem[] = [
  { title: "Jharkhand Tech Summit 2026" },
  { title: "DevFest Ranchi 2025" },
  { title: "Women Techmakers Ranchi Meetup" },
  { title: "MERN Stack Workshop" },
  { title: "Dev Connect Meetup" },
  { title: "AI in Action - Tech Talk" },
];

export const useFetchAllEventNamesQuery = () => {
  return useQuery<EventNameItem[], Error>({
    queryKey: ["allEventNames"],
    queryFn: async () => {
      try {
        const response = await api.get<FetchEventNamesResponse>("/api/v1/findAllEventName");
        const data = response.data?.data;
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn("Could not fetch event names from backend, using fallback:", err);
      }
      return FALLBACK_EVENT_NAMES;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export default useFetchAllEventNamesQuery;
