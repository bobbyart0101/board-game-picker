"use client";

import { ResultsHeader } from "../components/ResultsHeader";
import { HeroGameCard } from "../components/HeroGameCard";
import { AlternativeMatches } from "../components/AlternativeMatches";
import { useGameStore } from "../lib/gameStore";
import { mapPrimaryGame, mapAlternativeGame } from "../lib/mapGameData";

export default function ResultPage() {
  const primary = useGameStore((s) => s.primary);
  const alternatives = useGameStore((s) => s.alternatives);

  type BGGGame = Parameters<typeof mapPrimaryGame>[0];
  const heroProps = primary ? mapPrimaryGame(primary as BGGGame) : null;
  const alternativeProps = (alternatives as BGGGame[]).map(mapAlternativeGame);

  return (
    <div className="pb-32">
      <ResultsHeader />
      <main className="px-6 pt-6 space-y-10">
        {/* Search Intent Header */}
        <section className="space-y-1">
          <p className="font-label text-on-surface-variant text-xs uppercase tracking-[0.15em] font-semibold">
            Perfect Matches For
          </p>
          <h2 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface">
            {heroProps?.title ?? "Your Game Night"}
          </h2>
        </section>

        {/* Top Recommendation */}
        {heroProps && <HeroGameCard {...heroProps} />}

        {/* Alternative Matches */}
        <AlternativeMatches games={alternativeProps} />
      </main>
    </div>
  );
}
