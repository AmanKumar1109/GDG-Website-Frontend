const fs = require('fs');

let highlightContent = fs.readFileSync('src/features/Event/Components/Highlight.tsx', 'utf8');

// The sm:border-r is messing with the new divide grid approach, so lets just remove that border logic from the individual item and rely on the parent grid 'divide-x divide-y'
highlightContent = highlightContent.replace(
  'className="group flex min-w-0 items-center gap-3 py-2.5 pr-6 sm:border-r sm:border-white/[0.08] ml-2.5"',
  'className="group flex min-w-0 items-center gap-3 p-3 sm:p-4"'
);

// Scale text slightly down for mobile
highlightContent = highlightContent.replace(
  'className="truncate text-md font-semibold tracking-tight text-white"',
  'className="truncate text-sm sm:text-md font-semibold tracking-tight text-white"'
);

highlightContent = highlightContent.replace(
  'className="mt-1 text-[12px] font-medium uppercase tracking-[0.18em] text-white/30"',
  'className="mt-1 text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-white/40"'
);

fs.writeFileSync('src/features/Event/Components/Highlight.tsx', highlightContent);

// Fix the parent HIGHLIGHTS_Sec grid logic (grid divide is tricky across rows/cols). Let's use simple borders.
let highlightsContent = fs.readFileSync('src/features/Event/Section/HIGHLIGHTS_Sec.tsx', 'utf8');

highlightsContent = highlightsContent.replace(
  'className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-white/[0.07] [&>*:nth-child(odd)]:border-l-0 [&>*:nth-child(1)]:border-t-0 [&>*:nth-child(2)]:border-t-0"',
  'className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.07] [&>*:nth-child(odd)]:border-l-0 lg:[&>*:nth-child(odd)]:border-l [&>*:nth-child(1)]:border-l-0 [&>*:nth-child(1)]:border-t-0 [&>*:nth-child(2)]:border-t-0 lg:[&>*:nth-child(3)]:border-t-0 lg:[&>*:nth-child(4)]:border-t-0"'
);

fs.writeFileSync('src/features/Event/Section/HIGHLIGHTS_Sec.tsx', highlightsContent);

