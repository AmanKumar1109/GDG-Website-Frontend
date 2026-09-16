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

export const WTM_RANCHI_MEETUP_FALLBACK: GalleryDetailItem = {
  _id: "gallery-4",
  title: "Women Techmakers Ranchi Meetup",
  slug: "wtm-ranchi-meetup",
  albumImageUrl:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80",
  imageCount: 4,
  description:
    "Celebrating women in tech with inspiring keynote talks, career panels, and mentorship circles.",
  event: "WTM Ranchi",
  visibility: "public",
  status: "published",
  images: [
    {
      _id: "wtm-img-1",
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80",
      publicId: "wtm-1",
      caption: "WTM Keynote: Empowering Women in Tech Ecosystems",
      featured: true,
      category: "Keynote",
    },
    {
      _id: "wtm-img-2",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80",
      publicId: "wtm-2",
      caption: "Panel Discussion on Engineering Leadership & Career Acceleration",
      featured: false,
      category: "Panel",
    },
    {
      _id: "wtm-img-3",
      url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&auto=format&fit=crop&q=80",
      publicId: "wtm-3",
      caption: "Interactive Coding Circle & Microservice Mentorship",
      featured: true,
      category: "Workshop",
    },
    {
      _id: "wtm-img-4",
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
      publicId: "wtm-4",
      caption: "Community Networking & Developer Swag Session",
      featured: false,
      category: "Networking",
    },
  ],
};

export const useFetchGalleryBySlugQuery = (slug?: string) => {
  return useQuery<GalleryDetailItem | null, Error>({
    queryKey: ["galleryBySlug", slug],
    queryFn: async () => {
      if (!slug) return null;
      try {
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
      } catch (err) {
        console.warn(
          `Could not fetch gallery for slug ${slug} from backend, checking fallback:`,
          err,
        );
      }

      if (slug.toLowerCase() === "wtm-ranchi-meetup") {
        return WTM_RANCHI_MEETUP_FALLBACK;
      }
      return null;
    },
    enabled: Boolean(slug),
    staleTime: 30 * 1000,
  });
};

export default useFetchGalleryBySlugQuery;
