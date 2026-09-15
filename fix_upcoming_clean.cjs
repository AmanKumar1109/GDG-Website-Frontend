const fs = require('fs');
let upcoming = fs.readFileSync('src/features/Home/v1/Section/UpcomingEvent.tsx', 'utf8');

upcoming = upcoming.replace(/\(Array\.isArray\(data\) \? data\.length : \(data\?\.length \?\? 0\)\)/g, '(data?.length ?? 0)');

fs.writeFileSync('src/features/Home/v1/Section/UpcomingEvent.tsx', upcoming);
