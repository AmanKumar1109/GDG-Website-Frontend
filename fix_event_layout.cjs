const fs = require('fs');
let pageContent = fs.readFileSync('src/features/Event/Pages/EventDetailPage.tsx', 'utf8');

// Enhance main layout padding
pageContent = pageContent.replace(
  'className="mt-8 lg:mt-16 w-full max-w-7xl mx-auto py-12 sm:py-24"',
  'className="mt-6 lg:mt-16 w-full max-w-7xl mx-auto py-10 sm:py-24 px-4 sm:px-6 lg:px-8"'
);

// We need to remove the inline style or extra wrapper if it exists but px-4 on main should be good enough.
// Actually, earlier the EVENT_BANNER and HIGHLIGHTS have their own max widths or no padding.
// The whole page sits in <main className="min-h-screen bg-[#050505]">
// And has <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
// Let's check where that is.
if (!pageContent.includes('px-4 sm:px-6 lg:px-8')) {
  pageContent = pageContent.replace(
    '<div className="mx-auto max-w-7xl">',
    '<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">'
  );
}

fs.writeFileSync('src/features/Event/Pages/EventDetailPage.tsx', pageContent);
