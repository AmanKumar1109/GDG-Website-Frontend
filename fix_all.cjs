const fs = require('fs');

// 1. Fix EventDetailPage.tsx
let eventDetail = fs.readFileSync('src/features/Event/Pages/EventDetailPage.tsx', 'utf8');

// A. Move useEffect after tabs declaration
const useEffectStr = `  useEffect(() => {
    if (tabs.length > 0 && !tabs.find(t => t.id === activeTab)) {
      setActiveTab("about");
    }
  }, [tabs, activeTab]);`;
  
if (eventDetail.includes(useEffectStr)) {
  eventDetail = eventDetail.replace(useEffectStr, ''); // remove it from current pos
  const tabsDecl = `  const tabs = useMemo(() => {`;
  const tabsEnd = `  }, [event]);`;
  
  // Find where tabsEnd is and insert the useEffect right after it.
  const idx = eventDetail.indexOf(tabsEnd);
  if (idx !== -1) {
    const splitPoint = idx + tabsEnd.length;
    eventDetail = eventDetail.slice(0, splitPoint) + '\n\n' + useEffectStr + '\n' + eventDetail.slice(splitPoint);
  }
}

// B. Remove `Users` from lucide-react imports if present
eventDetail = eventDetail.replace(/Users,\s*/g, '');
eventDetail = eventDetail.replace(/,\s*Users/g, '');

// C. Fix event.mentors and event.judges possibly undefined errors
eventDetail = eventDetail.replace(
  /event\.mentors\.length/g,
  '(event.mentors?.length || 0)'
);
eventDetail = eventDetail.replace(
  /event\.judges\.length/g,
  '(event.judges?.length || 0)'
);
eventDetail = eventDetail.replace(
  /event\.mentors\.map/g,
  '(event.mentors || []).map'
);
eventDetail = eventDetail.replace(
  /event\.judges\.map/g,
  '(event.judges || []).map'
);

fs.writeFileSync('src/features/Event/Pages/EventDetailPage.tsx', eventDetail);

// 2. Fix UpcomingEvent.tsx
let upcoming = fs.readFileSync('src/features/Home/v1/Section/UpcomingEvent.tsx', 'utf8');
upcoming = upcoming.replace(/data\?\.data\?\.length/g, 'data?.length');
upcoming = upcoming.replace(/data\.data\?\.length/g, 'data?.length');
upcoming = upcoming.replace(/Array\.isArray\(data\) \? data : data\?\.data \|\| \[\]/g, 'data || []');
upcoming = upcoming.replace(/Array\.isArray\(data\) \? data\.length : data\.data\?\.length/g, 'data?.length');
fs.writeFileSync('src/features/Home/v1/Section/UpcomingEvent.tsx', upcoming);

// 3. Fix PastEvents.tsx
let past = fs.readFileSync('src/features/Home/v1/Section/PastEvents.tsx', 'utf8');
past = past.replace(/Array\.isArray\(data\) \? data : data\.data \|\| \[\]/g, 'data || []');
fs.writeFileSync('src/features/Home/v1/Section/PastEvents.tsx', past);

// 4. Fix useFetchEventWithFilter.ts
let useFetchFilter = fs.readFileSync('src/features/Event/hook/useFetchEventWithFilter.ts', 'utf8');
useFetchFilter = useFetchFilter.replace(/import type { PublicEvent } from "\.\.\/type\/Event\.type";/, '');
fs.writeFileSync('src/features/Event/hook/useFetchEventWithFilter.ts', useFetchFilter);

