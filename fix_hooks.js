const fs = require('fs');

const path = 'src/features/Event/Pages/EventDetailPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// I will extract the parts and move useMemo above the isLoading return.

// 1. Let's just do a regex replace to reorder them
// Find:
/*
  const { data, isLoading } = usefetchEventDetaill(Slug);

  if (isLoading) {
    return <GDGLoader />;
  }

  if (!Slug) {
    throw new Error("Slug is required");
  }

  const event = data;

  const tabs = useMemo(() => {
    ...
  }, [event]);
*/

const searchStr = `  const { data, isLoading } = usefetchEventDetaill(Slug);

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

const replaceStr = `  const { data: event, isLoading } = usefetchEventDetaill(Slug);

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

content = content.replace(searchStr, replaceStr);

fs.writeFileSync(path, content);
