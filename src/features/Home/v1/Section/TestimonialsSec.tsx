import React, { useState } from "react";
import { Star, X, Video } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../../../../Components/ScrollReveal";

export interface Testimonial {
  id: string;
  type?: "card" | "video";
  name: string;
  role: string;
  organization: string;
  avatar: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  rating?: number;
  quote?: string;
  year: string;
  linkedinUrl?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  videoDuration?: string;
  videoTitle?: string;
}

const COLUMN_1_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Rahul Verma",
    role: "Google Developer Expert (GDE)",
    organization: "Cloud & Distributed Systems",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    badge: "KEYNOTE SPEAKER",
    badgeBg: "bg-[#FBBC04]",
    badgeText: "text-black",
    rating: 5,
    quote:
      "Speaking at GDG Ranchi was pure inspiration. The developers asked razor-sharp questions about Vertex AI, microservices, and Kubernetes at scale. The production standards and community energy are on par with premier global developer conferences.",
    year: "2024",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "t-4",
    type: "video",
    name: "Dr. Arvind Pathak",
    role: "Department Chair (CSE)",
    organization: "Jharkhand Tech University",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    badge: "ACADEMIC KEYNOTE",
    badgeBg: "bg-[#4285F4]",
    badgeText: "text-white",
    quote:
      "GDG Ranchi has bridged the gap between university syllabus and real production engineering. Students are shipping real open-source systems and securing top internships.",
    videoTitle: "Bridging Academia & Industry with Google Tech",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
    videoDuration: "2:40",
    year: "2024",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "t-2",
    name: "Aman Kumar Singh",
    role: "AI/ML Researcher",
    organization: "IIIT Ranchi",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    badge: "AI HACKATHON WINNER",
    badgeBg: "bg-[#4285F4]",
    badgeText: "text-white",
    rating: 5,
    quote:
      "Building our multimodal accessibility project in the 36-hour GDG Hackathon was exhilarating. The on-site mentors gave us invaluable feedback on Gemini Flash integrations that helped us win 1st place.",
    year: "2024",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "t-3",
    name: "Sneha Roy",
    role: "Full Stack Engineer",
    organization: "Zomato",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    badge: "STUDENT TO ENGINEER",
    badgeBg: "bg-white",
    badgeText: "text-black",
    rating: 5,
    quote:
      "From attending my first meetup in Ranchi back in 2022 to landing my dream role, the code reviews, open-source sprints, and peer network in this community gave me the real-world confidence I needed.",
    year: "2023",
    linkedinUrl: "https://linkedin.com",
  },
];

const COLUMN_2_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-5",
    name: "Priya Kumari",
    role: "WTM Ambassador & Android Dev",
    organization: "Women Techmakers Ranchi",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    badge: "WTM LEAD & ORGANIZER",
    badgeBg: "bg-[#EA4335]",
    badgeText: "text-white",
    rating: 5,
    quote:
      "GDG Ranchi provides an empowering, welcoming sanctuary where women technologists don't just participate—they headline keynotes, lead technical workshops, and launch open-source initiatives across the region.",
    year: "2024",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "t-8",
    type: "video",
    name: "Shreya Mukherjee",
    role: "Flutter Architect & Speaker",
    organization: "FlutterFlow Partner",
    avatar:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
    badge: "SPEAKER STORY",
    badgeBg: "bg-[#34A853]",
    badgeText: "text-white",
    quote:
      "Mentoring over 300+ developers during the cross-platform hackathon was unforgettable. Complete beginners deployed live Flutter applications in a single weekend!",
    videoTitle: "Scaling Cross-Platform Apps with Flutter",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
    videoDuration: "1:55",
    year: "2024",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "t-6",
    name: "Ananya Sharma",
    role: "Frontend Engineer",
    organization: "Swiggy (Ex-BIT Mesra)",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    badge: "COMMUNITY ALUM",
    badgeBg: "bg-[#34A853]",
    badgeText: "text-white",
    rating: 5,
    quote:
      "GDG Ranchi was the real turning point in my tech journey. Attending DevFest codelabs gave me deep practical clarity on Web Vitals and React architecture that directly helped me crack my engineering interviews.",
    year: "2024",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "t-7",
    name: "Harsh Vardhan",
    role: "DevOps & SRE Engineer",
    organization: "Razorpay",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    badge: "CLOUD STUDY JAM LEAD",
    badgeBg: "bg-[#4285F4]",
    badgeText: "text-white",
    rating: 5,
    quote:
      "The hands-on Google Cloud Study Jams organized by GDG Ranchi gave me direct enterprise exposure. Earning my Associate Cloud Engineer certification was a direct result of these workshops.",
    year: "2024",
    linkedinUrl: "https://linkedin.com",
  },
];

