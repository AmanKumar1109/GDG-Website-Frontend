const Highlight = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => {
  return (
    <div className="group flex min-w-0 items-center gap-3 p-3 sm:p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-blue-400 transition-colors duration-300 group-hover:bg-blue-500/10">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm sm:text-md font-semibold tracking-tight text-white">{value}</p>

        <p className="mt-1 text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">
          {label}
        </p>
      </div>
    </div>
  );
};

export default Highlight;
