export function AuthCard({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="funk-panel card-pop w-full max-w-md rounded-[1.7rem] bg-[#fffdf8] p-5 sm:rounded-[2rem] sm:p-8">
      <div className="mb-5 inline-flex rounded-full border-2 border-[var(--line)] bg-[#d9f6df] px-3 py-2 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-[var(--ink)] sm:mb-6 sm:px-4 sm:text-xs sm:tracking-[0.2em]">
        Secret clubhouse access
      </div>
      <h1 className="funk-title text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}
