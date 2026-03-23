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
    <div className="funk-panel card-pop w-full max-w-md rounded-[2rem] bg-[#fffdf8] p-8">
      <div className="mb-6 inline-flex rounded-full border-2 border-[var(--line)] bg-[#d9f6df] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--ink)]">
        Secret clubhouse access
      </div>
      <h1 className="funk-title text-4xl font-bold tracking-tight text-[var(--ink)]">{title}</h1>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}
