const fs = require('fs');
const path = 'src/features/Event/Pages/Events.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `  const { data, isPending, isLoading, isFetching, isError, error, refetch } =
    useFetchEventWithFilter(apiFilters);`;

const stateInjection = `
  const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingTimePassed(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
`;

content = content.replace(targetStr, targetStr + stateInjection);
fs.writeFileSync(path, content);
