import React, { useRef } from "react";
import {
  ArrowRight,
  Sparkles,
  Building2,
  BookOpen,
  Users,
  GraduationCap,
  Code2,
} from "lucide-react";
import { FaGoogle, FaGithub, FaDiscord, FaAws } from "react-icons/fa";
import {
  SiGooglecloud,
  SiAndroid,
  SiFlutter,
  SiFirebase,
  SiPostman,
  SiJetbrains,
  SiDocker,
  SiVercel,
  SiStripe,
  SiSupabase,
  SiMongodb,
  SiCloudflare,
  SiTensorflow,
  SiRedis,
  SiTailwindcss,
} from "react-icons/si";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface SponsorItem {
  name: string;
  category: string;
  url: string;
  icon: React.ReactNode;
}

// 6 Flagship Gold Sponsors
const GOLD_SPONSORS: SponsorItem[] = [
  {
    name: "Google for Developers",
    category: "Title & Flagship Partner",
    url: "https://developers.google.com",
    icon: <FaGoogle className="text-2xl text-[#4285F4]" />,
  },
  {
    name: "Google Cloud",
    category: "Cloud & Vertex AI Partner",
    url: "https://cloud.google.com",
    icon: <SiGooglecloud className="text-2xl text-[#34A853]" />,
  },
  {
    name: "GitHub",
    category: "Developer Platform Partner",
    url: "https://github.com",
    icon: <FaGithub className="text-2xl text-white" />,
  },
  {
    name: "JetBrains",
    category: "Engineering IDE Partner",
    url: "https://www.jetbrains.com",
    icon: <SiJetbrains className="text-2xl text-[#FBBC04]" />,
  },
  {
    name: "MongoDB",
    category: "Modern Database Partner",
    url: "https://www.mongodb.com",
    icon: <SiMongodb className="text-2xl text-[#47A248]" />,
  },
  {
    name: "AWS Cloud",
    category: "Infrastructure Partner",
    url: "https://aws.amazon.com",
    icon: <FaAws className="text-2xl text-[#FF9900]" />,
  },
];

// 12 Premier Tech & Tooling Silver Sponsors
const SILVER_SPONSORS: SponsorItem[] = [
  {
    name: "Android",
    category: "Mobile Ecosystem",
    url: "https://developer.android.com",
    icon: <SiAndroid className="text-xl text-[#3DDC84]" />,
  },
  {
    name: "Flutter",
    category: "Multi-Platform UI",
    url: "https://flutter.dev",
    icon: <SiFlutter className="text-xl text-[#54C5F8]" />,
  },
  {
    name: "Firebase",
    category: "Realtime Backend",
    url: "https://firebase.google.com",
    icon: <SiFirebase className="text-xl text-[#FFCA28]" />,
  },
  {
    name: "Postman",
    category: "API Lifecycle",
    url: "https://www.postman.com",
    icon: <SiPostman className="text-xl text-[#FF6C37]" />,
  },
  {
    name: "Docker",
    category: "Container Engine",
    url: "https://www.docker.com",
    icon: <SiDocker className="text-xl text-[#2496ED]" />,
  },
  {
    name: "Vercel",
    category: "Frontend Cloud",
    url: "https://vercel.com",
    icon: <SiVercel className="text-xl text-white" />,
  },
  {
    name: "Supabase",
    category: "Open Postgres",
    url: "https://supabase.com",
    icon: <SiSupabase className="text-xl text-[#3ECF8E]" />,
  },
  {
    name: "Stripe",
    category: "Payments Infra",
    url: "https://stripe.com",
    icon: <SiStripe className="text-xl text-[#635BFF]" />,
  },
  {
    name: "TensorFlow",
    category: "Machine Learning",
    url: "https://www.tensorflow.org",
    icon: <SiTensorflow className="text-xl text-[#FF6F00]" />,
  },
  {
    name: "Cloudflare",
    category: "Edge & Security",
    url: "https://www.cloudflare.com",
    icon: <SiCloudflare className="text-xl text-[#F38020]" />,
  },
  {
    name: "Redis",
    category: "In-Memory Cache",
    url: "https://redis.io",
    icon: <SiRedis className="text-xl text-[#DC382D]" />,
  },
  {
    name: "Tailwind CSS",
    category: "Modern Styling",
    url: "https://tailwindcss.com",
    icon: <SiTailwindcss className="text-xl text-[#06B6D4]" />,
  },
];

// 8 Regional Academic & Community Chapters
const COMMUNITY_PARTNERS: SponsorItem[] = [
  {
    name: "BIT Mesra",
    category: "Premier Engineering",
    url: "https://www.bitmesra.ac.in",
    icon: <Building2 className="text-lg text-[#8AB4F8]" />,
  },
  {
    name: "IIT (ISM) Dhanbad",
    category: "Institute of Eminence",
    url: "https://www.iitism.ac.in",
    icon: <BookOpen className="text-lg text-[#FBBC04]" />,
  },
  {
    name: "Women Techmakers",
    category: "Diversity & Inclusion",
    url: "https://developers.google.com/womentechmakers",
    icon: <Users className="text-lg text-[#EA4335]" />,
  },
  {
    name: "Discord Developers",
    category: "Community Chat Hub",
    url: "https://discord.gg/gdgranchi",
    icon: <FaDiscord className="text-lg text-[#5865F2]" />,
  },
  {
    name: "JTU Jharkhand",
    category: "State Technical Univ",
    url: "https://www.jtu.ac.in",
    icon: <GraduationCap className="text-lg text-[#34A853]" />,
  },
  {
    name: "Jharkhand Open Source",
    category: "Regional Builder Guild",
    url: "https://gdgranchi.in",
    icon: <Code2 className="text-lg text-[#34A853]" />,
  },
  {
    name: "NIFFT Ranchi",
    category: "Manufacturing Tech",
    url: "http://www.nifft.ac.in",
    icon: <Building2 className="text-lg text-[#EA4335]" />,
  },
  {
    name: "Ranchi University",
    category: "Academic Partner",
    url: "https://www.ranchiuniversity.ac.in",
    icon: <GraduationCap className="text-lg text-[#8AB4F8]" />,
  },
];

