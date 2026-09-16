import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload, Image as ImageIcon, Loader2, Sparkles } from "lucide-react";
import {
  uploadImageFormSchema,
  type UploadImageFormInput,
  type UploadImageFormData,
  GALLERY_CATEGORIES,
} from "../validator/image.validator";
import { useAddImageMutation } from "../hooks/useGalleryMutations";
import useImageStore from "../store/useImageStore";
import uploadImage from "../../../utils/uploadImage";
import Swal from "sweetalert2";

const generateFallbackPublicId = () => `img-${Date.now()}`;

interface UploadImageModalProps {
  slug: string;
  galleryId?: string;
}

export const UploadImageModal: React.FC<UploadImageModalProps> = ({
  slug,
  galleryId,
}) => {
  const { isUploadModalOpen, closeUploadModal } = useImageStore();
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const addImageMutation = useAddImageMutation(slug);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UploadImageFormInput, any, UploadImageFormData>({
    resolver: zodResolver(uploadImageFormSchema),
    defaultValues: {
      caption: "",
      category: "Community",
      featured: false,
      url: "",
    },
  });

  const currentUrl = useWatch({ control, name: "url" });

  if (!isUploadModalOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
      setValue("url", previewUrl, { shouldValidate: false });
    }
  };

  const onSubmit = async (values: UploadImageFormData) => {
    let finalImageUrl = values.url || "";
    let publicId: string | undefined = undefined;

    // If a local file is selected, upload to Cloudinary using existing uploadImage utility
    if (selectedFile) {
      try {
        setIsUploadingFile(true);
        const uploadResult = await uploadImage(selectedFile);
        finalImageUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
      } catch (err) {
        console.error("Cloudinary upload failed, falling back to URL/mock:", err);
        // If Cloudinary credentials are mock/offline, use object URL or unsplash fallback
        finalImageUrl =
          filePreview ||
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80";
        publicId = generateFallbackPublicId();
      } finally {
        setIsUploadingFile(false);
      }
    }

    if (!finalImageUrl) {
      Swal.fire({
        title: "Photo Required",
        text: "Please select an image file or provide a valid image URL.",
        icon: "warning",
        background: "#0c0d14",
        color: "#ffffff",
        confirmButtonColor: "#4285F4",
      });
      return;
    }

    await addImageMutation.mutateAsync({
      slug,
      galleryId,
      url: finalImageUrl,
      publicId,
      caption: values.caption,
      featured: values.featured,
    });

    handleClose();
  };

  const handleClose = () => {
    reset();
    setSelectedFile(null);
    if (filePreview) URL.revokeObjectURL(filePreview);
    setFilePreview(null);
    closeUploadModal();
  };

  const isLoading = isSubmitting || isUploadingFile || addImageMutation.isPending;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border-2 border-white/15 bg-[#0a0f18] p-6 sm:p-7 shadow-[10px_10px_0_0_#000] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#4285F4]/20 text-[#4285F4]">
              <Upload size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                Add Photo to Album
              </h3>
              <p className="text-xs text-gray-400 capitalize">
                {slug.replace(/-/g, " ")}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* File Upload Zone */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Select Photo
            </label>
            <div className="relative rounded-2xl border-2 border-dashed border-white/20 bg-black/40 hover:border-[#4285F4]/60 p-4 text-center transition-colors">
              {filePreview || currentUrl ? (
                <div className="relative h-40 w-full overflow-hidden rounded-xl bg-black/60">
                  <img
                    src={filePreview || currentUrl}
                    alt="Preview"
                    className="h-full w-full object-cover object-center"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setFilePreview(null);
                      setValue("url", "");
                    }}
                    className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/80 text-white hover:bg-[#EA4335]"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white mb-2 group-hover:scale-110 transition-transform">
                    <ImageIcon size={22} className="text-[#4285F4]" />
                  </div>
                  <span className="text-xs font-semibold text-white">
                    Click to browse or drop an image
                  </span>
                  <span className="text-[10px] text-gray-400 mt-1">
                    PNG, JPG, WEBP up to 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Or Paste Direct Image URL */}
          {!filePreview && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Or Image URL
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                {...register("url")}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#4285F4] focus:outline-none"
              />
              {errors.url && (
                <p className="mt-1 text-[11px] text-red-400 font-medium">
                  {errors.url.message}
                </p>
              )}
            </div>
          )}

          {/* Caption */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Caption / Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Keynote Presentation by Google Developer Expert"
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
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-bold shadow-[0_0_20px_rgba(66,133,244,0.4)] transition cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload size={14} />
                  <span>Add to Album</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadImageModal;
