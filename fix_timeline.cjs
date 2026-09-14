const fs = require('fs');

let tContent = fs.readFileSync('src/features/Event/Components/Timeline.tsx', 'utf8');
// Fix the left paddings to be completely robust
tContent = tContent.replace(
  'className="md:w-[180px] flex-shrink-0 md:text-right pb-2 md:pb-0 pl-12 sm:pl-16 md:pl-0 pr-0 md:pr-10 pt-0.5"',
  'className="md:w-[180px] flex-shrink-0 md:text-right pb-2 md:pb-0 pl-10 sm:pl-16 md:pl-0 pr-0 md:pr-10 pt-0.5"'
);

tContent = tContent.replace(
  'className="flex-1 pl-12 sm:pl-16 md:pl-10 w-full"',
  'className="flex-1 pl-10 sm:pl-16 md:pl-10 w-full"'
);

fs.writeFileSync('src/features/Event/Components/Timeline.tsx', tContent);
