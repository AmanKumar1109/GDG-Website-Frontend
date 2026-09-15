const fs = require('fs');
let highlightsContent = fs.readFileSync('src/features/Event/Section/HIGHLIGHTS_Sec.tsx', 'utf8');

// The Tailwind divide utilities are often cleaner than complex first-child selectors. 
// A clean 2x2 grid on mobile, 4x1 on desktop
highlightsContent = highlightsContent.replace(
  'className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.07] [&>*:nth-child(odd)]:border-l-0 lg:[&>*:nth-child(odd)]:border-l [&>*:nth-child(1)]:border-l-0 [&>*:nth-child(1)]:border-t-0 [&>*:nth-child(2)]:border-t-0 lg:[&>*:nth-child(3)]:border-t-0 lg:[&>*:nth-child(4)]:border-t-0"',
  'className="grid grid-cols-2 lg:grid-cols-4 [&>*:nth-child(odd)]:border-r [&>*:nth-child(1)]:border-b [&>*:nth-child(2)]:border-b lg:[&>*:nth-child(odd)]:border-r-0 lg:[&>*:nth-child(1)]:border-b-0 lg:[&>*:nth-child(2)]:border-b-0 lg:divide-x border-white/[0.07] divide-white/[0.07]"'
);

fs.writeFileSync('src/features/Event/Section/HIGHLIGHTS_Sec.tsx', highlightsContent);
