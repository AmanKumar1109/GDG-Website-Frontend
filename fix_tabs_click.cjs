const fs = require('fs');
let pageContent = fs.readFileSync('src/features/Event/Pages/EventDetailPage.tsx', 'utf8');

// Just adding a quick fix for the active tab logic so it falls back to 'about' if the current tab vanishes
// (e.g. data re-fetches and previously selected tab is no longer available)

const activeTabEffect = `  useEffect(() => {
    if (tabs.length > 0 && !tabs.find(t => t.id === activeTab)) {
      setActiveTab("about");
    }
  }, [tabs, activeTab]);`;

if (!pageContent.includes('!tabs.find(t => t.id === activeTab)')) {
  pageContent = pageContent.replace('  const tabs = useMemo', activeTabEffect + '\n\n  const tabs = useMemo');
  fs.writeFileSync('src/features/Event/Pages/EventDetailPage.tsx', pageContent);
}
