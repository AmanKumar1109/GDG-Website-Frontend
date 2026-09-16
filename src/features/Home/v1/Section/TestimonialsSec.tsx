import React, { useState } from "react";
import { Star, Quote, CheckCircle2, Calendar, Play, X, Video } from "lucide-react";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
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
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    badge: "KEYNOTE SPEAKER",
    badgeBg: "bg-[#FBBC04]",
    badgeText: "text-black",
    rating: 5,
    quote:
      "Speaking at GDG Ranchi was pure inspiration. The developers asked razor-sharp questions about Vertex AI, microservices, and Kubernetes at scale. The production standards and energy are on par with global developer conferences.",
    year: "2024",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "t-2",
    name: "Aman Kumar Singh",
    role: "AI/ML Researcher",
    organization: "IIIT Ranchi",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
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
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
    badge: "STUDENT TO ENGINEER",
    badgeBg: "bg-white",
    badgeText: "text-black",
    rating: 5,
    quote:
      "From attending my first meetup in Ranchi back in 2022 to landing my dream role, the code reviews, open-source sprints, and peer network in this community gave me the real-world confidence I needed.",
    year: "2023",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "t-4",
    type: "video",
    name: "Dr. Arvind Pathak",
    role: "Department Chair (CSE)",
    organization: "Jharkhand Tech University",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80",
    badge: "ACADEMIC KEYNOTE",
    badgeBg: "bg-[#4285F4]",
    badgeText: "text-white",
    quote:
      "GDG Ranchi plays a pivotal role bridging traditional academia and real-world tech industry practices for thousands of undergraduate students.",
    videoTitle: "Bridging Academia & Industry with Google Tech",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    videoDuration: "2:40",
    year: "2024",
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
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    badge: "WTM LEAD & ORGANIZER",
    badgeBg: "bg-[#EA4335]",
    badgeText: "text-white",
    rating: 5,
    quote:
      "GDG Ranchi provides an empowering, welcoming sanctuary where women technologists don't just participate—they headline keynotes, lead technical workshops, and launch open-source initiatives.",
    year: "2024",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "t-6",
    name: "Ananya Sharma",
    role: "Frontend Engineer",
    organization: "Swiggy (Ex-BIT Mesra)",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
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
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
    badge: "CLOUD STUDY JAM LEAD",
    badgeBg: "bg-[#4285F4]",
    badgeText: "text-white",
    rating: 5,
    quote:
      "The hands-on Google Cloud Study Jams organized by GDG Ranchi gave me direct enterprise exposure. Earning my Associate Cloud Engineer certification was a direct result of these workshops.",
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
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=256&q=80",
    badge: "SPEAKER STORY",
    badgeBg: "bg-[#34A853]",
    badgeText: "text-white",
    quote:
      "Mentoring over 300+ students during cross-platform hackathons was unforgettable. Complete beginners deployed live Flutter applications in a single weekend!",
    videoTitle: "Scaling Cross-Platform Apps with Flutter",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    videoDuration: "1:55",
    year: "2024",
    linkedinUrl: "https://linkedin.com",
  },
];

const COLUMN_3_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-9",
    type: "video",
    name: "Abhishek Raj",
    role: "Core Builder & Engineer",
    organization: "Jharkhand Open Source",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&q=80",
    badge: "COMMUNITY BUILDER",
    badgeBg: "bg-[#FBBC04]",
    badgeText: "text-black",
    quote:
      "Recap of our regional open-source initiative: uniting student contributors from 8 colleges across Ranchi to build real production tooling.",
    videoTitle: "Building Open Source in Ranchi",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    videoDuration: "3:10",
    year: "2024",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: "t-10",
    name: "Neha Sen",
    role: "Data Scientist",
    organization: "Microsoft",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
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
    id: "t-11",
    name: "Rohit Choudhary",
    role: "Full-Stack Builder",
    organization: "BIT Sindri",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
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
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=256&q=80",
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

