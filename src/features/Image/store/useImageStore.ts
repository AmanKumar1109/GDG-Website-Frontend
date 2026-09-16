import { create } from "zustand";
import type { GalleryItem } from "../Pages/ImagePage";

interface ImageStoreState {
  // Lightbox
  selectedImage: GalleryItem | null;
  setSelectedImage: (image: GalleryItem | null) => void;

  // Upload Modal
  isUploadModalOpen: boolean;
  openUploadModal: () => void;
  closeUploadModal: () => void;

  // Edit Modal
  isEditModalOpen: boolean;
  editingImage: GalleryItem | null;
  openEditModal: (image: GalleryItem) => void;
  closeEditModal: () => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useImageStore = create<ImageStoreState>((set) => ({
  selectedImage: null,
  setSelectedImage: (image) => set({ selectedImage: image }),

  isUploadModalOpen: false,
  openUploadModal: () => set({ isUploadModalOpen: true }),
  closeUploadModal: () => set({ isUploadModalOpen: false }),

  isEditModalOpen: false,
  editingImage: null,
  openEditModal: (image) => set({ isEditModalOpen: true, editingImage: image }),
  closeEditModal: () => set({ isEditModalOpen: false, editingImage: null }),

  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: "All",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useImageStore;

