import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";

export interface AlbumNameItem {
  _id?: string;
  title: string;
  slug?: string;
  albumImageUrl?: string;
  event?: string;
}

export interface FetchAlbumNamesResponse {
  success: boolean;
  message?: string;
  data: AlbumNameItem[];
}

export const FALLBACK_ALBUM_NAMES: AlbumNameItem[] = [
  { title: "Women Techmakers Ranchi Meetup", slug: "wtm-ranchi-meetup" },
  { title: "DevFest Ranchi 2025", slug: "devfest-ranchi-2025" },
  { title: "Jharkhand Tech Summit 2026", slug: "jharkhand-tech-summit-2026" },
  { title: "MERN Stack Workshop", slug: "mern-stack-workshop" },
  { title: "Dev Connect Meetup", slug: "dev-connect-meetup" },
  { title: "AI in Action - Tech Talk", slug: "ai-in-action-tech-talk" },
];

export const useFetchAllAlbumNamesQuery = () => {
  return useQuery<AlbumNameItem[], Error>({
    queryKey: ["allAlbumNames"],
    queryFn: async () => {
      try {
        const response = await api.get<FetchAlbumNamesResponse>("/api/v1/findAllAlbumName");
        const data = response.data?.data;
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn("Could not fetch album names from backend, using fallback:", err);
      }
      return FALLBACK_ALBUM_NAMES;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export default useFetchAllAlbumNamesQuery;

