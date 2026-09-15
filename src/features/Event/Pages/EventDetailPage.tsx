import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { MapPin, Globe, ShieldCheck, Tag, Sparkles, Clock3, BookOpen } from "lucide-react";
import {
  formatDate,
  formatStatus,
} from "../utils/Event.utils";
import AboutEvent from "../Components/AboutEvent";
import Timeline from "../Components/Timeline";
import EVENT_BANNER from "../Components/EVENT_BANNER";
import HIGHLIGHTS_Sec from "../Section/HIGHLIGHTS_Sec";
import RulesList from "../Components/RulesList";
import PersonCard from "../Components/PersonCard";
import usefetchEventDetaill from "../hook/usefetchEventDetaill";
import GDGLoader from "../../../Components/GDGLoader";

const ViewSingleEventPage = () => {
  const { Slug } = useParams<{ Slug: string }>();
  const [activeTab, setActiveTab] = useState("about");

  if (!Slug) {
    throw new Error("Slug is required");
  }

  const { data: event, isLoading } = usefetchEventDetaill(Slug);

  const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingTimePassed(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);



  const tabs = useMemo(() => {
    if (!event) return [];
    
    // We always show About
    const generatedTabs = [ { id: "about", label: "About" } ];

    if (event.timeline && event.timeline.length > 0) {
      generatedTabs.push({ id: "timeline", label: "Timeline" });
    }
    
    if (event.judges && ((event.judges?.length ?? 0) || 0) > 0) {
      generatedTabs.push({ id: "judges", label: "Judges" });
    }
    
    if (event.mentors && ((event.mentors?.length ?? 0) || 0) > 0) {
      generatedTabs.push({ id: "mentors", label: "Mentors" });
    }
    
    if ((event.rules && event.rules.length > 0) || (event.requirements && event.requirements.length > 0)) {
      generatedTabs.push({ id: "rules", label: "Rules & Guidelines" });
    }

    return generatedTabs;
  }, [event]);

  useEffect(() => {
    if (tabs.length > 0 && !tabs.find(t => t.id === activeTab)) {
      setActiveTab("about");
    }
  }, [tabs, activeTab]);


  if (isLoading || !minLoadingTimePassed) {
    return <GDGLoader />;
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <p className="text-xl">Event not found.</p>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      {/* Background Grid - Responsive sizing */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Background Effects - Keep absolute positioning but ensure they don't block content */}
      <div className="pointer-events-none absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-[#EA4335]/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-100px] top-[5%] h-96 w-96 rounded-full bg-[#4285F4]/20 blur-[150px]" />
      <div className="pointer-events-none absolute left-[-120px] top-[15%] h-80 w-80 rounded-full bg-green-700/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-100px] top-[40%] h-96 w-96 rounded-full bg-purple-700/20 blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-4 sm:pb-12 pt-4 sm:pt-12 sm:px-6 lg:px-8">
        {/* Banner and Highlights */}
        <EVENT_BANNER event={event} />
        <HIGHLIGHTS_Sec event={event} />
      </div>

        {/* =====================================================
            ABOUT + EVENT DETAILS (Responsive Flex Layout)
        ===================================================== */}

        <section
          id="overview"
          className="mt-10 flex flex-col-reverse  gap-3 lg:flex-row lg:items-start lg:gap-[2vw]"
        >
          {/* About Section */}
          <div className="w-full lg:w-[70%] flex flex-col gap-8">
            <AboutEvent event={event} />

            {/* Timeline Section */}
            {event.timeline && event.timeline.length > 0 && (
              <div className="rounded-2xl border border-white/[0.08] bg-[#0b0d0e] p-6 sm:p-8">
                <h3 className="text-2xl font-semibold tracking-tight text-white mb-6">
                  Event Timeline
                </h3>
                <Timeline timeline={event.timeline} />
              </div>
            )}

                {activeTab === "timeline" && event.timeline && event.timeline.length > 0 && (
                  <motion.div
                    key="timeline"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    id="schedule"
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
                    {/* Subtle divider */}
                    <div className="my-8 h-px w-full bg-white/[0.07]" />
                    <div className="px-1 sm:px-0">
                       <Timeline timeline={event.timeline} />
                    </div>
                  </motion.div>
                )}

                {event.requirements?.length > 0 && (
                  <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#111315] via-[#0b0d0e] to-[#070808] p-6">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34A853]/10 text-[#34A853]">
                        <BookOpen size={20} />
                      </div>
                      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.875rem] sm:leading-tight">
                        Rules & Requirements
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:text-[15px]">
                        Please read and follow these guidelines to ensure a great experience for everyone.
                      </p>
                    </div>
                    {/* Subtle divider */}
                    <div className="my-8 h-px w-full bg-white/[0.07]" />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 px-1 sm:px-0">
                      {(event.rules?.length ?? 0) > 0 && (
                        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-purple-950/20 to-black p-6 sm:p-8 shadow-xl">
                          <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400">
                              <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Rules</h3>
                          </div>
                          <RulesList items={event.rules} />
                        </div>
                      )}
                      
                      {(event.requirements?.length ?? 0) > 0 && (
                        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-emerald-950/20 to-black p-6 sm:p-8 shadow-xl">
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

                {activeTab === "mentors" && (event.mentors?.length ?? 0) > 0 && (
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
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:text-[15px]">
                        Learn from industry experts and experienced professionals.
                      </p>
                    </div>
                    {/* Subtle divider */}
                    <div className="my-8 h-px w-full bg-white/[0.07]" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-1 sm:px-0">
                      {(event.mentors || []).map((mentor: any) => (
                        <PersonCard key={mentor._id} {...mentor} role="Mentor" />
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "judges" && (event.judges?.length ?? 0) > 0 && (
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
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:text-[15px]">
                        Meet the esteemed evaluators and industry leaders for this event.
                      </p>
                    </div>
                    {/* Subtle divider */}
                    <div className="my-8 h-px w-full bg-white/[0.07]" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-1 sm:px-0">
                      {(event.judges || []).map((judge: any) => (
                        <PersonCard key={judge._id} {...judge} role="Judge" />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: Bento Info Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-6">
            
            {/* Quick Summary Bento */}
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

                

                {event.mentors && ((event.mentors?.length ?? 0) || 0) > 0 && (
                <BentoRow icon={<Sparkles className="text-amber-400"/>} label="Mentors">
                  {((event.mentors?.length ?? 0) || 0)}+ Expert Mentors
                </BentoRow>
                )}

              </div>
            </div>

            {/* Tags Box */}
            {event.tags && event.tags.length > 0 && (
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

/* ============================================================
   BENTO ROW COMPONENT
============================================================ */
const BentoRow = ({ icon, label, children }: { icon: React.ReactNode, label: string, children: React.ReactNode }) => (
  <div className="flex items-start gap-3 sm:gap-4">
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
)

export default ViewSingleEventPage;
