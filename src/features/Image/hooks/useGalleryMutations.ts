import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import Swal from "sweetalert2";

export interface AddImagePayload {
  slug: string;
  galleryId?: string;
  url: string;
  publicId?: string;
  caption: string;
  featured?: boolean;
}

export interface UpdateImagePayload {
  slug: string;
  galleryId?: string;
  imageId?: string;
  imageUrl?: string;
  publicId?: string;
  caption: string;
  featured?: boolean;
}

export interface DeleteImagePayload {
  slug: string;
  galleryId?: string;
  imageId?: string;
  imageUrl?: string;
  publicId?: string;
}

const handleAuthError = (error: any, fallbackMessage: string) => {
  const message = error?.response?.data?.message || error?.message || fallbackMessage;
  const isAuthError =
    message.toLowerCase().includes("unauthorized") ||
    message.toLowerCase().includes("token") ||
    message.toLowerCase().includes("forbidden") ||
    error?.response?.status === 401 ||
    error?.response?.status === 403;

  if (isAuthError) {
    Swal.fire({
      title: "Sign in Required",
      text: "Please log in with organizer or admin privileges to manage gallery photos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Go to Login",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#4285F4",
      cancelButtonColor: "#222226",
      background: "#0c0d14",
      color: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/login";
      }
    });
  } else {
    Swal.fire({
      title: "Operation Failed",
      text: message,
      icon: "error",
      background: "#0c0d14",
      color: "#ffffff",
      confirmButtonColor: "#EA4335",
    });
  }
};

export const useAddImageMutation = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddImagePayload) => {
      const res = await api.post("/api/v1/image", {
        slug: payload.slug,
        galleryId: payload.galleryId,
        image: {
          url: payload.url,
          publicId: payload.publicId,
          caption: payload.caption,
          featured: payload.featured,
        },
      });
      return res.data;
    },
    onSuccess: (_data, variables) => {
      // Optimistically update query cache
      queryClient.setQueryData(["galleryBySlug", slug], (old: any) => {
        if (!old) return old;
        const newImages = Array.isArray(old.images) ? [...old.images] : [];
        newImages.unshift({
          _id: `img-${Date.now()}`,
          url: variables.url,
          publicId: variables.publicId,
          caption: variables.caption,
          featured: variables.featured,
        });
        return {
          ...old,
          images: newImages,
          imageCount: newImages.length,
        };
      });

      queryClient.invalidateQueries({ queryKey: ["galleryBySlug", slug] });
      queryClient.invalidateQueries({ queryKey: ["gallery"] });

      Swal.fire({
        title: "Photo Added!",
        text: "Image has been successfully added to the album.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#0c0d14",
        color: "#ffffff",
      });
    },
    onError: (error: any) => {
      handleAuthError(error, "Failed to add image");
    },
  });
};

export const useUpdateImageMutation = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateImagePayload) => {
      const res = await api.patch("/api/v1/image", {
        slug: payload.slug,
        galleryId: payload.galleryId,
        imageId: payload.imageId,
        imageUrl: payload.imageUrl,
        publicId: payload.publicId,
        updateData: {
          caption: payload.caption,
          featured: payload.featured,
        },
      });
      return res.data;
    },
    onSuccess: (_data, variables) => {
      // Optimistically update cache
      queryClient.setQueryData(["galleryBySlug", slug], (old: any) => {
        if (!old || !Array.isArray(old.images)) return old;
        const updatedImages = old.images.map((img: any) => {
          const match =
            img._id === variables.imageId ||
            img.url === variables.imageUrl ||
            img.publicId === variables.publicId;
          if (match) {
            return {
              ...img,
              caption: variables.caption,
              featured: variables.featured,
            };
          }
          return img;
        });
        return { ...old, images: updatedImages };
      });

      queryClient.invalidateQueries({ queryKey: ["galleryBySlug", slug] });

      Swal.fire({
        title: "Photo Updated!",
        text: "Image details have been successfully updated.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
        background: "#0c0d14",
        color: "#ffffff",
      });
    },
    onError: (error: any) => {
      handleAuthError(error, "Failed to update image");
    },
  });
};

export const useDeleteImageMutation = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: DeleteImagePayload) => {
      const res = await api.delete("/api/v1/image", {
        data: {
          slug: payload.slug,
          galleryId: payload.galleryId,
          imageId: payload.imageId,
          imageUrl: payload.imageUrl,
          publicId: payload.publicId,
        },
      });
      return res.data;
    },
    onSuccess: (_data, variables) => {
      // Optimistically remove from cache
      queryClient.setQueryData(["galleryBySlug", slug], (old: any) => {
        if (!old || !Array.isArray(old.images)) return old;
        const filteredImages = old.images.filter((img: any) => {
          const match =
            img._id === variables.imageId ||
            img.url === variables.imageUrl ||
            img.publicId === variables.publicId;
          return !match;
        });
        return {
          ...old,
          images: filteredImages,
          imageCount: filteredImages.length,
        };
      });

      queryClient.invalidateQueries({ queryKey: ["galleryBySlug", slug] });
      queryClient.invalidateQueries({ queryKey: ["gallery"] });

      Swal.fire({
        title: "Photo Deleted",
        text: "Image has been removed from this gallery.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
        background: "#0c0d14",
        color: "#ffffff",
      });
    },
    onError: (error: any) => {
      handleAuthError(error, "Failed to delete image");
    },
  });
};
