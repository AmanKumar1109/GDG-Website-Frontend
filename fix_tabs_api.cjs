const fs = require('fs');
let pageContent = fs.readFileSync('src/features/Event/Pages/EventDetailPage.tsx', 'utf8');

// Ensure tabs calculation is fully dynamic and handles 0/null cases from API properly.
const tabsReplacement = `const tabs = useMemo(() => {
    if (!event) return [];
    
    // We always show About
    const generatedTabs = [ { id: "about", label: "About" } ];

    if (event.timeline && event.timeline.length > 0) {
      generatedTabs.push({ id: "timeline", label: "Timeline" });
    }
    
    if (event.judges && event.judges.length > 0) {
      generatedTabs.push({ id: "judges", label: "Judges" });
    }
    
    if (event.mentors && event.mentors.length > 0) {
      generatedTabs.push({ id: "mentors", label: "Mentors" });
    }
    
    if ((event.rules && event.rules.length > 0) || (event.requirements && event.requirements.length > 0)) {
      generatedTabs.push({ id: "rules", label: "Rules & Guidelines" });
    }

    return generatedTabs;
  }, [event]);`;

pageContent = pageContent.replace(/const tabs = useMemo\(\(\) => \{[\s\S]*?\}, \[event\]\);/, tabsReplacement);

fs.writeFileSync('src/features/Event/Pages/EventDetailPage.tsx', pageContent);

