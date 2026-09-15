const fs = require('fs');

// The main changes I want to do is ensuring container width max, adding flexible padding.

let aboutContent = fs.readFileSync('src/features/Event/Components/AboutEvent.tsx', 'utf8');

// The layout and markdown sizes look decent, but let's make sure the text isn't cut off
// Actually `AboutEvent` seems quite responsive (using sm:px-8 px-4 etc).

fs.writeFileSync('src/features/Event/Components/AboutEvent.tsx', aboutContent);