export const SponsorsSec: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".sponsor-card-anim",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="sponsors"
      className="relative overflow-x-clip bg-black px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-[8%] lg:py-[10vh] xl:px-[10%] text-white selection:bg-[#FBBC04]/30"
    >
      {/* Top subtle divider matching preceding sections */}
      <div className="mb-14 sm:mb-16 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* High-contrast precision tech grid with radial edge mask for pure black bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_95%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.14) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Vibrant Google-brand ambient glows for bg-black */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[450px] w-[450px] rounded-full bg-[#4285F4]/[0.08] blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[450px] w-[450px] rounded-full bg-[#FBBC04]/[0.08] blur-[150px]" />
      <div className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 h-[350px] w-[500px] rounded-full bg-[#EA4335]/[0.05] blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center">
            <span className="rounded-full border border-white/15 bg-white/[0.06] px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur">
              ✦ THANKS TO OUR SUPPORTERS
            </span>
          </div>

          {/* Title */}
          <h2 className="mt-6 text-3xl sm:text-5xl md:text-6xl font-black tracking-[-0.04em] text-white leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-[#FBBC04] via-[#EA4335] to-[#4285F4] bg-clip-text text-transparent">
              Sponsors
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Thanks to our sponsors for supporting DevFest Ranchi. Want to sponsor? Reach us at{" "}
            <a
              href="mailto:gdg.ranchi@gmail.com?subject=DevFest%20Ranchi%202026%20Sponsorship%20Inquiry"
              className="font-semibold text-white underline underline-offset-4 decoration-[#FBBC04] hover:text-[#FBBC04] transition-colors"
            >
              gdg.ranchi@gmail.com
            </a>
          </p>
        </div>

        {/* Sponsor Tiers */}
        <div className="mt-12 sm:mt-16 space-y-12 sm:space-y-16">
          {/* TIER 1: GOLD SPONSORS (6 Premier Cards) */}
          <div className="text-center">
            <div className="inline-block bg-[#FBBC04] border-2 border-black rounded-full px-5 py-1.5 text-xs font-black tracking-widest text-black shadow-[2px_2px_0_0_#000] uppercase hover:scale-105 transition-transform duration-200 cursor-default">
              GOLD SPONSORS
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-6 max-w-6xl mx-auto">
              {GOLD_SPONSORS.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-card-anim group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-white/10 bg-[#09090d]/90 hover:border-[#FBBC04] hover:bg-[#111118] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(251,188,4,0.18)] backdrop-blur-md overflow-hidden min-h-[120px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FBBC04]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="flex items-center gap-3.5 w-full justify-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition-transform duration-300 group-hover:scale-110">
                      {sponsor.icon}
                    </div>
                    <div className="text-left min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-white transition-colors group-hover:text-[#FBBC04] truncate">
                        {sponsor.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 transition-colors group-hover:text-gray-300 truncate">
                        {sponsor.category}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* TIER 2: SILVER & TECH PARTNERS (12 Tech Cards) */}
          <div className="text-center">
            <div className="inline-block bg-white text-black border-2 border-black rounded-full px-5 py-1.5 text-xs font-black tracking-widest shadow-[2px_2px_0_0_#000] uppercase hover:scale-105 transition-transform duration-200 cursor-default">
              SILVER & TECH PARTNERS
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mt-6 max-w-6xl mx-auto">
              {SILVER_SPONSORS.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-card-anim group relative flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-[#09090c]/80 hover:border-white/30 hover:bg-[#121217] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] backdrop-blur-sm min-h-[88px]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] mb-2 transition-transform duration-200 group-hover:scale-110">
                    {sponsor.icon}
                  </div>
                  <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors truncate max-w-full px-1">
                    {sponsor.name}
                  </span>
                  <span className="text-[10px] text-gray-400 truncate max-w-full">
                    {sponsor.category}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* TIER 3: ACADEMIC & REGIONAL CHAPTERS (8 Institutions) */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/75">
              <Sparkles size={12} className="text-[#34A853]" />
              Academic & Regional Chapters
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 mt-5 max-w-6xl mx-auto">
              {COMMUNITY_PARTNERS.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-card-anim group relative flex flex-col items-center justify-center p-3.5 rounded-xl border border-white/10 bg-[#08080a]/60 hover:border-white/25 hover:bg-[#101015] transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm min-h-[82px]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] mb-1.5 transition-transform duration-200 group-hover:scale-105">
                    {partner.icon}
                  </div>
                  <span className="text-xs font-semibold text-white/80 group-hover:text-[#8AB4F8] transition-colors truncate max-w-full px-1">
                    {partner.name}
                  </span>
                  <span className="text-[10px] text-gray-400 truncate max-w-full">
                    {partner.category}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="text-center mt-12 sm:mt-16">
          <a
            href="mailto:gdg.ranchi@gmail.com?subject=DevFest%20Ranchi%202026%20Sponsorship%20Inquiry"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-black hover:bg-neutral-200 rounded-full font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_4px_30px_rgba(255,255,255,0.2)]"
          >
            Become a Sponsor
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSec;
