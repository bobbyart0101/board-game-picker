import Link from "next/link";

export function ResultsHeader() {
  return (
    <header className="sticky top-0 z-50 bg-surface flex items-center justify-between px-6 py-4 w-full transition-colors">
      <div className="flex items-center gap-3">
        <Link href="/">
          <span className="material-symbols-outlined text-primary">
            menu_open
          </span>
        </Link>
        <h1 className="font-headline tracking-tight font-bold text-lg text-primary">
          Board Game Picker
        </h1>
      </div>
    </header>
  );
}
