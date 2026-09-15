const fs = require('fs');

function applyToEventDetailPage() {
  const path = 'src/features/Event/Pages/EventDetailPage.tsx';
  let content = fs.readFileSync(path, 'utf8');

  // Inject useEffect to top if not present
  if (!content.includes('useEffect')) {
    content = content.replace('import { useState, useMemo } from "react";', 'import { useState, useMemo, useEffect } from "react";');
  }

  const stateInjection = `  const { data: event, isLoading } = usefetchEventDetaill(Slug);

  const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingTimePassed(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);`;

  content = content.replace('  const { data: event, isLoading } = usefetchEventDetaill(Slug);', stateInjection);

  content = content.replace('if (isLoading) {', 'if (isLoading || !minLoadingTimePassed) {');
  
  fs.writeFileSync(path, content);
}

function applyToEventsPage() {
  const path = 'src/features/Event/Pages/Events.tsx';
  let content = fs.readFileSync(path, 'utf8');

  if (!content.includes('useEffect')) {
    content = content.replace('import { useState, useMemo } from "react";', 'import { useState, useMemo, useEffect } from "react";');
  }

  const stateInjection = `  const { data, isPending, isError, isLoading } = useFetchEvents();

  const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingTimePassed(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);`;

  content = content.replace('  const { data, isPending, isError, isLoading } = useFetchEvents();', stateInjection);

  // Looking at the original usage in Events.tsx:
  // if (isPending && isLoading) {
  content = content.replace('if (isPending && isLoading) {', 'if ((isPending && isLoading) || !minLoadingTimePassed) {');

  fs.writeFileSync(path, content);
}

applyToEventDetailPage();
applyToEventsPage();
