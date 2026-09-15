const fs = require('fs');
const content = `import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { MapPin, Users, Globe, ShieldCheck, Tag, Sparkles, Clock3, BookOpen } from "lucide-react";
import { formatDate, formatStatus } from "../utils/Event.utils";
import AboutEvent from "../Components/AboutEvent";
import Timeline from "../Components/Timeline";
import EVENT_BANNER from "../Components/EVENT_BANNER";
import HIGHLIGHTS_Sec from "../Section/HIGHLIGHTS_Sec";
import RulesList from "../Components/RulesList";
import PersonCard from "../Components/PersonCard";
import usefetchEventDetaill from "../hook/usefetchEventDetaill";
import GDGLoader from "../../../Components/GDGLoader";

const BentoRow = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) => (
  <div className="flex items-start gap-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08]">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1">{label}</span>
      <span className="text-sm font-semibold text-white/90 leading-tight">
        {children}
      </span>
    </div>
  </div>
);

const ViewSingleEventPage = () => {
  const { Slug } = useParams<{ Slug: string }>();
  const [activeTab, setActiveTab] = useState("about");

  if (!Slug) {
    throw new Error("Slug is required");
  }

  const { data: event, isLoading } = usefetchEventDetaill(Slug);

  const tabs = useMemo(() => {
    if (!event) return [];
    return [
      { id: "about", label: "About" },
      ...(event.timeline?.length ? [{ id: "timeline", label: "Timeline" }] : []),
      ...(event.judges?.length ? [{ id: "judges", label: "Judges" }] : []),
      ...(event.mentors?.length ? [{ id: "mentors", label: "Mentors" }] : []),
      ...(event.rules?.length || event.requirements?.length ? [{ id: "rules", label: "Rules & Guidelines" }] : []),
    ];
  }, [event]);

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id);
  }, []);

  if (isLoading) return <GDGLoader />;

  if (!event) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <p className="text-xl">Event not found.</p>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: \`linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)\`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="pointer-events-none absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-[#EA4335]/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-100px] top-[5%] h-96 w-96 rounded-full bg-[#4285F4]/20 blur-[150px]" />
      <div className="pointer-events-none absolute left-[-120px] top-[15%] h-80 w-80 rounded-full bg-green-700/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-100px] top-[40%] h-96 w-96 rounded-full bg-purple-700/20 blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-16 sm:pt-24 sm:px-6 lg:px-8">
        <EVENT_BANNER event={event} />
        <HIGHLIGHTS_Sec event={event} />
      </div>

      <section className="mt-10 lg:mt-16 w-full max-w-7xl mx-auto py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-8 flex flex-col pb-24 min-h-[600px]">
            <div className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar border-b border-white/10 mb-8 relative">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={\`relative py-4 text-sm sm:text-base font-bold whitespace-nowrap transition-colors duration-300 \${
                    activeTab === tab.id ? "text-white" : "text-white/50 hover:text-white/90"
                  }\`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="relative w-full">
              <AnimatePresence mode="wait">
                {activeTab === "about" && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="prose prose-invert max-w-none"
                  >
                    <AboutEvent event={event} />
                  </motion.div>
                )}

                {activeTab === "timeline" && event.timeline?.length > 0 && (
                  <motion.div
                    key="timeline"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full py-4 sm:py-8 px-4 sm:px-8 rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
                  >
                    <div className="max-w-3xl mx-auto sm:mx-0 mb-8">
                      <div className="mb-3 flex items-center gap-2">
                        <Clock3 size={13} strokeWidth={1.8} className="text-[#34A853]" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#34A853]">
                          Event Itinerary
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.875rem] sm:leading-tight">
                        Event Schedule
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:text-[15px]">
                        Follow the timeline to know what happens when.
                      </p>
                    </div>
                    <div className="my-8 h-px w-full bg-white/[0.07]" />
                    <div className="px-1 sm:px-0">
                      <Timeline timeline={event.timeline} />
                    </div>
                  </motion.div>
                )}

                {activeTab === "rules" && (event.rules?.length > 0 || event.requirements?.length > 0) && (
                  <motion.div
                    key="rules"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full py-4 sm:py-8 px-4 sm:px-8 rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
                  >
                    <div className="max-w-3xl mx-auto sm:mx-0 mb-8">
                      <div className="mb-3 flex items-center gap-2">
                        <ShieldCheck size={13} strokeWidth={1.8} className="text-[#34A853]" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#34A853]">
                          Important Guidelines
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.875rem] sm:leading-tight">
                        Rules & Requirements
                      </h2>
                    </div>
                    <div className="my-8 h-px w-full bg-white/[0.07]" />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 px-1 sm:px-0">
                      {event.rules?.length > 0 && (
                        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-purple-950/20 to-black p-8 shadow-xl">
                          <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400">
                              <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Rules</h3>
                          </div>
                          <RulesList items={event.rules} />
                        </div>
                      )}
                      {event.requirements?.length > 0 && (
                        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-emerald-950/20 to-black p-8 shadow-xl">
                          <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                              <BookOpen size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Requirements</h3>
                          </div>
                          <RulesList items={event.requirements} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === "mentors" && event.mentors?.length > 0 && (
                  <motion.div
                    key="mentors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full py-4 sm:py-8 px-4 sm:px-8 rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
                  >
                    <div className="max-w-3xl mx-auto sm:mx-0 mb-8">
                      <div className="mb-3 flex items-center gap-2">
                        <Sparkles size={13} strokeWidth={1.8} className="text-[#34A853]" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#34A853]">
                          Industry Experts
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.875rem] sm:leading-tight">
                        Event Mentors
                      </h2>
                    </div>
                    <div className="my-8 h-px w-full bg-white/[0.07]" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-1 sm:px-0">
                      {event.mentors.map((mentor: any) => (
                        <PersonCard key={mentor._id} {...mentor} role="Mentor" />
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "judges" && event.judges?.length > 0 && (
                  <motion.div
                    key="judges"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full py-4 sm:py-8 px-4 sm:px-8 rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
                  >
                    <div className="max-w-3xl mx-auto sm:mx-0 mb-8">
                      <div className="mb-3 flex items-center gap-2">
                        <ShieldCheck size={13} strokeWidth={1.8} className="text-[#34A853]" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#34A853]">
                          Evaluators
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.875rem] sm:leading-tight">
                        Event Judges
                      </h2>
                    </div>
                    <div className="my-8 h-px w-full bg-white/[0.07]" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-1 sm:px-0">
                      {event.judges.map((judge: any) => (
                        <PersonCard key={judge._id} {...judge} role="Judge" />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-6">
            <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/10 bg-white/[0.02]">
                <h3 className="text-lg font-bold text-white mb-1">Event Summary</h3>
                <p className="text-xs text-white/40">Essential details at a glance</p>
              </div>
              <div className="p-6 grid grid-cols-1 gap-6">
                <BentoRow icon={<MapPin className="text-red-400"/>} label="Venue Location">
                  {event.venue?.venueName || "TBA"} <br/>
                  <span className="text-white/50 font-normal">
                    {[event.venue?.city, event.venue?.state].filter(Boolean).join(", ")}
                  </span>
                </BentoRow>
                
                <BentoRow icon={<Globe className="text-blue-400"/>} label="Event Mode">
                  {formatStatus(event.venue?.mode)}
                </BentoRow>

                <BentoRow icon={<Clock3 className="text-emerald-400"/>} label="Registration">
                  Opens: {formatDate(event.registrationStartAt)} <br/>
                  Closes: {formatDate(event.registrationEndAt)}
                </BentoRow>

                <BentoRow icon={<Users className="text-purple-400"/>} label="Team Size">
                  2 - 4 Members
                </BentoRow>

                <BentoRow icon={<Sparkles className="text-amber-400"/>} label="Mentors">
                  {event.mentors?.length ? \`\${event.mentors.length}+ Expert Mentors\` : "Mentors TBA"}
                </BentoRow>
              </div>
            </div>

            {event.tags?.length > 0 && (
              <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={14} className="text-white/40"/>
                  <h3 className="text-sm font-bold text-white/70 uppercase tracking-widest">Explore Topics</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-default">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ViewSingleEventPage;
`
fs.writeFileSync('src/features/Event/Pages/EventDetailPage.tsx', content);