const COLUMN_3_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-10",
    name: "Neha Sen",
    role: "Data Scientist",
    organization: "Microsoft",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    badge: "MENTOR & PANELIST",
    badgeBg: "bg-[#4285F4]",
    badgeText: "text-white",
    rating: 5,
    quote:
      "Mentoring ambitious young women and university builders at GDG Ranchi is a privilege. The community's passion for generative AI, ethical models, and modern machine learning frameworks is world-class.",
    year: "2024",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "t-9",
    type: "video",
    name: "Abhishek Raj",
    role: "Core Builder & Engineer",
    organization: "Jharkhand Open Source",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    badge: "COMMUNITY BUILDER",
    badgeBg: "bg-[#FBBC04]",
    badgeText: "text-black",
    quote:
      "We united student contributors from 8 colleges across Ranchi to build real production tooling. The growth mindset in this chapter is completely infectious!",
    videoTitle: "Building Open Source in Ranchi",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
    videoDuration: "3:10",
    year: "2024",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "t-11",
    name: "Rohit Choudhary",
    role: "Full-Stack Builder",
    organization: "BIT Sindri",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    badge: "COMMUNITY SCHOLAR",
    badgeBg: "bg-white",
    badgeText: "text-black",
    rating: 5,
    quote:
      "Traveling from Sindri to attend DevFest Ranchi was the best investment I ever made. The networking sessions helped me find my co-founder and connected us directly with early angel investors.",
    year: "2023",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "t-12",
    name: "Tanvi Gupta",
    role: "Cloud Architect",
    organization: "Certified GCP Architect",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
    badge: "CLOUD INNOVATOR",
    badgeBg: "bg-[#EA4335]",
    badgeText: "text-white",
    rating: 5,
    quote:
      "The deep-dive technical workshops on serverless architectures and Google Kubernetes Engine gave me the exact hands-on experience needed for enterprise infrastructure design.",
    year: "2024",
    linkedinUrl: "https://linkedin.com",
  },
];

