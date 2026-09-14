const fs = require('fs');

// 1. Let's fix the EVENT_BANNER.tsx
let bannerContent = fs.readFileSync('src/features/Event/Components/EVENT_BANNER.tsx', 'utf8');

// Fix button container flex
bannerContent = bannerContent.replace(
  'className="mt-6 sm:mt-9 flex flex-col sm:flex-wrap gap-2 sm:gap-3"',
  'className="mt-6 sm:mt-9 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"'
);

bannerContent = bannerContent.replace(
  'className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-xl bg-white px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold text-black shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1 active:translate-y-0"',
  'className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-xl bg-white px-4 sm:px-6 py-3 sm:py-3.5 text-sm font-semibold text-black shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto"'
);

bannerContent = bannerContent.replace(
  'className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] hover:text-white active:translate-y-0"',
  'className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 sm:px-6 py-3 sm:py-3.5 text-sm font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] hover:text-white active:translate-y-0 w-full sm:w-auto"'
);

// Better padding and heights for the banner layout
bannerContent = bannerContent.replace(
  'className="relative mt-[6vh] sm:mt-[8vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0f] shadow-2xl shadow-black/30"',
  'className="relative mt-4 sm:mt-[6vh] lg:mt-[8vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0f] shadow-2xl shadow-black/30"'
);

bannerContent = bannerContent.replace(
  'className="relative min-h-[280px] sm:min-h-[350px] lg:min-h-full overflow-hidden flex-none lg:w-[50%]"',
  'className="relative min-h-[240px] sm:min-h-[350px] lg:min-h-full overflow-hidden flex-none lg:w-[50%]"'
);

fs.writeFileSync('src/features/Event/Components/EVENT_BANNER.tsx', bannerContent);

// 2. Let's fix HIGHLIGHTS_Sec.tsx - allow it to show on mobile (remove hidden md:block)
let highlightsContent = fs.readFileSync('src/features/Event/Section/HIGHLIGHTS_Sec.tsx', 'utf8');

highlightsContent = highlightsContent.replace(
  'className="hidden md:block mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-md"',
  'className="block mt-4 sm:mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-md"'
);

// Change divide behavior for mobile grid
highlightsContent = highlightsContent.replace(
  'className="grid grid-cols-1 divide-y divide-white/[0.07] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"',
  'className="grid grid-cols-2 divide-x divide-y divide-white/[0.07] sm:grid-cols-2 lg:grid-cols-4 sm:divide-y-0 [&>*:nth-child(1)]:border-b-0 [&>*:nth-child(2)]:border-b-0 sm:[&>*:nth-child(1)]:border-b-transparent"' // Need proper divide fix later, lets simplify
);
// Better divide approach:
highlightsContent = highlightsContent.replace(
  'className="grid grid-cols-2 divide-x divide-y divide-white/[0.07] sm:grid-cols-2 lg:grid-cols-4 sm:divide-y-0 [&>*:nth-child(1)]:border-b-0 [&>*:nth-child(2)]:border-b-0 sm:[&>*:nth-child(1)]:border-b-transparent"',
  'className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-white/[0.07] [&>*:nth-child(odd)]:border-l-0 [&>*:nth-child(1)]:border-t-0 [&>*:nth-child(2)]:border-t-0"'
);

fs.writeFileSync('src/features/Event/Section/HIGHLIGHTS_Sec.tsx', highlightsContent);
