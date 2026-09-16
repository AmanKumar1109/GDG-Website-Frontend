import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";

export interface GalleryDetailItem {
  _id: string;
  title: string;
  albumImageUrl?: string;
  imageCount?: number;
  slug: string;
  description?: string;
  event?: string;
  images?: Array<{
    _id?: string;
    url: string;
    publicId?: string;
    caption?: string;
    featured?: boolean;
    category?: string;
  }>;
  tags?: string[];
  visibility?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FetchGalleryBySlugResponse {
  success: boolean;
  message?: string;
  data: GalleryDetailItem | GalleryDetailItem[];
}

export const useFetchGalleryBySlugQuery = (slug?: string) => {
  return useQuery<GalleryDetailItem | null, Error>({
    queryKey: ["galleryBySlug", slug],
    queryFn: async () => {
      if (!slug) return null;
      const response = await api.get<FetchGalleryBySlugResponse>(
        `/api/v1/findGalleryBySlug/${encodeURIComponent(slug)}`,
      );
      const data = response.data?.data;
      if (Array.isArray(data)) {
        return data[0] || null;
      }
      if (data && typeof data === "object") {
        return data;
      }
      return null;
    },
    enabled: Boolean(slug),
    staleTime: 30 * 1000,
  });
};

export default useFetchGalleryBySlugQuery;
