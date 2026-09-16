import { z } from "zod";

export const uploadImageFormSchema = z.object({
  caption: z
    .string()
    .min(2, "Caption must be at least 2 characters")
    .max(150, "Caption must be under 150 characters")
    .trim(),
  category: z.string().min(1, "Please select a category"),
  featured: z.boolean(),
  url: z.string().optional(),
});

export type UploadImageFormInput = z.input<typeof uploadImageFormSchema>;
export type UploadImageFormData = z.output<typeof uploadImageFormSchema>;

export const updateImageFormSchema = z.object({
  caption: z
    .string()
    .min(2, "Caption must be at least 2 characters")
    .max(150, "Caption must be under 150 characters")
    .trim(),
  category: z.string().min(1, "Please select a category"),
  featured: z.boolean(),
});

export type UpdateImageFormInput = z.input<typeof updateImageFormSchema>;
export type UpdateImageFormData = z.output<typeof updateImageFormSchema>;

export const GALLERY_CATEGORIES = [
  "Keynote",
  "Workshop",
  "Hackathon",
  "Community",
  "Tech Talk",
  "Panel",
  "Celebration",
  "Networking",
] as const;

