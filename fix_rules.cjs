const fs = require('fs');

let pageContent = fs.readFileSync('src/features/Event/Pages/EventDetailPage.tsx', 'utf8');

pageContent = pageContent.replace(
  '<div className="rounded-3xl border border-white/10 bg-gradient-to-b from-purple-950/20 to-black p-8 shadow-xl">',
  '<div className="rounded-3xl border border-white/10 bg-gradient-to-b from-purple-950/20 to-black p-6 sm:p-8 shadow-xl">'
);
pageContent = pageContent.replace(
  '<div className="rounded-3xl border border-white/10 bg-gradient-to-b from-emerald-950/20 to-black p-8 shadow-xl">',
  '<div className="rounded-3xl border border-white/10 bg-gradient-to-b from-emerald-950/20 to-black p-6 sm:p-8 shadow-xl">'
);

fs.writeFileSync('src/features/Event/Pages/EventDetailPage.tsx', pageContent);

