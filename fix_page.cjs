const fs = require('fs');
let content = fs.readFileSync('original_EventDetailPage.tsx', 'utf8');

content = content.replace(
  'className="flex items-start gap-4"',
  'className="flex items-start gap-3 sm:gap-4"'
);

content = content.replace(
  'className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar border-b border-white/10 mb-8 relative"',
  'className="flex gap-4 sm:gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-b border-white/10 mb-6 sm:mb-8 relative px-1"'
);

content = content.replace(
  'className="mt-10 lg:mt-16 w-full max-w-7xl mx-auto py-16 sm:py-24"',
  'className="mt-8 lg:mt-16 w-full max-w-7xl mx-auto py-12 sm:py-24"'
);

content = content.replace(
  'className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"',
  'className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"'
);

content = content.replace(
  'className="lg:col-span-8 flex flex-col pb-24 min-h-[600px]"',
  'className="lg:col-span-8 flex flex-col pb-16 min-h-[400px] sm:min-h-[600px]"'
);

fs.writeFileSync('src/features/Event/Pages/EventDetailPage.tsx', content);