const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => (
  <div className="group relative flex flex-col justify-between p-6 rounded-2xl border-2 border-white/10 bg-[#09090d]/95 hover:border-[#FBBC04] transition-all duration-300 hover:shadow-[0_0_35px_rgba(251,188,4,0.18)] hover:-translate-y-1 backdrop-blur-md overflow-hidden shrink-0">
    {/* Subtle inner hover gradient */}
    <div className="absolute inset-0 bg-gradient-to-tr from-[#FBBC04]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

    <div>
      {/* Header: Devfest-style Badge & Year */}
      <div className="flex items-center justify-between gap-2 mb-3.5">
        <span
          className={`inline-block ${item.badgeBg} ${item.badgeText} border-2 border-black rounded-full px-3 py-0.5 text-[10px] font-black tracking-wider uppercase shadow-[2px_2px_0_0_#000]`}
        >
          {item.badge}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/40">
          <Calendar size={12} />
          {item.year}
        </span>
      </div>

      {/* 5-Star Rating */}
      <div className="flex items-center gap-1 text-[#FBBC04] mb-3">
        {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
          <Star key={i} size={13} className="fill-[#FBBC04] text-[#FBBC04]" />
        ))}
      </div>

      {/* Quote with quote icon accent */}
      <div className="relative">
        <Quote
          size={20}
          className="absolute -left-1 -top-1 opacity-20 text-[#FBBC04] group-hover:opacity-40 transition-opacity"
        />
        <p className="relative z-10 text-xs sm:text-sm leading-relaxed text-gray-300 group-hover:text-white transition-colors pl-3.5">
          "{item.quote}"
        </p>
      </div>
    </div>

    {/* Author Footer */}
    <div className="mt-5 flex items-center justify-between pt-3.5 border-t border-white/[0.08]">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="relative p-[1.5px] rounded-full bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#34A853] shrink-0">
          <img
            src={item.avatar}
            alt={item.name}
            className="h-9 w-9 rounded-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs sm:text-sm font-bold text-white transition-colors group-hover:text-[#FBBC04] truncate">
              {item.name}
            </h4>
            <CheckCircle2 size={13} className="text-[#34A853] shrink-0" />
          </div>
          <p className="text-[11px] text-gray-400 truncate">
            {item.role} • <span className="text-white/70">{item.organization}</span>
          </p>
        </div>
      </div>

      {item.linkedinUrl && (
        <a
          href={item.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/30 hover:text-[#0A66C2] transition-colors p-1.5 shrink-0"
          title="LinkedIn Profile"
        >
          <FaLinkedin size={15} />
        </a>
      )}
    </div>
  </div>
);

// Video Testimonial Component
const VideoTestimonialCard: React.FC<{
  item: Testimonial;
  onPlay: (item: Testimonial) => void;
}> = ({ item, onPlay }) => (
  <div className="group relative flex flex-col justify-between p-5 rounded-2xl border-2 border-white/15 bg-[#0e0e14]/95 hover:border-[#EA4335] transition-all duration-300 hover:shadow-[0_0_35px_rgba(234,67,53,0.22)] hover:-translate-y-1 backdrop-blur-md overflow-hidden shrink-0">
    <div>
      {/* Header: Video Badge & Duration */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 bg-[#EA4335] text-white border-2 border-black rounded-full px-2.5 py-0.5 text-[10px] font-black tracking-wider uppercase shadow-[2px_2px_0_0_#000]">
          <FaYoutube size={12} />
          <span>VIDEO STORY</span>
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/40">
          <Calendar size={12} />
          {item.year}
        </span>
      </div>

      {/* Video Poster Thumbnail with Glowing Play Button */}
      <div
        onClick={() => onPlay(item)}
        className="relative h-[180px] sm:h-[200px] rounded-xl overflow-hidden cursor-pointer border border-white/10 group-hover:border-white/20 transition-all mb-3.5"
      >
        <img
          src={item.videoThumbnail || item.avatar}
          alt={item.videoTitle || item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        {/* Duration badge */}
        {item.videoDuration && (
          <div className="absolute bottom-2.5 right-2.5 bg-black/80 border border-white/20 px-2 py-0.5 rounded text-[10px] font-bold text-white tracking-wider backdrop-blur-md">
            {item.videoDuration}
          </div>
        )}

        {/* Video title overlay */}
        {item.videoTitle && (
          <div className="absolute bottom-2.5 left-2.5 right-14 text-left">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#FBBC04] uppercase tracking-wider">
              <Video size={11} />
              Featured Story
            </span>
            <h4 className="text-xs font-bold text-white truncate drop-shadow-md">
              {item.videoTitle}
            </h4>
          </div>
        )}

        {/* Center Animated Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white text-black group-hover:scale-110 shadow-[0_0_25px_rgba(255,255,255,0.45)] group-hover:bg-[#EA4335] group-hover:text-white transition-all duration-300">
            <Play size={18} className="fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Snippet / Quote text */}
      {item.quote && (
        <p className="text-xs sm:text-sm leading-relaxed text-gray-300 group-hover:text-white transition-colors line-clamp-2">
          "{item.quote}"
        </p>
      )}
    </div>

    {/* Author Footer */}
    <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/[0.08]">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="relative p-[1.5px] rounded-full bg-gradient-to-tr from-[#EA4335] via-[#FBBC04] to-[#4285F4] shrink-0">
          <img
            src={item.avatar}
            alt={item.name}
            className="h-9 w-9 rounded-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1 text-left">
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#EA4335] transition-colors truncate">
              {item.name}
            </h4>
            <CheckCircle2 size={13} className="text-[#34A853] shrink-0" />
          </div>
          <p className="text-[11px] text-gray-400 truncate">
            {item.role} • <span className="text-white/70">{item.organization}</span>
          </p>
        </div>
      </div>

      {item.linkedinUrl && (
        <a
          href={item.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/30 hover:text-[#0A66C2] transition-colors p-1.5 shrink-0"
          title="LinkedIn Profile"
        >
          <FaLinkedin size={15} />
        </a>
      )}
    </div>
  </div>
);

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
      className="relative overflow-x-clip bg-black/20 px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-[8%] lg:py-[10vh] xl:px-[10%] text-white selection:bg-[#FBBC04]/30"
    >
      {/* Top subtle divider matching SponsorsSec */}
      <div className="mb-14 sm:mb-16 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Precision tech grid with radial edge mask matching SponsorsSec */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_95%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient center blur glow behind title */}
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[260px] w-[560px] rounded-full bg-gradient-to-r from-[#4285F4]/12 via-[#FBBC04]/12 to-[#34A853]/12 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        {/* Section Header: Centered & punchy matching 3-column vertical marquee */}
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

            <p className="mt-3.5 text-sm sm:text-base text-gray-400 max-w-lg mx-auto leading-relaxed">
              Real video stories & testimonials of mentorship, engineering, and career impact.
            </p>
          </div>
        </ScrollReveal>

        {/* 3-Column Moving Vertical Marquee (NamasteDev style: Bottom to Top, Pause on Hover) */}
        <div className="relative mt-6 sm:mt-8 h-[600px] sm:h-[88vh] overflow-hidden">
          {/* Top & Bottom Gradient Fades with subtle backdrop blur */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 sm:h-36 bg-gradient-to-b from-black via-black/85 to-transparent backdrop-blur-[2px]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 sm:h-36 bg-gradient-to-t from-black via-black/85 to-transparent backdrop-blur-[2px]" />

          {/* 3 Vertical Moving Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 h-full">
            {/* COLUMN 1 */}
            <div className="overflow-hidden">
              <div
                className="animate-marquee-up flex flex-col gap-5 sm:gap-6"
                style={{ "--marquee-duration": "32s" } as React.CSSProperties}
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
                className="animate-marquee-up flex flex-col gap-5 sm:gap-6"
                style={{ "--marquee-duration": "40s" } as React.CSSProperties}
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
                className="animate-marquee-up flex flex-col gap-5 sm:gap-6"
                style={{ "--marquee-duration": "35s" } as React.CSSProperties}
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

      {/* Interactive Video Modal Lightbox */}
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
              className="relative w-full max-w-3xl rounded-3xl border-2 border-white/20 bg-[#0e0e16] p-4 sm:p-6 shadow-[10px_10px_0_0_#000] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={activeVideo.avatar}
                    alt={activeVideo.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                      {activeVideo.name}
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${activeVideo.badgeBg} ${activeVideo.badgeText}`}
                      >
                        {activeVideo.badge}
                      </span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      {activeVideo.role} • {activeVideo.organization}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCloseVideo}
                  aria-label="Close video"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video Player Embed */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
                <iframe
                  src={`${activeVideo.videoUrl}?autoplay=1`}
                  title={activeVideo.videoTitle || activeVideo.name}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer Description */}
              {activeVideo.quote && (
                <p className="mt-4 text-xs sm:text-sm text-gray-300 italic">
                  "{activeVideo.quote}"
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialsSec;
