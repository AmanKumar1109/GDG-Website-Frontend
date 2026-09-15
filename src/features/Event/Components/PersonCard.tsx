import { ExternalLink, Globe, Link2, MessageSquare, Briefcase, Video, Camera } from "lucide-react";
import { motion } from "framer-motion";
import type { ApiSocialLinks } from "../../Member/v1/type/MemberDetails.type";

interface PersonProps {
  firstName: string;
  lastName: string;
  imageUrl?: string;
  Bio?: string;
  role?: string;
  socialLinks?: ApiSocialLinks;
}

const getSocialIcon = (key: string) => {
  const k = key.toLowerCase();
  if (k.includes("github")) return <ExternalLink size={14} strokeWidth={2.5} />;
  if (k.includes("linkedin")) return <Briefcase size={14} strokeWidth={2.5} />;
  if (k.includes("twitter") || k.includes("x.com")) return <MessageSquare size={14} strokeWidth={2.5} />;
  if (k.includes("youtube")) return <Video size={14} strokeWidth={2.5} />;
  if (k.includes("instagram")) return <Camera size={14} strokeWidth={2.5} />;
  if (k.includes("website") || k.includes("portfolio") || k.includes("medium")) return <Globe size={14} strokeWidth={2.5} />;
  return <Link2 size={14} strokeWidth={2.5} />;
};

const PersonCard = ({ firstName, lastName, imageUrl, Bio, role, socialLinks }: PersonProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-1.5 transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      {/* Inner wrapper for padding and content */}
      <div className="flex h-full flex-col rounded-[1.75rem] bg-white/[0.02] p-5 sm:p-6">
        
        {/* Header: Avatar + Name/Role */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full border border-white/20 bg-black">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`${firstName} ${lastName}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/5 text-lg sm:text-xl font-bold text-white/50">
                {firstName.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
              {firstName} {lastName}
            </h4>
            {role && (
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-400 mt-1 truncate">
                {role}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        {Bio && (
          <p className="text-xs sm:text-sm text-white/50 leading-relaxed line-clamp-3 mb-5 sm:mb-6 flex-1">
            {Bio}
          </p>
        )}

        {/* Footer: Social Links */}
        {socialLinks && Object.values(socialLinks).some(url => url) && (
          <div className="mt-auto pt-4 flex flex-wrap items-center gap-2 border-t border-white/5">
            {Object.entries(socialLinks).map(([key, url]) => {
              if (!url) return null;
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white"
                  title={key}
                >
                  {getSocialIcon(key)}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PersonCard;