// Standard Card Testimonial (Inspired by NamasteDev: large avatar, crisp name/role/company in color, top-right LinkedIn, readable quote, stars)
const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => (
  <div className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-white/15 bg-[#0c0f17]/95 hover:border-white/30 transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,255,255,0.08)] hover:-translate-y-1 backdrop-blur-md overflow-hidden shrink-0 text-left min-h-[250px]">
    {/* Subtle inner hover glow */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

    <div>
      {/* Header: Large avatar, name, role, colored company & LinkedIn */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-13 h-13 sm:w-15 sm:h-15 rounded-full object-cover ring-2 ring-white/15 shrink-0 shadow-md"
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors truncate">
              {item.name}
            </h4>
            <p className="text-xs sm:text-sm font-medium text-gray-300 truncate">
              {item.role}
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#4285F4] truncate">
              {item.organization}
            </p>
          </div>
        </div>

        {item.linkedinUrl && (
          <a
            href={item.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0A66C2] hover:text-sky-300 bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 p-2 rounded-xl transition-all shrink-0"
            title="LinkedIn Profile"
          >
            <FaLinkedin size={18} />
          </a>
        )}
      </div>

      {/* Testimonial Quote: Increased font size, weight, and line-height for high readability */}
      <p className="text-sm sm:text-[15.5px] leading-relaxed text-gray-200 font-normal">
        "{item.quote}"
      </p>
    </div>

    {/* Footer: 5 Stars & Community Pill Badge */}
    <div className="mt-5 flex items-center justify-between pt-3.5 border-t border-white/10 text-xs">
      <div className="flex items-center gap-1 text-[#FBBC04]">
        {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
          <Star key={i} size={14} className="fill-[#FBBC04] text-[#FBBC04]" />
        ))}
      </div>
      <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold tracking-wider text-gray-300 uppercase">
        {item.badge}
      </span>
    </div>
  </div>
);

// Video Testimonial Component (Directly inspired by NamasteDev: Tall poster card, inner dashed border, stacked first/last name with pill, sparkles, tall portrait photo with center play button, warm amber quote bubble with stars, and bottom tag)
const VideoTestimonialCard: React.FC<{
  item: Testimonial;
  onPlay: (item: Testimonial) => void;
}> = ({ item, onPlay }) => {
  const parts = item.name.split(" ");
  const firstName = parts[0] || item.name;
  const lastName = parts.slice(1).join(" ") || "SPEAKER";

  return (
    <div
      onClick={() => onPlay(item)}
      className="group relative flex flex-col justify-between rounded-3xl border-2 border-[#1e3450] bg-[#071322]/95 hover:border-[#4285F4] transition-all duration-300 hover:shadow-[0_0_45px_rgba(66,133,244,0.3)] hover:-translate-y-1 backdrop-blur-md overflow-hidden shrink-0 cursor-pointer text-left p-3 sm:p-3.5 min-h-[480px] sm:min-h-[530px]"
    >
      {/* Inner Dashed Decorative Container matching NamasteDev */}
      <div className="p-4 sm:p-5 rounded-2xl border border-dashed border-sky-400/30 bg-[#0b1a2e]/85 flex flex-col justify-between h-full">
        {/* Top Header: Sparkles + Stylized Stacked Name */}
        <div className="relative w-full flex flex-col items-center text-center mb-2.5">
          <span className="absolute -top-1 right-0 text-amber-300 text-lg sm:text-xl font-bold select-none animate-pulse">
            ✦✨
          </span>
          <h3 className="text-base sm:text-lg font-black tracking-widest text-slate-100 uppercase">
            {firstName}
          </h3>
          <div className="mt-1">
            <span className="inline-block bg-[#c2d7ed] text-[#071322] font-black text-xs sm:text-sm px-4 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              {lastName}
            </span>
          </div>
        </div>

        {/* Tall Portrait Photo with Center Glowing Play Button */}
        <div className="relative w-full h-[250px] sm:h-[285px] rounded-xl overflow-hidden my-2 shadow-inner border border-white/10 group-hover:border-sky-400/40 transition-colors">
          <img
            src={item.videoThumbnail || item.avatar}
            alt={item.videoTitle || item.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

          {/* Center Glowing Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-white text-slate-900 group-hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.7)] group-hover:bg-[#EA4335] group-hover:text-white transition-all duration-300">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current ml-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Video duration pill */}
          {item.videoDuration && (
            <span className="absolute bottom-2.5 right-2.5 bg-black/85 border border-white/20 px-2.5 py-0.5 rounded text-[11px] font-bold text-white tracking-wider backdrop-blur-md shadow">
              {item.videoDuration}
            </span>
          )}
        </div>

        {/* Warm Amber Speech Bubble with 5 Stars & Quote Snippet (NamasteDev style) */}
        <div className="w-full mt-2 bg-gradient-to-b from-[#f59e0b] to-[#d97706] text-black rounded-xl p-3 sm:p-3.5 shadow-lg border border-amber-300/40 text-center">
          <div className="flex items-center justify-center gap-1 text-[#451a03] mb-1">
            {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
              <Star key={i} size={13} className="fill-[#451a03] text-[#451a03]" />
            ))}
          </div>
          <p className="text-xs sm:text-[13px] font-bold text-neutral-950 leading-snug line-clamp-2">
            "{item.quote}"
          </p>
        </div>

        {/* Bottom Tag */}
        <div className="w-full mt-3 flex items-center justify-between text-xs text-sky-200/60 font-medium px-1 pt-1">
          <span className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-[11px] text-sky-300">
            <Video size={13} className="text-[#EA4335]" />
            Video Testimonial
          </span>
          <span className="text-[11px] text-white/50">{item.year}</span>
        </div>
      </div>
    </div>
  );
};

