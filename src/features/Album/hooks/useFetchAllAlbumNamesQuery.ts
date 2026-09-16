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

export const useFetchAllAlbumNamesQuery = () => {
  return useQuery<AlbumNameItem[], Error>({
    queryKey: ["allAlbumNames"],
    queryFn: async () => {
      const response = await api.get<FetchAlbumNamesResponse>("/api/v1/findAllAlbumName");
      return response.data?.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export default useFetchAllAlbumNamesQuery;
