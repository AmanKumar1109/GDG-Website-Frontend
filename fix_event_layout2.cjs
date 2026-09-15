const fs = require('fs');
let pageContent = fs.readFileSync('src/features/Event/Pages/EventDetailPage.tsx', 'utf8');

// Notice that the padding here: <section className="mt-6 lg:mt-16 w-full max-w-7xl mx-auto py-10 sm:py-24 px-4 sm:px-6 lg:px-8">
// Let's remove the py-10 sm:py-24 on mobile so it doesn't create huge gaps
pageContent = pageContent.replace(
  'className="mt-6 lg:mt-16 w-full max-w-7xl mx-auto py-10 sm:py-24 px-4 sm:px-6 lg:px-8"',
  'className="mt-4 sm:mt-10 lg:mt-16 w-full max-w-7xl mx-auto pb-10 sm:pb-24 px-4 sm:px-6 lg:px-8"'
);

pageContent = pageContent.replace(
  'className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-16 sm:pt-24 sm:px-6 lg:px-8"',
  'className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-4 sm:pb-12 pt-4 sm:pt-12 sm:px-6 lg:px-8"'
);


fs.writeFileSync('src/features/Event/Pages/EventDetailPage.tsx', pageContent);
