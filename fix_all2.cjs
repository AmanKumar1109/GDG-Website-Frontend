const fs = require('fs');
let eventDetail = fs.readFileSync('src/features/Event/Pages/EventDetailPage.tsx', 'utf8');

eventDetail = eventDetail.replace(
  /event\.mentors\?\.length/g,
  '(event.mentors?.length ?? 0)'
);

eventDetail = eventDetail.replace(
  /event\.judges\?\.length/g,
  '(event.judges?.length ?? 0)'
);

eventDetail = eventDetail.replace(
  /event\.timeline\?\.length/g,
  '(event.timeline?.length ?? 0)'
);

eventDetail = eventDetail.replace(
  /event\.rules\?\.length/g,
  '(event.rules?.length ?? 0)'
);

eventDetail = eventDetail.replace(
  /event\.requirements\?\.length/g,
  '(event.requirements?.length ?? 0)'
);

fs.writeFileSync('src/features/Event/Pages/EventDetailPage.tsx', eventDetail);

let upcoming = fs.readFileSync('src/features/Home/v1/Section/UpcomingEvent.tsx', 'utf8');
// Fix UpcomingEvent error: TS2339: Property 'length' does not exist on type 'never'
// This was caused by my previous replace: data?.length
upcoming = upcoming.replace(/data\?\.length/g, '(data?.length ?? 0)');
fs.writeFileSync('src/features/Home/v1/Section/UpcomingEvent.tsx', upcoming);
