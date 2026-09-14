import { motion } from "framer-motion";
import { Code2, Sparkles, Cpu, Globe2 } from "lucide-react";

const GDGLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5 }}
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 blur-[120px]" 
        />
      </div>

      <div className="relative flex flex-col items-center z-10">
        {/* Core Logo Animation Container */}
        <div className="relative flex items-center justify-center">
          
          {/* Orbiting Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute h-[160px] w-[160px] rounded-full border border-white/5"
          >
            <div className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(66,133,244,0.6)]" />
          </motion.div>
          
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute h-[200px] w-[200px] rounded-full border border-white/[0.03]"
          >
            <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_15px_rgba(234,67,53,0.6)]" />
            <div className="absolute top-1/2 right-0 h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500 shadow-[0_0_15px_rgba(251,188,4,0.6)]" />
            <div className="absolute top-1/2 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500 shadow-[0_0_15px_rgba(52,168,83,0.6)]" />
          </motion.div>

          {/* Logo Box */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="relative flex h-[80px] w-[80px] sm:h-[96px] sm:w-[96px] items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl z-10 overflow-hidden"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-50"
            />
            <img
              src="/GDG_Logo.svg"
              alt="GDG Ranchi"
              className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
            />
          </motion.div>
        </div>

        {/* Text Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              GDG
            </span>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white/50">
              Ranchi
            </span>
          </div>
          
          <div className="mt-3 flex items-center gap-2.5">
            <Code2 size={12} className="text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
              Loading
            </span>
            <Sparkles size={12} className="text-yellow-400" />
          </div>
        </motion.div>

        {/* Minimal Progress Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 w-[160px] sm:w-[200px]"
        >
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-[50%] rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            />
          </div>
          <div className="mt-4 flex justify-center gap-2">
             {[
               { bg: "bg-[#4285F4]", delay: 0 },
               { bg: "bg-[#EA4335]", delay: 0.15 },
               { bg: "bg-[#FBBC04]", delay: 0.3 },
               { bg: "bg-[#34A853]", delay: 0.45 },
             ].map((dot, i) => (
               <motion.div
                 key={i}
                 animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
                 transition={{ duration: 1, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}
                 className={`h-1.5 w-1.5 rounded-full ${dot.bg}`}
               />
             ))}
          </div>
        </motion.div>
        
        {/* Subtle background tech icons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute -left-20 top-[20%] hidden sm:block text-white"
        >
          <Cpu size={24} strokeWidth={1} />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute -right-20 bottom-[20%] hidden sm:block text-white"
        >
          <Globe2 size={24} strokeWidth={1} />
        </motion.div>

      </div>
    </div>
  );
};

export default GDGLoader;