export const TestimonialsSec: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null);

  const handleOpenVideo = (item: Testimonial) => {
    setActiveVideo(item);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-x-clip bg-black px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-[8%] lg:py-[10vh] xl:px-[10%] text-white selection:bg-[#FBBC04]/30"
    >
      {/* Top subtle divider matching SponsorsSec */}
      <div className="mb-14 sm:mb-16 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Precision amber grid texture matching the inspiration screenshot */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_95%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(251, 188, 4, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(251, 188, 4, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "46px 46px",
        }}
      />

      {/* Ambient center blur glow behind title */}
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[260px] w-[560px] rounded-full bg-gradient-to-r from-[#4285F4]/12 via-[#FBBC04]/12 to-[#34A853]/12 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FBBC04] shadow-[0_0_8px_#FBBC04]" />
              ✦ WALL OF LOVE • GDG RANCHI
            </div>

            <h2 className="mt-5 text-3xl sm:text-5xl md:text-6xl font-black tracking-[-0.04em] text-white leading-tight">
              Loved by Developers,
              <br />
              <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] bg-clip-text text-transparent">
                Inspiring the Next Generation
              </span>
            </h2>

            <p className="mt-3.5 text-sm sm:text-base text-gray-300 max-w-lg mx-auto leading-relaxed">
              Real video stories & testimonials of mentorship, engineering, and career impact.
            </p>
          </div>
        </ScrollReveal>

        {/* 3-Column Moving Vertical Marquee (Bottom to Top, Pause on Hover, Tall generous height) */}
        <div className="relative mt-8 sm:mt-10 h-[720px] sm:h-[880px] lg:h-[940px] overflow-hidden">
          {/* Top & Bottom Gradient Fades */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 sm:h-36 bg-gradient-to-b from-black via-black/90 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 sm:h-36 bg-gradient-to-t from-black via-black/90 to-transparent" />

          {/* 3 Vertical Moving Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 h-full">
            {/* COLUMN 1 */}
            <div className="overflow-hidden">
              <div
                className="animate-marquee-up flex flex-col gap-6 sm:gap-7"
                style={{ "--marquee-duration": "42s" } as React.CSSProperties}
              >
                {COLUMN_1_TESTIMONIALS.map((item, idx) =>
                  item.type === "video" ? (
                    <VideoTestimonialCard
                      key={`col1-orig-${item.id}-${idx}`}
                      item={item}
                      onPlay={handleOpenVideo}
                    />
                  ) : (
                    <TestimonialCard key={`col1-orig-${item.id}-${idx}`} item={item} />
                  )
                )}
                {COLUMN_1_TESTIMONIALS.map((item, idx) =>
                  item.type === "video" ? (
                    <VideoTestimonialCard
                      key={`col1-dup-${item.id}-${idx}`}
                      item={item}
                      onPlay={handleOpenVideo}
                    />
                  ) : (
                    <TestimonialCard key={`col1-dup-${item.id}-${idx}`} item={item} />
                  )
                )}
              </div>
            </div>

            {/* COLUMN 2 (Visible on tablet & desktop) */}
            <div className="hidden md:block overflow-hidden">
              <div
                className="animate-marquee-up flex flex-col gap-6 sm:gap-7"
                style={{ "--marquee-duration": "50s" } as React.CSSProperties}
              >
                {COLUMN_2_TESTIMONIALS.map((item, idx) =>
                  item.type === "video" ? (
                    <VideoTestimonialCard
                      key={`col2-orig-${item.id}-${idx}`}
                      item={item}
                      onPlay={handleOpenVideo}
                    />
                  ) : (
                    <TestimonialCard key={`col2-orig-${item.id}-${idx}`} item={item} />
                  )
                )}
                {COLUMN_2_TESTIMONIALS.map((item, idx) =>
                  item.type === "video" ? (
                    <VideoTestimonialCard
                      key={`col2-dup-${item.id}-${idx}`}
                      item={item}
                      onPlay={handleOpenVideo}
                    />
                  ) : (
                    <TestimonialCard key={`col2-dup-${item.id}-${idx}`} item={item} />
                  )
                )}
              </div>
            </div>

            {/* COLUMN 3 (Visible on desktop) */}
            <div className="hidden lg:block overflow-hidden">
              <div
                className="animate-marquee-up flex flex-col gap-6 sm:gap-7"
                style={{ "--marquee-duration": "46s" } as React.CSSProperties}
              >
                {COLUMN_3_TESTIMONIALS.map((item, idx) =>
                  item.type === "video" ? (
                    <VideoTestimonialCard
                      key={`col3-orig-${item.id}-${idx}`}
                      item={item}
                      onPlay={handleOpenVideo}
                    />
                  ) : (
                    <TestimonialCard key={`col3-orig-${item.id}-${idx}`} item={item} />
                  )
                )}
                {COLUMN_3_TESTIMONIALS.map((item, idx) =>
                  item.type === "video" ? (
                    <VideoTestimonialCard
                      key={`col3-dup-${item.id}-${idx}`}
                      item={item}
                      onPlay={handleOpenVideo}
                    />
                  ) : (
                    <TestimonialCard key={`col3-dup-${item.id}-${idx}`} item={item} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Video Modal Lightbox (Inspired by Image 2: "What our community says") */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseVideo}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl border-2 border-white/20 bg-[#0b1625] p-5 sm:p-7 shadow-[12px_12px_0_0_#000] overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#FBBC04] shadow-[0_0_8px_#FBBC04]" />
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    What our community says
                  </h3>
                </div>

                <button
                  onClick={handleCloseVideo}
                  aria-label="Close video"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video Player Embed */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl">
                <iframe
                  src={`${activeVideo.videoUrl}?autoplay=1`}
                  title={activeVideo.videoTitle || activeVideo.name}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Speaker Info & Full Quote */}
              <div className="mt-5 flex items-start gap-4">
                <img
                  src={activeVideo.avatar}
                  alt={activeVideo.name}
                  className="w-13 h-13 rounded-full object-cover ring-2 ring-white/15 shrink-0"
                />
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">
                      {activeVideo.name}
                    </h4>
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${activeVideo.badgeBg} ${activeVideo.badgeText}`}
                    >
                      {activeVideo.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {activeVideo.role} •{" "}
                    <span className="text-sky-400 font-semibold">
                      {activeVideo.organization}
                    </span>
                  </p>
                  {activeVideo.quote && (
                    <p className="mt-2.5 text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
                      "{activeVideo.quote}"
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialsSec;
