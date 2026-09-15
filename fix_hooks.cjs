const fs = require('fs');

const path = 'src/features/Event/Pages/EventDetailPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// I'll just find the exact block and replace it.
// Let's use a regex that is more robust.
// Basically, we want to find useMemo and put it above `if (isLoading)`.
const originalBlock = `  const { data, isLoading } = usefetchEventDetaill(Slug);

  if (isLoading) {
    return <GDGLoader />;
  }

  if (!Slug) {
    throw new Error("Slug is required");
  }

  const event = data;

  const tabs = useMemo(() => {
    if (!event) return [];
    return [
      { id: "about", label: "About" },
      ...(event.timeline?.length > 0 ? [{ id: "timeline", label: "Timeline" }] : []),
      ...(event.judges?.length > 0 ? [{ id: "judges", label: "Judges" }] : []),
      ...(event.mentors?.length > 0 ? [{ id: "mentors", label: "Mentors" }] : []),
      ...((event.rules?.length > 0 || event.requirements?.length > 0) ? [{ id: "rules", label: "Rules & Guidelines" }] : []),
    ];
  }, [event]);`;

const replacementBlock = `  const { data: event, isLoading } = usefetchEventDetaill(Slug);

  const tabs = useMemo(() => {
    if (!event) return [];
    return [
      { id: "about", label: "About" },
      ...(event.timeline?.length > 0 ? [{ id: "timeline", label: "Timeline" }] : []),
      ...(event.judges?.length > 0 ? [{ id: "judges", label: "Judges" }] : []),
      ...(event.mentors?.length > 0 ? [{ id: "mentors", label: "Mentors" }] : []),
      ...((event.rules?.length > 0 || event.requirements?.length > 0) ? [{ id: "rules", label: "Rules & Guidelines" }] : []),
    ];
  }, [event]);

  if (isLoading) {
    return <GDGLoader />;
  }`;

if (content.includes('const { data, isLoading } = usefetchEventDetaill(Slug);')) {
  console.log("Found exact string, replacing...");
  content = content.replace(originalBlock, replacementBlock);
} else {
  console.log("Didn't find exact block. Here is the head of the file:");
  console.log(content.substring(0, 800));
}

fs.writeFileSync(path, content);
