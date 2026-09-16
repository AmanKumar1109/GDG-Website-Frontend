import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Edit2, Loader2, Sparkles } from "lucide-react";
import {
  updateImageFormSchema,
  type UpdateImageFormInput,
  type UpdateImageFormData,
  GALLERY_CATEGORIES,
} from "../validator/image.validator";
import { useUpdateImageMutation } from "../hooks/useGalleryMutations";
import useImageStore from "../store/useImageStore";

interface EditImageModalProps {
  slug: string;
  galleryId?: string;
}

export const EditImageModal: React.FC<EditImageModalProps> = ({
  slug,
  galleryId,
}) => {
  const { isEditModalOpen, editingImage, closeEditModal } = useImageStore();
  const updateMutation = useUpdateImageMutation(slug);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateImageFormInput, any, UpdateImageFormData>({
    resolver: zodResolver(updateImageFormSchema),
    defaultValues: {
      caption: "",
      category: "Community",
      featured: false,
    },
  });

  useEffect(() => {
    if (editingImage) {
      reset({
        caption: editingImage.title || "",
        category: editingImage.category || "Community",
        featured: (editingImage as any).featured ?? false,
      });
    }
  }, [editingImage, reset]);

  if (!isEditModalOpen || !editingImage) return null;

  const onSubmit = async (values: UpdateImageFormData) => {
    await updateMutation.mutateAsync({
      slug,
      galleryId,
      imageId: editingImage.id,
      imageUrl: editingImage.img,
      caption: values.caption,
      featured: values.featured,
    });
    closeEditModal();
  };

  const isLoading = isSubmitting || updateMutation.isPending;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={closeEditModal}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border-2 border-white/15 bg-[#0a0f18] p-6 sm:p-7 shadow-[10px_10px_0_0_#000] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#FBBC04]/20 text-[#FBBC04]">
              <Edit2 size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                Edit Photo Details
              </h3>
              <p className="text-xs text-gray-400">Update caption & category</p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeEditModal}
            aria-label="Close"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Thumbnail Preview */}
        <div className="mb-4 relative h-36 w-full overflow-hidden rounded-xl bg-black/50 border border-white/10">
          <img
            src={editingImage.img}
            alt={editingImage.title}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Caption */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Caption / Title *
            </label>
            <input
              type="text"
              placeholder="Photo caption"
              {...register("caption")}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#4285F4] focus:outline-none"
            />
            {errors.caption && (
              <p className="mt-1 text-[11px] text-red-400 font-medium">
                {errors.caption.message}
              </p>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Category *
            </label>
            <select
              {...register("category")}
              className="w-full rounded-xl border border-white/15 bg-[#0b1320] px-3.5 py-2.5 text-xs text-white focus:border-[#4285F4] focus:outline-none"
            >
              {GALLERY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0b1320] text-white">
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-[11px] text-red-400 font-medium">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#FBBC04]" />
              <div>
                <span className="text-xs font-bold text-white">Featured Photo</span>
                <p className="text-[10px] text-gray-400">
                  Highlight this photo in top community showcases
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              {...register("featured")}
              className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-[#4285F4] focus:ring-[#4285F4] cursor-pointer"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10 mt-5">
            <button
              type="button"
              onClick={closeEditModal}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FBBC04] hover:bg-[#E5A800] text-black text-xs font-bold shadow-[0_0_20px_rgba(251,188,4,0.4)] transition cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Edit2 size={14} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditImageModal;
